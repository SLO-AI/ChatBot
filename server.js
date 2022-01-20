const {containerBootstrap, Nlp, LangNl, fs} = window.nlpjs;

var container;
var nlp;

(async () => {
    container = await containerBootstrap();
    container.register('fs', fs);
    container.use(Nlp);
    container.use(LangNl);
    nlp = container.get('nlp');
    nlp.settings.autoSave = false;
})();

cheating = false;
busy = false;

function clearRoom() {
    clear();
}

function deleteRoom() {

    del();
}

function startCheating() {
    cheating = true;

    setTimeout(sendCheat, Math.round(Math.random() * parseInt($("#freq").val())) * 1000);
    setTimeout(sendCheat, 0);

}

function sendCheat() {
    if (remark == "myself") {
        return;
    }
    if (busy) {
        return;
    }
    busy = true;

    try {
        var response;

        (async () => {
            response = await nlp.process('nl', remark);
            mess = response.answer;

            if (!(mess === undefined)) {
                send();
            }
        })();

    } catch (e) {
        alert(e.toString());
    }

    if (cheating) {
        setTimeout(sendCheat, Math.round(Math.random() * parseInt($("#freq").val())) * 1000);
    }

    busy = false;
}

function stopCheating() {
    cheating = false;
}

net = new brain.recurrent.LSTM();

const fileSelector = document.getElementById('training-file');
fileSelector.addEventListener('change', (event) => {

    var tgt = event.target || window.event.srcElement
    files = tgt.files;
    var fr = new FileReader();
    fr.onload = () => train(fr);
    fr.readAsText(files[0]);

});

function train(fr) {
    setcorpus(chatname + ".json", fr.result);
}

function po(o) {

    s = "{ ";

    for (var prop in o) {
        s += prop + ": " + o[prop] + ", ";
    }

    s = s.substring(0, s.length - 2);
    s += " }";

    return s;

}

$(document).ready(function () {
    chatname = prompt("Enter your chat name:", "Guest");
    if (chatname == null) {
        chatname = "Guest";
    }
    $("#name").text(chatname);
    poll();
    get_room();
});

$('#msg').on("keyup", function (e) {
    if (e.keyCode == 13) send();
});

$('#room-list').on("change", function () {
    changed = $(this).find(":selected").val();
    if (changed == "create room") {
        get_room(true);
    } else {
        $("#room").text(changed);
    }
});

function send() {
    msg = mess;
    if (msg.trim() == "") {
        return;
    }

    post_data = {
        action: "send",
        room: $("#room").text(),
        name: $("#name").text(),
        msg: msg
    };

    $.ajax({
        url: "ajax-server.php",
        type: "POST",
        data: post_data,
        success: function (r) {
            $("#chat").html(r).scrollTop($('#chat')[0].scrollHeight);
            $("#msg").val("");
        },
    });
}

function setcorpus(filename, corpus) {
    post_data = {
        action: "setcorpus",
        filename: filename,
        corpus: corpus
    };

    $.ajax({
        url: "ajax-server.php",
        type: "POST",
        data: post_data,
        success: function (filename) {

            (async () => {

                await nlp.addCorpus(document.location.href.replace("server.html", "") + filename);
                await nlp.train();

            })();
            },
    });
}

function clear() {
    room = $("#room").text();
    //alert(room);
    if (room.trim() != "") {
        $.ajax({
            url: "ajax-server.php",
            type: "POST",
            data: {action: "clear", room: room},
            success: function (r) {
                $("#chat").html(r);
            }
        });
    }
}

function del() {
    room = $("#room").text();
    if (room == "default-chat") {
        alert("You cannot delete the default-chat");
        return;
    }

    if (room.trim() != "") {
        $.ajax({
            url: "ajax-server.php",
            type: "POST",
            data: {action: "delete", room: room},
            success: function (r) {
                $("#room").text("default-chat");
                $("#chat").html(r);
                room = "default-chat";
                get_room();
            }
        });
    }
}

function poll() {
    room = $("#room").text();
    console.log(room);
    if (room.trim() != "") {
        $.ajax({
            url: "ajax-server.php",
            type: "POST",
            data: {action: "poll", room: room},
            success: function (r) {
                $("#chat").html(r);
                var ra = r.split("\n");
                if (ra.length < 2) {

                    if (room != "default-chat") {

                        mess = "Hallo, ik ben " + chatname + ", Hoe kan ik je helpen?";
                        send();

                    }

                    return;

                }

                var lra = ra[ra.length - 2];

                var patt = new RegExp("</span>&nbsp;.*</p>$");

                try {
                    if (lra.includes(chatname)) {

                        remark = "myself";

                    } else {

                        remark = patt.exec(lra)[0].replace("</span>&nbsp;", "").replace("</p>", "");
                        //console.log(remark);
                        sendCheat();

                    }
                } catch (e) {
                    console.log(e);
                }
            }
        });
    }
    setTimeout(poll, 1000);
}

function get_room(create = false) {
    post_data = {action: "room"};
    if (create) {
        new_room_name = $("#name").text();
        new_room_name_split = new_room_name.split("#");
        new_room = new_room_name_split[0];
        new_name = new_room_name_split[1];
        chatname = new_name;
        $("#name").text(chatname);
        //new_room = $("#name").text();
        new_room = new_room.replaceAll(' ', '-');
        new_room += "-" + Math.floor(Math.random() * Math.floor(10000));
        post_data["new"] = new_room;
    }
    console.log(post_data);

    $.ajax({
        url: "ajax-server.php",
        type: "POST",
        data: post_data,
        success: function (r) {
            console.log(r);
            obj = JSON.parse(r);
            list_rooms = "<option value='default-chat'>CHAT ROOM : default-chat</option>";
            for (id in obj) {

                if (obj[id] != "default-chat") {

                    list_rooms += "<option value='" + obj[id] + "'>CHAT ROOM : " + obj[id] + "</option>";
                }
            }
            list_rooms += "<option value='create room'>======== CREATE A NEW ROOM ========</option>";

            $("#room-list").html(list_rooms).selectmenu("refresh", true);
            room = $("#room").text();
            if (room.trim() == "") {
                $("#room").text("default-chat");
            }
            if (create) {
                alert("CREATE A NEW ROOM : " + new_room);
                $("#room").text($("#room-list").find(":selected").val());
            }
        },
    });
}