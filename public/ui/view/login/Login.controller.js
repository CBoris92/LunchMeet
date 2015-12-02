jQuery.sap.require("ui.util.Formatter");
jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("ui.view.login.Login", {

	onInit: function() {
		var oModel = new sap.ui.model.json.JSONModel({"username":'',"password":''});
		oModel.setDefaultBindingMode("TwoWay");
		this.getView().setModel(oModel);

		var oName = this.getView().byId('userID'); 
		var oPassword = this.getView().byId('userPWD');

		var that = this;

		oName.onAfterRendering = function() {
			if (sap.m.Input.prototype.onAfterRendering) {
				sap.m.Input.prototype.onAfterRendering.apply(this);
			}
			this.$().bind('keypress', function(e) {
				var code = e.keyCode || e.which;
				if (code === 13) {
					if (oName.getValue().trim() !== '') {
						oPassword.$().find('INPUT').focus();
					} else {
						sap.m.MessageToast.show('Please enter user name.');
					}
				}
			});
		}
  
		oPassword.onAfterRendering = function() {
			if (sap.m.Input.prototype.onAfterRendering) {
				sap.m.Input.prototype.onAfterRendering.apply(this);
			}
			this.$().bind('keypress', function(e) {
				var code = e.keyCode || e.which;
				if (code === 13) {
					if (oPassword.getValue().trim() !== '') {
						if (oName.getValue() && oName.getValue().trim() !== '') {
							that.handleLoginBtnPress();
						} else {
							oName.$().find('INPUT').focus();
						}
					} else {
						sap.m.MessageToast.show('Please enter password.');
					}
				}
			});
		}
	},

	onAfterRendering: function() {
		
	},

	/**
	 * Whenever a selection is made on the calendar, we update the display text
	 *
	 */
	handleLoginBtnPress: function(oEvent) {
		var _oUsername = this.getView().getModel().getProperty('/username');
		var _oPassword = this.getView().getModel().getProperty('/password');

		try {
			// if username and pwd OK
			if (lunchmeeters.find({"username":_oUsername}).count()) {
				// Build and set People Meteor model from meteor subscription and cursor
	            var oUser = new MeteorModel(
	                "lunchmeeters",
	                lunchmeeters.find({"username":_oUsername}),
	                lunchmeeters        
	            );
				if (oUser.oData[0].password == _oPassword) {
					sap.m.MessageToast.show("Bienvenue "+ oUser.oData[0].shortname +" !");
					// go to Nav Menu page
					sap.ui.getCore().getEventBus().publish('nav', 'menu', {isMaster: true, userModel: oUser});
				} else {
					sap.m.MessageToast.show("Username ou password oublié ? Contactes un admin");
				}
			} else {
				// message d'erreur
				sap.m.MessageToast.show("Username ou password oublié ? Contactes un admin");
			}
		} catch(e) {
			sap.m.MessageToast.show("Username ou password oublié ? Contactes un admin");
		}
	}



});