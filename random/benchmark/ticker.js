var stop = false;
var tId = 0;
const POST_INTERVAL = 1000;
let time = 0;

const poster = () => {
    time++;
    var msgback = `Time : ${time}`;
    postMessage({ msgback });
}

const onStart = () => {
    let int = self.setInterval(poster, POST_INTERVAL);
    return int;
}

const onStop = (int) => {
    self.clearInterval(int);
    time = 0; //reset
}

const onReceivedMessage = (e) => {
    if (e.data === null || e.data.msg === undefined) {
        let msgback = "nodata";
        postMessage({ msgback });
        return;
    }

    if (e.data.msg === "start") {
        tId = onStart();
    }
    if (e.data.msg === "stop") {
        onStop(tId);
    }
}

onmessage = onReceivedMessage;