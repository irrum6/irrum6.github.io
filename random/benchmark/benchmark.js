// debugger;
const standardRes = 1080;
const compensationFactor = Math.pow(dimm / standardRes, 2);
let colArr = new Uint8Array(6);

const _start = 2;
const _max = closestFactorOf2(layers);

const half = canvas.width / 2;

const times = [];
times.push(Date.now());

mainer(1);

function finale() {
    // document.body.querySelector('canvas').style.display = 'none';
    document.body.querySelector("#results").textContent = `
Render Resolution : ${dimm} X ${dimm} pixels
Compensation Factor to 1080p : ${compensationFactor}
Max Layers : ${_max}
Score : ${calculateScore(times)}
`;
}

function mainer(num) {
    if (num >= _max) {
        finale();
        return;
    }
    num = num << 1;
    doPaint(num, num);
}
function doPaint(n, n1) {
    if (n < 1) {
        // console.log(n);
        mainer(n1);
        times.push(Date.now());
        return;
    }
    console.log(n1);
    window.crypto.getRandomValues(colArr);

    const sx = Math.floor(colArr[0] / 255 * canvas.width);
    const sy = Math.floor(colArr[1] / 255 * canvas.width);
    const red = colArr[2];
    const green = colArr[3];
    const blue = colArr[4];
    const alpha = Math.floor(colArr[5] / 255 * 100);
    const color = `rgba(${red} ,${green} ,${blue} ,${alpha})`;

    context.beginPath();
    context.fillStyle = color;
    context.rect(sx, sy, half, half);
    context.fill();
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
        let diff = times[i] - times[i - 1];
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