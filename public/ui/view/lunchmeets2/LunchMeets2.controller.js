jQuery.sap.require("ui.util.Formatter");

sap.ui.controller("ui.view.lunchmeets2.LunchMeets2", {

	onInit : function () {
		// for dev purposes, to delete after features correction
		var oUserModel = new MeteorModel(
            "lunchmeeters",
            lunchmeeters.find({"username":"bchen"}),
            lunchmeeters        
        );
        this.getView().setModel(oUserModel);
	},

	onAfterRendering : function () {
		this.handleStatusStyleClass();
	},

	handleStatusStyleClass : function () {
		var aItems = this.getView().byId('LunchMeetsList').getItems(); 

		for (var i=0; i<aItems.length; i++) {
			var aProperty = aItems[i].getBindingContext().getProperty("status");
       		var oStatus = aItems[i].getFirstStatus();
			oStatus.removeStyleClass('StatusInProgress');
			oStatus.removeStyleClass('StatusApproved');
			oStatus.removeStyleClass('StatusRejected');
	    	switch (aProperty) {
	    		case this.getView().getModel('i18n').getProperty('/Sent') :
	    			oStatus.addStyleClass('StatusInProgress');
	    			break;
	    		case this.getView().getModel('i18n').getProperty('/Accept') :
	    			oStatus.addStyleClass('StatusApproved');
	    			break;
	    		case this.getView().getModel('i18n').getProperty('/Decline') : 
	    			oStatus.addStyleClass('StatusRejected');
	    			break;
	    	}
    	}
	},

	handleNavBackToMenu : function (evt) {
		this.nav.back("NavMenu");
	},
	
	handleListSelect : function (evt) {
		var context = (evt.getParameter("listItem").getBindingContext() || evt.getSource().getBindingContext());
		// nav to detail page
		this.nav.to("lunchmeets2.LunchMeet2", context);
		// send the object data model through eventbus 
		sap.ui.getCore().getEventBus().publish("handleLunchMeetModel", "setModel", context);
		this.getView().byId('LunchMeetsList').setSelectedItem(evt.getParameter("listItem"), false);
	},

	handleSearch : function (evt) {
		
		// create model filter
		var filters = [];
		var query = evt.getParameter("query");
		if (query && query.length > 0) {
			var filter = new sap.ui.model.Filter("restaurant/name", sap.ui.model.FilterOperator.Contains, query);
			filters.push(filter);
		}
		
		// update list binding
		var list = this.getView().byId("LunchMeetsList");
		var binding = list.getBinding("items");
		binding.filter(filters);

		// handle status style class
		this.handleStatusStyleClass();
	}
});