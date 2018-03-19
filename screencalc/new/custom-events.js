let consol= console;
let el=document.getElementById('Calc_button');
el.addEventListener('off', function (event) {
    consol.log(event.detail);
    console.log(event.target);
    consol.log(event.target);
});
let event = new CustomEvent('off', { detail: 'custom event' });
el.dispatchEvent(event);
