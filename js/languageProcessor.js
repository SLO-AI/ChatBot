const {containerBootstrap, Nlp, LangNl, fs} = window.nlpjs;

const LanguageProcessor = function () {
    let container = null;
    let nlp = null;
    let corpusFile = null;

    this.setCorpus = function (file) {
        corpusFile = file;
        nlp.addCorpus(corpusFile).then(() => {

        });
    }

    this.trainCorpus = function () {
        nlp.train().then((result) => {

        });
    }

    const init = () => {
        containerBootstrap().then((c) => {
            container = c;
            container.register('fs', fs);
            container.use(Nlp);
            container.use(LangNl);

            nlp = container.get('nlp');
            nlp.settings.autoSave = false;
        });
    }

}