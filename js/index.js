// This file is used to generate a nlp-bundle.js file.
// This is necessary to generate as the NLP library is by default only compatible with Node.js and not plain js.
// It is possible to add plugins to the bundle by appending them in this file.
// To generate an updated bundle, run the following commands on your computer:
// npm install
// npm run browserdist
const core = require('@nlpjs/core');
const nlp = require('@nlpjs/nlp');
const langenmin = require('@nlpjs/lang-en-min');
const leven = require('@nlpjs/similarity');

window.nlpjs = { ...core, ...nlp, ...langenmin, ...leven };
