let switchradios = document.body.querySelectorAll(".switch-radio");

for (let i = 0, len = switchradios.length; i < len; i++) {
    switchradios[i].addEventListener('click', (event) => {
        let elem = event.target;
        let value = elem.getAttribute('data-value');
        console.log(value);
        if (value === "1") {
            elem.classList.add('bg-light-green');
            elem.previousElementSibling.classList.remove('bg-red-custom-1')
        } else if (value === "0") {
            elem.classList.add('bg-red-custom-1');
            elem.nextElementSibling.classList.remove('bg-light-green');
        }
    });
}

let aboutswithers = document.body.querySelectorAll(".about-switcher");

for (let i = 0, len = aboutswithers.length; i < len; i++) {
    aboutswithers[i].addEventListener('click', (event) => {
        //needs translate later
        let text = "use these red/green toggles, switch on to use computed value, switch off to input and compute other field. Applies to all toggles ";
        alert(text);
    });
}