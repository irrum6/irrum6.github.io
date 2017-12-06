let view = new View('english');
let game = new ColorGame(view);

game.applyDefaultSettings();

view.setupHandlers(game);

view.widgetFontCorrection();

view.correctGrid();

view.updateInterfaceWhenLocaleChanges();