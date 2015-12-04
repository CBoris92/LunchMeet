jQuery.sap.require("ui.util.Formatter");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require("sap.m.Dialog");

sap.ui.controller("ui.view.pages.lunchmeets.LunchmeetsDetail", {

	/**
	 *	Initialisation of the controller
	 *
	 */
	onInit : function () {
		// subscribe to the eventBus in order to set the right model to the view
		sap.ui.getCore().getEventBus().subscribe('handleLunchMeetModel', 'setModel',
			function (channel, event, data){
				this.handleLunchMeetModel(data);
			}.bind(this)
		);

		if (sap.ui.getCore().getModel('device').oData.isPhone) {
			this.getView().sId = "LunchmeetsDetail";
		}
	},

	onBack : function () {
		var sPreviousHash = sap.ui.core.routing.History.getInstance().getPreviousHash();

		//The history contains a previous entry
		if (sPreviousHash !== undefined) {
			window.history.go(-1);
		} else {
			// There is no history!
			// replace the current hash with page 1 (will not add an history entry)
			// this.getOwnerComponent().getRouter().navTo("page1", null, true);
		}
	},

	/**
	 *	Setting the model
	 *
	 */
	handleLunchMeetModel : function (data) {
		var oModel = new sap.ui.model.json.JSONModel();
		var jsonData = JSON.stringify(data.oModel.getProperty(data.sPath));
		oModel.setJSON(jsonData);
		this.getView().setModel(oModel);
	},

	/**
	 *	Handles navigation back to Worklist
	 *
	 */
	handleNavButtonPress : function (evt) {
		// this.nav.back("pages.lunchmeets.LunchmeetsMaster");
		var sPreviousHash = sap.ui.core.routing.History.getInstance().getPreviousHash();

		//The history contains a previous entry
		if (sPreviousHash !== undefined) {
			window.history.go(-1);
		} else {
			// There is no history!
			// replace the current hash with page 1 (will not add an history entry)
			this.getOwnerComponent().getRouter().navTo("menu", null, true);
		}
	},

	/**
	 *	Handles submit a review
	 *
	 */
	onSubmitDialog: function () {

		// creates a dialog with a text area
		var dialog = new sap.m.Dialog({
			title: 'Un commentaire n\'en vaudra pas deux',
			type: 'Message',
			content: [
				new sap.m.Text({ text: 'Il est important d\'exprimer ses sentiments, alors ne sois pas timide! ' }),
				new sap.m.TextArea('submitDialogTextarea', {
					liveChange: function(oEvent) {
						var sText = oEvent.getParameter('value');
						var parent = oEvent.getSource().getParent();

						parent.getBeginButton().setEnabled(sText.length > 0);
					},
					width: '100%',
					placeholder: 'Lances toi ...'
				})
			],
			beginButton: new sap.m.Button({
				text: 'Envoyer',
				enabled: false,
				press: function () {
					// var sText = sap.ui.getCore().byId('submitDialogTextarea').getValue();
					var oLastName = this.getView().getModel('loggedUser').getProperty('/lastname');
					sap.m.MessageToast.show('Merci pour ton commentaire '+ oLastName +' !');
					dialog.close();
				}.bind(this)
			}),
			endButton: new sap.m.Button({
				text: 'Annuler',
				press: function () {
					dialog.close();
				}
			}),
			afterClose: function() {
				dialog.destroy();
			}
		});
		// once it is instantiated, opens the dialog
		dialog.open();
	},

	toGoogleMapsInNewTab : function (evt) {
		var oSource = evt.getSource();
		window.open();
	}
});