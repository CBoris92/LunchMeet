jQuery.sap.require("ui.util.Formatter");

sap.ui.controller("ui.view.pages.dashboard.Dashboard", {

	onInit : function () {


		var oModel = new sap.ui.model.json.JSONModel(
		{
			"address" : {
				"street" : "15 Rue Martel",
				"zip" : "75010",
				"city" : "Paris",
				"country" : "France"
			}
		});
		this.getView().setModel(oModel);
	},

	onBack : function () {
		var sPreviousHash = sap.ui.core.routing.History.getInstance().getPreviousHash();

		//The history contains a previous entry
		if (sPreviousHash !== undefined) {
			window.history.go(-1);
		} else {
			// There is no history!
			// replace the current hash with page 1 (will not add an history entry)
			this.getOwnerComponent().getRouter().navTo("menu", null, true);
		}
	}


});