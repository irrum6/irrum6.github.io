let ScreenCalc = {};

ScreenCalc.EnableDisableResolutionInput = function (event) {
    let w = Lib.q("#width");
    let h = Lib.q("#height");
    let v = event.target.checked;
    if (!v) {
        w.disabled = true;
        h.disabled = true;
    } else {
        w.disabled = false;
        h.disabled = false;
    }
};

ScreenCalc.WatchVal = function (event) {
    let val = parseFloat(event.target.value);
    let max = parseFloat(event.target.max);
    let min = parseFloat(event.target.min);
    if (Number.isNaN(val)) { }
    if (val > max) {
        ScreenCalc.ShowMessage('Maximum value for this input is ' + max, false);
        val = max;
    }
    if (val < min) {
        ScreenCalc.ShowMessage('Minimum value for this input is ' + min, false);
        val = min
    }
    event.target.value = val;
};

ScreenCalc.ShowMessage = function (message, reverse) {
    let el = Lib.q('#alertbar > p');
    if (typeof reverse === "boolean" & reverse) {
        el.parentElement.style.visibility = "hidden";
    } else {
        el.innerHTML = '' + message + ' (click to hide this message)';
        el.parentElement.style.visibility = "visible";
    }

};

ScreenCalc.CalcRatio = function (height, width, normalize) {
    if (Lib.isPositiveInteger(height, width)) {
        let ratio = height / width;
        let ratioPrecision = Lib.toPrecision(ratio, 2);
        if (normalize) {
            let wideAspect = Lib.toPrecision((ratio * 9), 1);
            let normalizedRatio = (wideAspect + "/9").replace('.0', '');
            return { success: true, ratio: ratio, correctedRatio: ratioPrecision, normalizedRatio: normalizedRatio };
        }
        return { success: true, ratio: ratio };
    }
    return { success: false };
};

ScreenCalc.Calc = function () {
    let [ratio, correctedRatio, normalizedRatio] = [1, 1, 1];

    let [diagSize, resLength, resWidth, providedRatio] = ['#diag', '#height', '#width', '#ratio'].map((elem) => {
        return Lib.q(elem).value;
    });

    providedRatio = providedRatio.split('/');

    if (diagSize.length === 0) {
        Lib.q("#diag").classList.add("warning");
        ScreenCalc.ShowMessage('Enter diagonal size');
    } else {
        let normalize = true;
        resLength = parseInt(resLength, 10);
        resWidth = parseInt(resWidth, 10);

        let calcratio = { success: false };

        let inputEnabled = Lib.q("#confresinput").checked;

        if (inputEnabled) {
            calcratio = ScreenCalc.CalcRatio(resLength, resWidth, true);
        }
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

        let updateObj = {
            diag: diagSize,
            diagmm: diagSizemm,
            wid: widthmm,
            len: lengthmm,
            ratio: providedRatio.join('/'),
            cratio: correctedRatio,
            ncratio: normalizedRatio,
            area: screenArea
        };

        ScreenCalc.Update(updateObj);
    }
};

ScreenCalc.Update = function (updateObj) {
    Lib.q('#diag-par').textContent = 'Diagonal Size : $i inches ($m mm)'
        .replace("$i", updateObj.diag).replace("$m", updateObj.diagmm);
    Lib.q('#inp-ratio-par').textContent = 'Inputed Aspect Ratio : $ratio'
        .replace("$ratio", updateObj.ratio);
    if (updateObj.cratio > 1) {
        Lib.q('#calc-ratio-par').textContent = 'Calculated Aspect Ratio : $cratio'
            .replace("$cratio", updateObj.cratio);
        Lib.q('#calc-ratio-norm-par').textContent = 'Calculated Aspect Ratio (Normalized to 16/9 format) : $ncratio'
            .replace("$ncratio", updateObj.ncratio);
    } else {
        Lib.q('#calc-ratio-par').textContent = '';
        Lib.q('#calc-ratio-norm-par').textContent = '';
    }
    Lib.q('#calc-width-par').textContent = 'Calculated Width:$m mm ($i inches)'
        .replace("$m", Lib.toPrecision(updateObj.wid, 1))
        .replace("$i", Lib.toPrecision(updateObj.wid / 25.4, 1));
    Lib.q('#calc-height-par').textContent = 'Calculated Height:$m mm ($i inches)'
        .replace("$m", Lib.toPrecision(updateObj.len, 1))
        .replace("$i", Lib.toPrecision(updateObj.len / 25.4, 1));
    Lib.q('#calc-area-par').innerHTML = 'Calculated Area: $m mm<sup>2</sup> $cm cm<sup>2</sup> ($i inch<sup>2</sup>)'
        .replace("$m", Lib.toPrecision(updateObj.area, 1))
        .replace("$cm", Lib.toPrecision(updateObj.area / 100, 1))
        .replace("$i", Lib.toPrecision((updateObj.area / 25.4) / 25.4, 1));
    Lib.q('#result').style.visibility = "visible";
};

//prevent form submiting

document.getElementsByTagName('form')[0].onsubmit = function (event) {
    event.preventDefault();
};