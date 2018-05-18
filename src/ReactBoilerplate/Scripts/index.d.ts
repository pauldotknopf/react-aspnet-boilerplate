declare module '*.css';
declare module '*.scss';
declare module '*.json';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg';
declare module '*.woff';
declare module '*.woff2';
declare module '*.eot';
declare module '*.ttf';
declare module '*.wav';
declare module '*.mp3';

declare module 'lodash/mapValues'; // Typings conflict with micro-module imports
declare module 'lodash/omit'; // Typings conflict with micro-module imports
declare module 'promise-window'; // No typings available
declare module 'redux-form'; // Temporary until upgraded to v7
