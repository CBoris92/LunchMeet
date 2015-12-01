jQuery.sap.require("ui.util.Formatter");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("ui.view.lunchmeets.LunchMeet", {

	onInit : function () {
		sap.ui.getCore().getEventBus().subscribe('handleLunchMeetModel', 'setModel',
			function (channel, event, data){
				this.handleLunchMeetModel(data);
			}.bind(this)
		);
	},

	handleLunchMeetModel : function (data) {
		var oModel = new sap.ui.model.json.JSONModel();
		var jsonData = JSON.stringify(data.oModel.getProperty(data.sPath));
		oModel.setJSON(jsonData);
		this.getView().setModel(oModel);
	},

	handleNavButtonPress : function (evt) {
		this.nav.back("lunchmeets.LunchMeets");
	}
});