try {
    var presenter = new Presenter(5.4, 2.7, 403, "Inches", "geo");
    presenter.display();
    presenter.translate();
    // drawRedrawCanvas();
}
catch (ex) {
    if (ex.message) console.error(ex.message);
    console.log(ex);
}