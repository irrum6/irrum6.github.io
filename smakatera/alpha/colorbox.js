class ColorBox extends HTMLElement{
    constructor(){
        super();
        let template = document.getElementById("color_box_template");
        let templateContent = template.content;

        let clone = templateContent.cloneNode(true);

        const stylee = document.createElement('link');
        stylee.setAttribute('rel', 'stylesheet');
        stylee.setAttribute('href', 'styles/colorbox.css');

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(stylee);
        shadowRoot.appendChild(clone);
        this.SetLabel();
        this.Setup();
    }
    SetLabel(){
        let label = this.getAttribute("data-text");
        let span = this.Query('span');
        span.textContent = label;
    }
    Query(s) {
        return this.shadowRoot.querySelector(s);
    }
    QueryAll(s){
        return this.shadowRoot.querySelectorAll(s);
    }
    FindActive(){
        return this.Query(".active");
    }
    SetActive(e){        
        let active = this.FindActive();
        if(active==null){
            return;
        }
        active.classList.remove('active');
        e.target.classList.add('active');
    }
    GetValue(){
         // find active 
        let active = this.FindActive();
        //debugger;
        if (active ===null){
            return "";             
        }
        return  active.tagName==="INPUT" ?active.value:active.getAttribute("data-color");
    }
    Setup(){
        let buttons = this.QueryAll("button");
        for(const b of buttons){
            b.addEventListener("click",this.SetActive.bind(this));
        }        
        this.Query('input').addEventListener("click",this.SetActive.bind(this));
    }
}
customElements.define("color-box",ColorBox);
Object.freeze(ColorBox);