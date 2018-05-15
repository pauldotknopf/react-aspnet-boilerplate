const gulp = require('gulp');
const PluginError = require('plugin-error');
const log = require('fancy-log');
const path = require('path');
const childProcess = require('child_process');
const fs = require('fs');
const del = require('del');
const browserSync = require('browser-sync');
const webpack = require('webpack');
const webpackDevMiddlewareFactory = require('webpack-dev-middleware');
const webpackHotMiddlewareFactory = require('webpack-hot-middleware');
const webpackDevConfig = require('./Scripts/webpack/dev.config.js');
const webpackProdConfig = require('./Scripts/webpack/prod.config.js');

const packDir = './wwwroot/pack/';

const getChildProcessOptions = () =>
  ({
    cwd: path.resolve(__dirname),
    stdio: ['ignore', 'pipe', 'inherit'],
    env: Object.assign({}, process.env, {
      ASPNETCORE_ENVIRONMENT: global.isProduction ? 'Production' : 'Development',
    }),
  });

global.isProduction = false;
log('isProduction=' + global.isProduction);

let webpackConfig;
const setWebpackConfig = () => {
  if (global.isProduction) {
    webpackConfig = {
      config: webpackProdConfig
    };
  } else {
    webpackConfig = {
      config: webpackDevConfig
    };
  }
};
setWebpackConfig();

// Subtasks
const getWebpackConfigLoader = (configName) => {
  const loader = (callback) => {
    if (!webpackConfig[configName + 'Compiler']) {
      webpackConfig[configName + 'Compiler'] = webpack(webpackConfig.config[configName]);
    }
    callback();
  };
  loader.displayName = 'load-webpack-config';
  return loader;
};

const getBundleBuilder = (configName) => {
  const builder = (callback) => {
    webpackConfig[configName + 'Compiler'].run((err, stats) => {
      if (err) throw new PluginError('build-bundle', err);
      log(configName + ' Bundle ' + stats.toString({
        colors: true,
        chunks: false
      }));
      callback();
    });
  };
  builder.displayName = 'build-bundle';
  return builder;
};

const getBundleWatcher = (taskToTrigger) => {
  const watcher = (callback) => {
    gulp.watch(['Scripts/**/*'], gulp.series(taskToTrigger));
    callback();
  };
  watcher.displayName = 'watch-bundle';
  return watcher;
};

// Set production build flag
gulp.task('prod', (callback) => {
  global.isProduction = true;
  log('isProduction=' + global.isProduction);
  setWebpackConfig();
  callback();
});

// Common Bundle tasks
gulp.task('create-pack-dir', () =>
  Promise.resolve()
    .then(() => {
      if (!fs.existsSync(packDir)) {
        fs.mkdirSync(packDir);
      }
    }));

gulp.task('clean-bundles', () =>
  Promise.resolve()
    .then(() => del([packDir + '*'], { dot: true })));

// Client bundles
gulp.task(
  'build-client-compiler',
  gulp.series('create-pack-dir', getWebpackConfigLoader('client'))
);

gulp.task(
  'build-client-bundle',
  gulp.series('build-client-compiler', getBundleBuilder('client'))
);

gulp.task('build-dummy-style-bundle', (callback) => {
  fs.writeFile(packDir + 'styles.css', '', callback);
});

gulp.task(
  'watch-client-bundle',
  gulp.series('build-client-bundle', getBundleWatcher('build-client-bundle'))
);

// Server Bundles
gulp.task(
  'build-server-compiler',
  gulp.series('create-pack-dir', getWebpackConfigLoader('server'))
);

gulp.task(
  'build-server-bundle',
  gulp.series('build-server-compiler', getBundleBuilder('server'))
);

gulp.task(
  'watch-server-bundle',
  gulp.series('build-server-bundle', getBundleWatcher('build-server-bundle'))
);

