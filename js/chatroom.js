const ChatRoom = function () {
    // const roomElement = document.getElementById("room");
    // const nameElement = document.getElementById("name");
    const chat = document.getElementById("chat");
    const chatHeader = document.getElementById("chat-header");
    let username = "Me";
    let username_friend = "Bot";

    const createMessage = (name, message, me=true) => {
        const el = document.createElement("div");
        const userNameElement = document.createElement("div");
        const timeElement = document.createElement("div");
        const messageElement = document.createElement("div");

        timeElement.innerHTML = new Date().toLocaleTimeString("nl-NL",
            {hour: '2-digit', minute:'2-digit'});
        timeElement.className = "time";

        messageElement.innerHTML = message;
        messageElement.className = "message-content";

        userNameElement.className = "user-name";
        userNameElement.innerHTML = name;

        el.appendChild(userNameElement);
        el.appendChild(messageElement);
        el.appendChild(timeElement);
        el.className = "message";

        if (me)
            el.classList.add("me");

        return el;
    };

    const scrollDown = () => {
        chat.scrollTop = chat.scrollHeight;
    }

    const sanitize = (string) => {
        if (string == null) {
            return string;
        }

        string.replace(/[-[/\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        return string;
    }

    this.addMessage = (message) => {
        chat.appendChild(createMessage(username, sanitize(message)));
        scrollDown();
    }

    this.addReply = (message) => {
        chat.appendChild(createMessage(username_friend, sanitize(message), false));
        scrollDown();
    }

    const init = () => {
        chatHeader.innerHTML =  username_friend;
        this.addMessage("Hey hoe gaat het?");
        this.addReply("Goed matig");
    }

    init();
}