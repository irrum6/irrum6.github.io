/**
 * 
 * @param {object[ScreenCalc]} myApp 
 */
function SetUpUnitSwitchers(myApp) {
    let radios = Lib.qa("[name='unitoptions']");

    console.log(radios);
    for (let i = 0, len = radios.length; i < len; i++) {
        radios[i].addEventListener('click', (event) => {
            //console.log(event.target.id, event.target.checked);
            let checked = event.target.checked;
            if (checked) {
                let from = myApp.Unit;
                let to = event.target.value;
                let convertables = Lib.qa('[data-app-convertable="1"]');
                for (let i = 0, len = convertables.length; i < len; i++) {
                    let value = Number.parseFloat(convertables[i].value);
                    value = Convert.FromTo(from, to, value);
                    if (value.success) {
                        convertables[i].value = Number.parseFloat(value.result);
                    }
                }
                myApp.Unit = event.target.value;
            }

        });
    }
}

/**
 * @param {string} elemlist 
 * @param {boolean} off 
 */
function OnsAndOffs(elemlist, off) {
    let offs = elemlist.split(',');
    for (let i = 0, len = offs.length; i < len; i++) {
        document.getElementById(offs[i]).disabled = off;
    }
}

/*let switchradios = document.body.querySelectorAll(".switch-radio");

for (let i = 0, len = switchradios.length; i < len; i++) {
    switchradios[i].addEventListener('click', (event) => {
        let elem = event.target;
        let value = elem.getAttribute('data-value');
        console.log(typeof value);
        if (value === "1") {
            elem.classList.add('bg-light-green');
            let contra = document.getElementById(elem.getAttribute('data-app-contr-id'));
            contra.classList.remove('bg-red-custom-1');

        } else if (value === "0") {
            elem.classList.add('bg-red-custom-1');
            let contra = document.getElementById(elem.getAttribute('data-app-contr-id'));
            contra.classList.remove('bg-light-green');
        }
        if (elem.hasAttribute('data-app-switch-off')) {
            let offs = elem.getAttribute('data-app-switch-off');
            OnsAndOffs(offs, true);
        }
        if (elem.hasAttribute('data-app-switch-on')) {
            let offs = elem.getAttribute('data-app-switch-on');
            OnsAndOffs(offs, false);
        }
    });
}
*/