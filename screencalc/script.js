function setval(event) {
    let val = event.target.getAttribute('data-value');
    event.target.value = val;
}

function calcRatio(len, wid, normalize) {
    if (Lib.isPositiveInteger(len, wid)) {
        let ratio = len / wid;
        let ratioPrecision = Lib.toPrecision(ratio, 2);
        if (normalize) {
            let wideAspect = Lib.toPrecision(ratio * 9, 1);
            let normalizedRatio = wideAspect + "/9";
            return { success: true, ratio: ratio, correctedRatio: ratioPrecision, normalizedRatio: normalizedRatio };
        }
        return { success: true, ratio: ratio };
    }
    return { success: false };
}
function calc() {

    let ratio = 1, correctedRatio = 1, normalizedRatio = 1;

    let resLength = document.getElementById('length').value;
    let resWidth = document.getElementById('width').value;
    let providedRatio = document.getElementById('ratio').value.split('/');
    let diagSize = document.getElementById('diagsize').value;

    let resultDiv = document.getElementById('result');

    let normalize = true;
    let calcratio = calcRatio(resLength, resWidth, true);

    if (calcratio.success) {
        ratio = calcratio.ratio;
        correctedRatio = calcratio.correctedRatio;
        normalizedRatio = calcratio.normalizedRatio;
    }

    let diagSizemm = diagSize * 25.4;
    let lengthmm = 1;
    let widthmm = 1;
    let screenArea = 1;

    //compare provided and actual ratios
    if ((providedRatio !== ratio) && ratio > 1) {
        //use calculated ratio
        widthmm = Math.sqrt((diagSizemm * diagSizemm) / (1 + (ratio * ratio)));
        lengthmm = widthmm * ratio;
    } else {
        //use provided ratio
        let ratio1 = providedRatio[1];
        let ratio2 = providedRatio[0];
        widthmm = Math.sqrt((diagSizemm * diagSizemm) / ((ratio1 * ratio1) + (ratio2 * ratio2))) * ratio1;
        lengthmm = (widthmm / ratio1) * ratio2;
    }

    screenArea = widthmm * lengthmm;

    resultDiv.innerHTML = "";

    resultDiv.appendChild(Lib.elemP('Diagonal Size : ' + diagSize));

    resultDiv.appendChild(Lib.elemP('Aspect Ratio: ' + providedRatio.join('/')));

    resultDiv.appendChild(Lib.elemP('Calculated aspect ratio: ' + correctedRatio));

    resultDiv.appendChild(Lib.elemP('Width: ' + Lib.toPrecision(widthmm, 1) + 'mm(' + Lib.toPrecision((widthmm / 25.4), 1) + 'inches)'));
    resultDiv.appendChild(Lib.elemP('Lenght: ' + Lib.toPrecision(lengthmm, 1) + 'mm(' + Lib.toPrecision((lengthmm / 25.4), 1) + 'inches)'));

    resultDiv.appendChild(Lib.elemP('Calculated Area: ' + Lib.toPrecision(screenArea, 2) + 'sq.mm(' + Lib.toPrecision((screenArea / 100), 1) + 'sq.cm'
        + Lib.toPrecision((screenArea / (25.4 * 25.4)), 2) + 'sq.inch)'));
}