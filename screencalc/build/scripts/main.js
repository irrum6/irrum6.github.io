try {
    let presenter = new Presenter(5.4, 2.7, 403, "Inches", "eng");
    presenter.display();
    // drawRedrawCanvas();
}
catch (ex) {
    if (ex.message) console.error(ex.message);
    console.log(ex);
}