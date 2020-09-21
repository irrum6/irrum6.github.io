// debugger;
const standardRes = 1080;
const compensationFactor = Math.pow(dimm / standardRes, 2);
let colArr = new Uint8Array(6);

const _start = 2;
const _max = closestFactorOf2(layers);

const _threeQuarters = Math.round(canvas.width * 0.75);

const _upwest =  36;

const times = [];
times.push({'time':Date.now(),'frames':0});

let fpstime1 = Date.now();

mainer(1);

function finale() {
    const framesTotal = times.map(e=>e.frames).reduce((a,v,i,ar)=>a+v,0);
    const score=calculateScore(times)
    // document.body.querySelector('canvas').style.display = 'none';
    document.body.querySelector("#results").textContent = `
    Render Resolution : ${dimm} X ${dimm} pixels
    Compensation Factor to 1080p : ${compensationFactor}
    Max Layers : ${_max}
    Total Frames:${framesTotal}
    Score : ${score}`;
}

function current(num){
    if(num<2){return}
    const l = times.length;
    // debugger;
    const lrt=((times[l-1].time-times[l-2].time)/1000);
    const timeTotal=((times[l-1].time-times[0].time)/1000);
    document.body.querySelector("#current").textContent=`
    Current: ${num*2 <= _max?num*2:0}
    Last round: ${num}
    Time for last round: ${lrt}
    Total Time :${timeTotal}`;
}

function mainer(num) {
    current(num);
    num = num << 1;
    if (num > _max) {
        finale();
        return;
    }    
    doPaint(num, num);
}
function doPaint(n, n1) {
    if (n < 1) {
        // debugger;        
        times.push({'time':Date.now(),'frames':n1});
        mainer(n1);
        return;
    }

    let _time = Date.now();
    let fps = Math.round((1 / (_time - fpstime1)) * 1000);
    fpstime1 = _time;

    window.crypto.getRandomValues(colArr);

    const sx = Math.floor(colArr[0] / 255 * canvas.width);
    const sy = Math.floor(colArr[1] / 255 * canvas.width);
    const red = colArr[2];
    const green = colArr[3];
    const blue = colArr[4];
    const alpha = Math.floor(colArr[5] / 255 * 100);
    const color = `rgba(${red} ,${green} ,${blue} ,${alpha})`;

    context.beginPath();

    context.font = "20px Arial";

    context.fillStyle = color;
    context.rect(sx, sy, _threeQuarters, _threeQuarters);
    context.fill();

    context.fillStyle = "black";
    context.clearRect(_upwest, _upwest-25, 200,30);
    const _text = `Frames left :${n}`
    context.fillText(_text, _upwest+10, _upwest);

    if (n % 5 == 0) {
        context.clearRect(_upwest, _upwest + 40, 200, 30);
        const _fpsText = `FPS: ${fps}`;
        context.fillText(_fpsText, _upwest+10, _upwest + 60);
    }    
    context.closePath();

    window.requestAnimationFrame(doPaint.bind(null, n - 1, n1));
}

function calculateScore(times) {
    const len = times.length;
    const shifted = 1024;

    //formula is sum 
    //1024<<numberofruns x factor / time
    //cause layers double for each run 
    //so does maxscore
    //first time is start time
    //so offset by 1
    let score = 0;
    for (let i = 1; i < len; i++) {
        const maxScore = shifted << (i - 1);
        let diff = times[i].time - times[i - 1].time;
        // console.log(diff);
        if (diff == 0) diff = 1;//avoid infinity
        let subScore = maxScore * compensationFactor;
        score += Math.floor(subScore / (diff));
    }
    return score;
}

function closestFactorOf2(num) {
    let x = 1;
    for (; x < num; x = x << 1);
    let half = x / 2;
    let xd = Math.abs(x - num);
    let hd = Math.abs(half - num);
    return xd > hd ? half : x;
}