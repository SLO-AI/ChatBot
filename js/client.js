const load = function() {
    const chatroom = new ChatRoom();
    const bot = new Bot();
    const msg = document.getElementById("chat-input");

    const loadCorpus = (file) => {
        console.log("Set corpus");

        bot.setCorpus(file).then(() => {
            console.log("training corpus");

            bot.trainCorpus().then(() => {
                console.log("Done!");
            });
        });
    }

    const sendMessage = () => {
        if (msg.value === null || msg.value.length <= 0) {
            return;
        }
        const content = msg.value;

        chatroom.addMessage("bla", content);
        msg.value = null;

        bot.getReply(content).then(r => {
            chatroom.addReply("r", r.answer);
        })

    };
    msg.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    });

    const enter = document.getElementById("chat-enter");
    enter.addEventListener("click", () => {
        sendMessage();
    });

    fetch("./chatdata/bol.json").then((r) => {
        r.json().then((r) => {
            loadCorpus(r);
        });

    });

    new DropArea(document.getElementById("file-drop"), (files) => {
        console.log(files);
        const fr = new FileReader()
        fr.onload=function(){
            const r = JSON.parse(fr.result)
            loadCorpus(r);
        }

        fr.readAsText(files[0]);

    });
};

window.onload = load;