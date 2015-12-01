jQuery.sap.require("ui.util.Formatter");

sap.ui.controller("ui.view.letslunch.LetsLunch", {

	onInit : function() {
		this.choice = "";
	},

	handleNavBackToMenu : function(evt) {
		this.nav.back("NavMenu");
	},

	handleChoiceBtnPressed : function(evt) {
		var choice = evt.getSource().getProperty('icon');
		var iconModel = this.getView().getModel('icon');
		switch (choice) {
			case iconModel.oData.Like :
				this.choice = "like";
		        break;
		    case iconModel.oData.Dislike :
				this.choice = "dislike";
		        break;
		    case iconModel.oData.Rewind :
				this.choice = "rewind";
		        break;
		    case iconModel.oData.Superlike :
				this.choice = "superlike";
		        break;
		}
		this.handleNextCard(this.choice);
	},

	handleNextCard : function(oValue) {
		if (oValue == "like") {
			console.log("User liked it");
		} else if (oValue == "dislike") {
			console.log("User disliked it");
		} else if (oValue == "rewind") {
			console.log("User rewinded it");
		} else if (oValue == "superlike") {
			console.log("User superliked it");
		}
		console.log("Show the next card");
	}

});