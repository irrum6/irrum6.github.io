let switchradios = document.body.querySelectorAll(".switch-radio");

for (let i = 0, len = switchradios.length; i < len; i++) {
    switchradios[i].addEventListener('click', (event) => {
        let elem = event.target;
        let value = elem.getAttribute('data-value');
        console.log(value);
        if (value === "1") {
            elem.classList.add('bg-light-green');
            console.log(elem.nextSibling);
            elem.nextElementSibling.classList.remove('bg-red-custom-1')
        } else if (value === "0") {
            elem.classList.add('bg-red-custom-1');
            elem.previousElementSibling.classList.remove('bg-light-green');
        }
    })
}