const ChatRoom = function () {
    const roomElement = document.getElementById("room");
    const nameElement = document.getElementById("name");
    const chat = document.getElementById("chat");

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
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            "/": '&#x2F;',
        };
        const reg = /[&<>"'/]/ig;
        string.replace(reg, (match) => (map[match]));
        return string;
    }

    this.addMessage = (name, message) => {
        chat.appendChild(createMessage(name, sanitize(message)));
        scrollDown();
    };

    this.addReply = (name, message) => {
        chat.appendChild(createMessage(name, sanitize(message), false));
        scrollDown();
    }

    const init = () => {
        this.addMessage("W. Alex", "Hey hoe gaat het?");
        this.addReply("Maxima", "Goed matig");
    }

    init();
}