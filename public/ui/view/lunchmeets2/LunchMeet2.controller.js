jQuery.sap.require("ui.util.Formatter");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require("sap.m.Dialog");

sap.ui.controller("ui.view.lunchmeets2.LunchMeet2", {

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
		this.nav.back("lunchmeets2.LunchMeets2");
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
});