// Server .NET Core
gulp.task('restore-dotnet-packages', () =>
  Promise.resolve()
    .then(() => new Promise((resolve) => {
      const dotnetBuild = childProcess.exec('dotnet restore', getChildProcessOptions());
      dotnetBuild.stdout.pipe(process.stdout);
      dotnetBuild.on('exit', () => {
        resolve();
      });
    })));

(() => {
  const buildProject = () =>
    Promise.resolve()
      .then(() => new Promise((resolve) => {
        const config = global.isProduction ? '--configuration Release' : '--configuration Debug';
        const dotnetBuild = childProcess.exec(`dotnet build ${config}`, getChildProcessOptions());
        dotnetBuild.stdout.pipe(process.stdout);
        dotnetBuild.on('exit', () => {
          resolve();
        });
      }));
  buildProject.displayName = 'build-dotnet-project';
  gulp.task(
    'build-dotnet',
    gulp.series('restore-dotnet-packages', buildProject)
  );
})();

gulp.task('clean-dotnet', () =>
  Promise.resolve()
    .then(() => new Promise((resolve) => {
      const dotnetBuild = childProcess.exec('dotnet clean', getChildProcessOptions());
      dotnetBuild.stdout.pipe(process.stdout);
      dotnetBuild.on('exit', () => {
        resolve();
      });
    })));

// Run everything
(() => {
  const selectiveBuild = (resolve) => {
    if (global.isProduction) {
      // In production mode, just build client and server bundles once
      gulp.parallel('build-client-bundle', 'build-server-bundle')(resolve);
    } else {
      // In dev mode, create the client compiler to facilitate HMR, and watch files to regenerate the server bundle
      gulp.series('build-client-compiler', 'build-dummy-style-bundle', 'watch-server-bundle')(resolve);
    }
  };
  selectiveBuild.displayName = 'selective-watch-build';

  const runServer = (resolve) => {
    const spawnCore = (onStdout) => {
      log('Starting server...');
      childProcess.spawn('dotnet', ['watch', 'run', '--no-launch-profile'], getChildProcessOptions()).stdout.on('data', (data) => {
        process.stdout.write(data);
        if (typeof onStdout === 'function') {
          onStdout(data);
        }
      });
    };

    if (global.isProduction) {
      // If running in production mode, just spawn the server and be done
      spawnCore();
      resolve();
    } else {
      let count = 0;
      // Node.js middleware that compiles application in watch mode with HMR support
      // http://webpack.github.io/docs/webpack-dev-middleware.html
      const webpackDevMiddleware = webpackDevMiddlewareFactory(webpackConfig.clientCompiler, {
        publicPath: webpackConfig.config.client.output.publicPath,
        stats: Object.assign({}, webpackConfig.config.client.stats, { colors: true })
      });
      webpackConfig.clientCompiler.plugin('done', () => {
        // Launch ASP.NET Core server after the initial bundling is complete
        if (++count === 1) { // eslint-disable-line no-plusplus
          spawnCore((data) => {
            if (data.indexOf('Application started.') !== -1) {
              // Launch Browsersync after the initial bundling is complete
              // For more information visit https://browsersync.io/docs/options
              log('Starting browsersync...');
              browserSync.create().init({
                proxy: {
                  target: 'localhost:5000',
                  middleware: [
                    webpackDevMiddleware,
                    webpackHotMiddlewareFactory(webpackConfig.clientCompiler),
                  ],
                },
              }, resolve);
            }
          });
        }
      });
    }
  };
  runServer.displayName = 'run-server';

  gulp.task(
    'start',
    gulp.series(
      gulp.parallel('restore-dotnet-packages', 'clean-dotnet', 'clean-bundles'),
      selectiveBuild,
      runServer
    )
  );
})();

// Rollup tasks
gulp.task('default', gulp.series('start'));
gulp.task('build-bundles', gulp.parallel('build-client-bundle', 'build-server-bundle'));
gulp.task('watch-bundles', gulp.parallel('watch-client-bundle', 'watch-server-bundle'));
gulp.task('build', gulp.parallel('build-dotnet', 'build-bundles'));
gulp.task('clean', gulp.parallel('clean-dotnet', 'clean-bundles'));
