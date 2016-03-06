# react-dot-net
A starting point for building universal/isomorphin react applications with ASP.NET Core 1, leveraging existing front-end approaches. Uses the [JavaScriptViewEngine](https://github.com/pauldotknopf/javascriptviewengine).

## Goals

1. Minimize .NET's usage - It's only usage should be for building REST endpoints (WebApi) and providing the initial state (pure POCO). No razor syntax *anywhere*.
2. Client and server should render using the same files (javascript).

This approach is great for front-end developers because it gives them complete control to build their app as they like. No .NET crutches (bundling/razor). No opinions. No gotchas.

## In a nut shell

![Nutshell](/resources/nutshell.gif)

## Getting started

To checkout this demo...

```
> cd src/React
> npm install
> gulp
> dnu restore
> dnx web
```

There isn't really a "New Project" template for this. For now, download this repository and use it as your starting point. Then change your .sln and project names as you like.

## Demo

## Next steps

I will be adding features to this project as time goes on to help me get started with new React projects in .NET. So, expect some more things. I am also open to contributions or recommendations.

I took a lot of things from [react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example), but not everything. As time goes on, expect to see more of the same patterns/technologies/techniques copied over.
