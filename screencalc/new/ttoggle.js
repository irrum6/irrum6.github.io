function setToggles() {
    let switchers = document.body.querySelectorAll('.span-switcher');
    let len = switchers.length;
    for (let i = 0; i < len; i++) {
        switchers[i].addEventListener('click', (event) => {
            let target = event.target.parentElement;
            {
                //if not disabled 
                let id = target.getAttribute('id');
                let disabled=false;
                let contrids = target.getAttribute('data-app-switch-contra').split(',');
                if (id !== null) {
                    document.body.querySelector(('#$id'.replace('$id', id))).dispatchEvent(new CustomEvent('toggle', { detail: 'toggle' }));
                }
                for (let i = 0, len = contrids.length; i < len; i++) {
                    if (contrids[i] !== null && contrids[i] !== '#') {
                        document.body.querySelector(('#$cid'.replace('$cid', contrids[i]))).dispatchEvent(new CustomEvent('toggle', { detail: 'toggle' }));
                    }
                }
            }

        });

        switchers[i].addEventListener('off', (event) => {
            let target = event.target;
            let linked = target.getAttribute('data-app-linked-inputs').split(',');
            //disable inputs
            for (let i = 0, len = linked.length; i < len; i++) {
                let selector = '[data-app-reference="#ref"]'.replace("#ref", linked[i]);
                document.body.querySelector(selector).disabled = true;
            }
            //visual flag change
            target.children[0].style.display = "flex";
            target.children[1].style.display = "none";
        });
        switchers[i].addEventListener('on', (event) => {
            let target = event.target;
            let linked = target.getAttribute('data-app-linked-inputs').split(',');
            //enable inputs
            for (let i = 0, len = linked.length; i < len; i++) {
                let selector = '[data-app-reference="#ref"]'.replace("#ref", linked[i]);
                document.body.querySelector(selector).disabled = false;
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
            let targ = event.target
            let val = targ.value;
            calcapp.Unit = val;
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