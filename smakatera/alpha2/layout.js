{
    let c = document.getElementById("canvas1");
    let style = window.getComputedStyle(c.parentElement);
    c.width = style.width.replace("px", ""); //*0.95;
    c.height = style.height.replace("px", ""); //*0.95;
    if(window.innerWidth <800){
        document.getElementById("new").textContent = "";
    }
}