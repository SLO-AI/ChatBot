// This file is used to generate a nlp-bundle.js file.
// This is necessary to generate as the NLP library is by default only compatible with Node.js and not plain js.
// It is possible to add plugins to the bundle by appending them in this file.
// To generate an updated bundle, run the following commands on your computer:
// npm install
// npm run browserdist
const containerBootstrap = require('@nlpjs/core');
const Nlp = require('@nlpjs/nlp');
const LangEn = require('@nlpjs/lang-en-min');
const LangNl = require('@nlpjs/lang-nl');
const Request = require('@nlpjs/request-rn');
const Emoji = require('@nlpjs/emoji');
const Nlu = require('@nlpjs/nlu');


window.nlpjs = { ...containerBootstrap, ...Nlp, ...LangEn, LangNl, ...Request, ...Emoji, ...Nlu };