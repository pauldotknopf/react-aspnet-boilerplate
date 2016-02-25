import React from 'react';
import Home from './containers/Home/Home.js'
import About from './containers/About/About.js'

const Views = {
    Index: Home,
    About: About
};

export function FindView(view)
{
  if(!Views.hasOwnProperty(view))
    throw new Error(`No view found with the name of ${view}.`);

  return Views[view];
}
