const core = require('@nlpjs/core');
const nlp = require('@nlpjs/nlp');
const langnl = require('@nlpjs/lang-nl');
const requestrn = require('@nlpjs/request-rn');

window.nlpjs = { ...core, ...nlp, ...langnl, ...requestrn };