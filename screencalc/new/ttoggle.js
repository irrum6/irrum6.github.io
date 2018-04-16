function setToggles() {
    let switchers = document.body.querySelectorAll('.span-switcher');
    let len = switchers.length;
    for (let i = 0; i < len; i++) {
        switchers[i].addEventListener('click', (event) => {
            let target = event.target.parentElement;
            let on = (target.getAttribute('data-app-on') === '1') ? true : false;
            //console.log(on);
            if (on) {
                //if compute is on, then set off
                target.setAttribute('data-app-on', '0');

                let offs = target.getAttribute('data-app-off-disable').split(',');
                let ons = target.getAttribute('data-app-off-enable').split(',');

                for (let i = 0, len = offs.length; i < len; i++) {
                    let selector = '[data-app-switch-reference="#inp"]'.replace("#inp", offs[i]);
                    console.log(selector);
                    let elem = document.body.querySelector(selector);
                    console.log(elem);
                    elem.dispatchEvent(new CustomEvent('off', { detail: 'off' }))
                }
                for (let i = 0, len = ons.length; i < len; i++) {
                    let selector = '[data-app-switch-reference="#inp"]'.replace("#inp", ons[i]);
                    let elem = document.body.querySelector(selector);
                    elem.dispatchEvent(new CustomEvent('on', { detail: 'on' }))
                }
            } else {
                //if compute is off, then set on
                target.setAttribute('data-app-on', '1');

                let offs = target.getAttribute('data-app-on-disable').split(',');
                let ons = target.getAttribute('data-app-on-enable').split(',');

                for (let i = 0, len = offs.length; i < len; i++) {
                    let selector = '[data-app-switch-reference="#inp"]'.replace("#inp", offs[i]);
                    let elem = document.body.querySelector(selector);
                    elem.dispatchEvent(new CustomEvent('off', { detail: 'off' }))
                }
                for (let i = 0, len = ons.length; i < len; i++) {
                    let selector = '[data-app-switch-reference="#inp"]'.replace("#inp", ons[i]);
                    let elem = document.body.querySelector(selector);
                    elem.dispatchEvent(new CustomEvent('on', { detail: 'on' }))
                }
            }

        });

        //input off
        switchers[i].addEventListener('off', (event) => {
            let target = event.target;
            let linkeds = target.getAttribute('data-app-linked-inputs').split(',');
            for (let i = 0, len = linkeds.length; i < len; i++) {
                let selector = '[data-app-reference="#ref"]'.replace("#ref", linkeds[i]);
                let elem = document.body.querySelector(selector);
                elem.disabled = true;
            }

            //visual flag change
            target.children[0].style.display = "flex";
            target.children[1].style.display = "none";
        });
        //input on
        switchers[i].addEventListener('on', (event) => {
            let target = event.target;
            let linkeds = target.getAttribute('data-app-linked-inputs').split(',');
            for (let i = 0, len = linkeds.length; i < len; i++) {
                let selector = '[data-app-reference="#ref"]'.replace("#ref", linkeds[i]);
                let elem = document.body.querySelector(selector);
                elem.disabled = false;
            }
            //visual flag change
            target.children[0].style.display = "none";
            target.children[1].style.display = "flex";
        });
    }
}

function setUnitEvents(calcapp) {
    let unitswitchers = document.getElementsByName('unitoptions');
    let len = unitswitchers.length;
    for (let i = 0; i < len; i++) {
        unitswitchers[i].addEventListener('click', function (event) {
            let to = event.target.value;
            let from = calcapp.Unit;
            calcapp.Unit = to;
            let convertables = document.body.querySelectorAll('[data-app-convertable="1"]');
            for (let i = 0, len = convertables.length; i < len; i++) {
                let val = Number.parseFloat(convertables[i].value);
                console.log(val);
                let convert = Convert.FromTo(from, to, val);
                if (convert.success) {
                    convertables[i].value = convert.result;
                }
            }
            calcapp.calc();
        });
    }
}

function setElementChangeEvents(calcapp) {
    let elements = document.body.querySelectorAll('[data-app-reference]')
    for (let i = 0, len = elements.length; i < len; i++) {
        elements[i].addEventListener('change', function (event) {
            let targ = event.target;
            if (!targ.disabled) {
                calcapp.calc();
            }
        });
    }
}