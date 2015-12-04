sap.ui.define( ["sap/ui/core/mvc/Controller"], function (Controller) {
	"use strict";

	return Controller.extend("ui.view.pages.Menu", {
		onInit : function () {},

		onToLunchmeetsPage : function () {
			this.getOwnerComponent().getRouter().navTo("lunchmeets");
		},

		onToDashboardPage : function () {
			this.getOwnerComponent().getRouter().navTo("dashboard");
		}
	});

}, /* bExport= */ true);
