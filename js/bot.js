const {containerBootstrap, Nlp, LangNl, fs} = window.nlpjs;

const Bot = function () {
    let container = null;
    let nlp = null;
    let corpusFile = null;

    this.setCorpus = async function (file) {
        corpusFile = file;
        await nlp.addCorpus(corpusFile);
    };

    this.trainCorpus =  async function () {
        await nlp.train();
    };

    this.getReply = async (message) => {
        return await nlp.process(message);
    };

    const init = () => {
        container = new containerBootstrap();
        container.register('fs', fs);
        container.use(Nlp);
        container.use(LangNl);

        nlp = container.get('nlp');
        nlp.settings.autoSave = false;
    };

    init();
}