/*create HTML element by tag and options
@return HTMLElement
*/
let elem = (tag, options) => {
    let element = document.createElement(tag);
    for (option in options) {
        element[option] = options[option];
    }
    return element;
};
