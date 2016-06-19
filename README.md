# react-aspnet-boilerplate
<p align="center">
<img src="/resources/preview-thumbnail.jpg" />
</p>

A starting point for building universal/isomorphic React applications with ASP.NET Core 1, leveraging existing front-end approaches. Uses the [JavaScriptViewEngine](https://github.com/pauldotknopf/javascriptviewengine).

## Goals

1. **Minimize .NET's usage** - It's only usage should be for building REST endpoints (WebApi) and providing the initial state (pure POCO). No razor syntax *anywhere*.
2. **Isomorphic/universal rendering**
3. **Client and server should render using the same source files (javascript)**
4. **Out-of-the-box login/register/manage functionality** - Use the branch ```empty-template``` if you wish to have a vanilla React application.

This approach is great for front-end developers because it gives them complete control to build their app as they like. No .NET crutches (bundling/razor). No opinions. No gotchas. Just another typical React client-side application, but with the initial state provided by ASP.NET for each URL.

## Getting started

The best way to get started with this project is to use the Yeoman generator.

```bash
npm install -g yo
npm install -g generator-react-aspnet-boilerplate
```

You can also generate a clean template (no authentication/account management) with another generator.

```bash
npm install -g generator-react-aspnet-boilerplate:empty-template
```

Some of the branches in this repo that are maintained:
* [```master```](https://github.com/pauldotknopf/react-aspnet-boilerplate/tree/master) - This is the main branch. It has all the stuff required to get you started, including membership, external logins (OAuth) and account management. This is the default branch used with the Yeoman generator.
* [```empty-template```](https://github.com/pauldotknopf/react-aspnet-boilerplate/tree/empty-template) - This branch for people that want an empty template with the absolute minimum recommend boilerplate for any ASP.NET React application.

## The interesting parts

- [client.js](https://github.com/pauldotknopf/react-dot-net/blob/master/src/React/Scripts/client.js) and [server.js](https://github.com/pauldotknopf/react-dot-net/blob/master/src/React/Scripts/server.js) - The entry point for the client-side/server-side applications.
- [Html.js](https://github.com/pauldotknopf/react-dot-net/blob/master/src/React/Scripts/helpers/Html.js) and [App.js](https://github.com/pauldotknopf/react-dot-net/blob/master/src/React/Scripts/containers/App/App.js) - These files essentially represent the "React" version of MVC Razor's "_Layout.cshtml".
- [Controllers](https://github.com/pauldotknopf/react-aspnet-boilerplate/tree/master/src/React/Controllers) - The endpoints for a each initial GET request, and each client-side network request.

## What is next?

I will be adding features to this project as time goes on to help me get started with new React projects in .NET. So, expect some more things. I am also open to contributions or recommendations.

I took a lot of things from [react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example), but not everything. As time goes on, expect to see more of the same patterns/technologies/techniques copied over.
