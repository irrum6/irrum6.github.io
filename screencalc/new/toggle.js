let switchradios = document.body.querySelectorAll(".switch-radio");

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
/**
 * 
 * @param {string} elemlist 
 * @param {boolean} off 
 */
function OnsAndOffs(elemlist, off) {
    let offs = elemlist.split(',');
    for (let i = 0, len = offs.length; i < len; i++) {
        document.getElementById(offs[i]).disabled = off;
    }
}