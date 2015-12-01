jQuery.sap.require("ui.util.Formatter");

sap.ui.controller("ui.view.dashboard.Dashboard", {

	onInit : function () {
	},

	handleNavBackToMenu : function (evt) {
		this.nav.back("NavMenu");
	}

});