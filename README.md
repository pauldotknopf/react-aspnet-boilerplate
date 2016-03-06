# react-dot-net
A starting point for building universal/isomorphic React applications with ASP.NET Core 1, leveraging existing front-end approaches. Uses the [JavaScriptViewEngine](https://github.com/pauldotknopf/javascriptviewengine).

## Goals

1. Minimize .NET's usage - It's only usage should be for building REST endpoints (WebApi) and providing the initial state (pure POCO). No razor syntax *anywhere*.
2. Client and server should render using the same source files (javascript).

This approach is great for front-end developers because it gives them complete control to build their app as they like. No .NET crutches (bundling/razor). No opinions. No gotchas. Just another typical React client-side application, but with the initial state provided by ASP.NET for each URL.

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

## The interesting parts

- [client.js](https://github.com/pauldotknopf/react-dot-net/blob/master/src/React/Scripts/client.js) and [server.js](https://github.com/pauldotknopf/react-dot-net/blob/master/src/React/Scripts/server.js) - The entry point for the client-side/server-side applications.
- [Html.js](https://github.com/pauldotknopf/react-dot-net/blob/master/src/React/Scripts/helpers/Html.js) and [App.js](https://github.com/pauldotknopf/react-dot-net/blob/master/src/React/Scripts/containers/App/App.js) - These files essentially represent the "React" version of MVC Razor's "_Layout.cshtml".
- [HomeController.cs](https://github.com/pauldotknopf/react-dot-net/blob/master/src/React/Controllers/HomeController.cs) - The endpoints for a each full GET request.

## Next steps

I will be adding features to this project as time goes on to help me get started with new React projects in .NET. So, expect some more things. I am also open to contributions or recommendations.

I intend to have this project be a clone of ASP.NET's default template (Visual Studio's "New > Project" template) with authentication (including OAuth providers) and account management.

I took a lot of things from [react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example), but not everything. As time goes on, expect to see more of the same patterns/technologies/techniques copied over.
