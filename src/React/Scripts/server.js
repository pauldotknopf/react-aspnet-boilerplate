import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from './helpers/Html';
import {FindView} from './views.js';

export function RenderView (path, model) {
  var View = FindView(path);
  return "<!doctype html>\n" + ReactDOM.renderToString(<Html component={<View/>} />)
};

export function RenderPartialView (path, model) {
    return "TODO";
};
