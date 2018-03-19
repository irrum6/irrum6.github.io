let aboutswithers = document.body.querySelectorAll(".about-switcher");

for (let i = 0, len = aboutswithers.length; i < len; i++) {
    aboutswithers[i].addEventListener('click', (event) => {
        //needs translate later
        let text = TranslateData[language]['toggle_instruction'];
        alert(text);
    });
}

if(window.innerWidth<600){
    document.getElementById('Calc_button').classList.add('btn-block');
    document.getElementById('mainbox').classList.add('container_fluid');
}