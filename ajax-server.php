<?php
$chat_dir = "chat";
if (!file_exists($chat_dir)) mkdir($chat_dir);

$default = "default-chat.log";
if (!file_exists("$chat_dir/$default")) file_put_contents("$chat_dir/$default", "");

switch ($_POST["action"]) {
    case "setcorpus":
        $filename = "tmp/" . $_POST["filename"];
        $corpus = $_POST["corpus"];
        file_put_contents($filename, $corpus);
        echo $filename;
        break;

    case "send":
        $chatfile = "$chat_dir/" . $_POST["room"] . ".log";
        writeChat($chatfile);
        echo chatLog($chatfile);
        break;

    case "poll":
        $chatfile = "$chat_dir/" . $_POST["room"] . ".log";
        echo chatLog($chatfile);
        break;

    case "room":
        echo getRoom($chat_dir);
        break;

    case "clear":
        $chatfile = "$chat_dir/" . $_POST["room"] . ".log";
        file_put_contents("$chatfile", "");
        echo chatLog($chatfile);
        break;

    case "delete":
        $chatfile = "$chat_dir/" . $_POST["room"] . ".log";
        unlink($chatfile);
        $chatfile = "$chat_dir/" . "default-chat" . ".log";
        echo chatLog($chatfile);
        break;
}

function writeChat($f)
{
    $format = "<p>%s&nbsp;<span class='namelite'>%s</span>&nbsp;%s</p>";
    $str = sprintf($format, date("H:i"), $_POST["name"], $_POST["msg"]);
    file_put_contents($f, "$str\n", FILE_APPEND | LOCK_EX);
}

function chatLog($f)
{
    if (file_exists($f)) $log = file_get_contents($f); else $log = "";
    return $log;
}

function getRoom($dir)
{
    $ffs = preg_grep('/^([^.])/', scandir($dir));
    $ffs = array_values($ffs);
    foreach ($ffs as $key => $ff) {
        $ffs[$key] = explode(".", $ff)[0];
    }
    //$new = $_POST['new'];
    if (isset($_POST['new'])) {
        $new = $_POST['new'];
        file_put_contents("$dir/$new" . ".log", "");
        $ffs = array_merge([$new], $ffs);
    }
    return json_encode($ffs);
}

?>