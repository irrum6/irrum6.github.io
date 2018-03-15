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


//let dove=document.createElement('div');
//dove.style="width:100px;height:100px;background-color:red;position:absolute;top:50px;"

//document.body.appendChild(dove);

let aboutswithers = document.body.querySelectorAll(".about-switcher");

for (let i = 0, len = aboutswithers.length; i < len; i++) {
    aboutswithers[i].addEventListener('click', (event) => {
        alert(1);
    });
}