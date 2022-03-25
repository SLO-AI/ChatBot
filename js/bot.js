const {containerBootstrap, Nlp, NluNeural, LangNl, fs, SentimentAnalyzer, Evaluator, Template, BuiltinDefault, Ner, NluManager, SlotManager, NlgManager} = window.nlpjs;

const Bot = function () {
    let container = null;
    let nlp = null;
    let sentiment = null;

    /**
     * Set the corpus.
     *
     * @param {JSON} dict A JSON dictionary with the corpus.
     * @return {Promise<void>} A promise that resolves when the corpus is set.
     */
    this.setCorpus = async function (dict) {
        await nlp.addCorpus(dict);
    };

    /**
     * Train a new corpus.
     *
     * @return {Promise<void>} A promise that resolves when the corpus is trained.
     */
    this.trainCorpus =  async function () {
        await nlp.train();
    };

    /**
     * Obtain a reply from the bot.
     *
     * @param message The message to which a reply should be generated.
     * @return {Promise<*>} A promise that resolves with the reply.
     */
    this.getReply = async (message) => {
        return await nlp.process(message);

        // Uncomment text below and comment text above to return a fixed reply.
        // return await new Promise(function(resolve, reject) {
        //     resolve({ answer: "Antwoord" });
        // });
    };

    const init = () => {
        container = new containerBootstrap();
        container.register('fs', fs);
        container.use(Nlp);
        container.use(LangNl);
        container.register('sentiment-analyzer', SentimentAnalyzer);
        container.register('Evaluator', Evaluator);
        container.register('Template', Template);
        container.register('extract-builtin-??', BuiltinDefault , true);
        container.register('ner', Ner);
        container.register('nlg-manager', NlgManager);

        nlp = container.get('nlp');
        nlp.settings.autoSave = false;
        nlp.forceNER = true;
    };

    init();
}