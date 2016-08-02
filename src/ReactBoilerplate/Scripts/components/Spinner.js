import React from 'react';

const fontAwesome = require('font-awesome/scss/font-awesome.scss');

const spinnerClass = fontAwesome.fa + ' ' + fontAwesome['fa-spinner'] + ' ' + fontAwesome['fa-spin'] + ' ' + fontAwesome['fa-5x'];

export default () =>
(
  <p style={{ textAlign: 'center' }}>
    <i className={spinnerClass} />
  </p>
);
