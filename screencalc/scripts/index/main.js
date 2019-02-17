//prevent form submiting
q("form")[on]('submit', e => e.preventDefault());

try {
    let screen = new Screen(5.2, 2.6, 401, "Inches");
    let presenter = new Presenter(screen);
    presenter.display();

}
catch (ex) {
    console.log(ex);
}
