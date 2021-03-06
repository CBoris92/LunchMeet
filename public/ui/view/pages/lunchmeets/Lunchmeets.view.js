sap.ui.jsview("ui.view.pages.lunchmeets.Lunchmeets", {

	getControllerName: function () {
		return "ui.view.pages.lunchmeets.Lunchmeets";
	},
	
	createContent: function (oController) {
		
		// to avoid scroll bars on desktop the root view must be set to block display
		this.setDisplayBlock(true);
		
		// create app
		this.app = new sap.m.SplitApp("appLunchmeets");

		// load the master page
		var master = sap.ui.xmlview("LunchmeetsMaster", "ui.view.pages.lunchmeets.LunchmeetsMaster");
		master.getController().nav = this.getController();
		this.app.addPage(master, true);

		// var master = sap.ui.xmlview("LunchMeets2", "ui.view.lunchmeets2.LunchMeets2");
		// master.getController().nav = this.getController();
		// this.app.addPage(master, true);

		// var master = sap.ui.xmlview("LetsLunch2", "ui.view.letslunch2.LetsLunch2");
		// master.getController().nav = this.getController();
		// this.app.addPage(master, true);

		// var master = sap.ui.xmlview("Preferences", "ui.view.Preferences");
		// master.getController().nav = this.getController();
		// this.app.addPage(master, true);
		
		// load the empty page
		// var empty = sap.ui.xmlview("Empty", "ui.view.fragments.Empty");
		// this.app.addPage(empty, false);

		// load the message page
		// var messagePage = sap.ui.xmlview("MessagePage", "ui.view.fragments.MessagePage");
		// this.app.addPage(messagePage, false);
		
		return this.app;
	}
});