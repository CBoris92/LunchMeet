jQuery.sap.require("ui.util.Formatter");

sap.ui.controller("ui.view.letslunch.LetsLunch", {

	_oChoice: "",
	_oNextCard: false,
	_oListCardsLength: 0,
	_oListCardsCurrentCard: 0,
	_oListCardsNextCard: 0,


	onInit : function() {
	},

	onAfterRendering : function() {
		this._oListCardsLength = this.getView().byId('ListCardsId').getItems().length;
	},

	/**
	 * Navigates back to the menu
	 * 
	 */
	handleNavBackToMenu : function(evt) {
		this.nav.back("NavMenu");
	},

	/**
	 * Handles the user choice
	 * param {event} evt - The button press event
	 */
	handleChoiceBtnPressed : function(evt) {

		// get icon value from the pressed btn and data from icon model
		this._oChoice = evt.getSource().getProperty('icon');
		var oIconModel = this.getView().getModel('icon');
		var oUsersModel = this.getView().getModel('users');

		// determine data to change based on the choice of the user
		switch (this._oChoice) {
			case oIconModel.oData.Like :
				console.log("liked btn pressed");
				this._oNextCard = true;
		        break;
		    case oIconModel.oData.Dislike :
		    	console.log("disliked btn pressed");
		    	this._oNextCard = true;
		        break;
		    case oIconModel.oData.Superlike :
		    	console.log("superlike btn pressed");
		    	this._oNextCard = true;
		        break;
		    case oIconModel.oData.Rewind :
		    	console.log("rewind btn pressed");
		    	this._oNextCard = false;
		        break;
		}
		
		// go to the next card
		try {
			console.log("next card");

			// check for state of next card : next or previous
			if (this._oNextCard) {
				this._oListCardsNextCard = this._oListCardsCurrentCard + 1;
			} else {
				this._oListCardsNextCard = this._oListCardsCurrentCard - 1;
			}
			// change JSON Model
			oUsersModel.oData.users[this._oListCardsCurrentCard].visible = false;
			oUsersModel.oData.users[this._oListCardsNextCard].visible = true;

			// refresh the JSON Model 
			this.getView().getModel('users').refresh();

			// redefine CurrentCard as NextCard
			this._oListCardsCurrentCard = this._oListCardsNextCard;
		} catch(e) {
			console.log("no more cards");
			console.log(e);
		} 
	}



});