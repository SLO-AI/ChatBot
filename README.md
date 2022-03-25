# ChatBot
This chatbot website is created as a part of the Computing Science course `Congnitive Computing`, created for [SLO](https://slo.nl). The course material can be found [here](https://slo-ai.github.io/website).

## Usage
The website accepts a JSON file, which contains the corpus of the NLP. Examples can be found in the `chatdata` directory.

## Run
The chatbot can be run by opening the index.html file in your browser or by hosting it on a server.

### Generate nlp-bundle.js
The Chatbot uses nlp.js to parse the user's input. To generate the nlp-bundle.js file, you will need `npm`
First install the required packages by running `npm install`
Then run `npm browserify` to generate the nlp-bundle.js file.
You can also add extra packages to the nlp-bundle.js by adding them to index.js.

For more information on the nlp.js library, please look at [their github](https://github.com/axa-group/nlp.js/).

## Hosted on Github
The website is hosted on [Github](https://slo-ai.github.io/ChatBot).

## Authors
Daniël Haitink - [Lions Den Software](https://lionsdensoftware.nl)