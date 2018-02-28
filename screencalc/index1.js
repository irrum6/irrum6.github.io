let ScreenCalc = {};

ScreenCalc.EnableResolutionInput = function (reverse) {
    let w = Lib.q("#width");
    let h = Lib.q("#height");
    if (typeof reverse === "boolean" && reverse) {
        w.disabled = true;
        h.disabled = true;
    } else {
        w.disabled = false;
        h.disabled = false;
    }
};

ScreenCalc.WatchVal = function () {
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