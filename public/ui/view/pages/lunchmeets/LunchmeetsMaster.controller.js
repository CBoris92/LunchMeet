jQuery.sap.require("ui.util.Formatter");
jQuery.sap.require("sap.ui.core.routing.History");

sap.ui.controller("ui.view.pages.lunchmeets.LunchmeetsMaster", {

	onInit: function() {
		// for dev purposes, to delete after features correction
		var oUserModel = new MeteorModel(
            "lunchmeeters",
            lunchmeeters.find({"username":"bchen"}),
            lunchmeeters        
        );
        this.getView().setModel(oUserModel);
        this.searchTimeout = null;


        


	},

	onAfterRendering : function () {
		this.handleStatusStyleClass();

		var myViewId = this.getView().getId()+ "--";
        $("#"+myViewId+"NewLunchmeetBtnId").click(function() {
        	console.log("Button clicked");
        	this.handleCreateLunchmeet();
        }.bind(this));
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
	},

	handleStatusStyleClass : function () {
		var aItems = this.getView().byId('LunchmeetsList').getItems(); 

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

	handleListSelect : function (evt) {
		var context = (evt.getParameter("listItem").getBindingContext() || evt.getSource().getBindingContext());

		if (this.getView().getModel('device').oData.isPhone) {
			// navigate
			this.getOwnerComponent().getRouter().navTo("lunchmeetsDetail", null, null, "fade");
		} else {this.nav.to("pages.lunchmeets.LunchmeetsDetail", context);}
		// nav to detail page

		// send the object data model through eventbus 
		sap.ui.getCore().getEventBus().publish("handleLunchMeetModel", "setModel", context);

		// deselect the item
		this.getView().byId('LunchmeetsList').setSelectedItem(evt.getParameter("listItem"), false);
	},

    handleSearch : function (evt) {
		var query = evt.getParameter("query");
		// create model filter
		var filters = [];
		if (query && query.length > 0) {
			var filter = new sap.ui.model.Filter("restaurant/name", sap.ui.model.FilterOperator.Contains, query);
			filters.push(filter);
		}
		
		// update list binding
		var list = this.getView().byId("LunchmeetsList");
		var binding = list.getBinding("items");
		binding.filter(filters);

		// handle status style class
		this.handleStatusStyleClass();
	},

	handleLiveChange : function (evt) {
		var query = evt.getParameter("newValue");

		if (this.searchTimeout !== null) {
	      clearTimeout(this.searchTimeout);
	    }
	    this.searchTimeout = setTimeout(function() { 
			// create model filter
			var filters = [];
			if (query && query.length > 0) {
				var filter = new sap.ui.model.Filter("restaurant/name", sap.ui.model.FilterOperator.Contains, query);
				filters.push(filter);
			}
			
			// update list binding
			var list = this.getView().byId("LunchmeetsList");
			var binding = list.getBinding("items");
			binding.filter(filters);

			// handle status style class
			this.handleStatusStyleClass();
		}.bind(this), 500);
	},

	handleCreateLunchmeet : function (evt) {
		// var oSource = evt.getSource();
		this.getOwnerComponent().getRouter().navTo("lunchmeetsCreate");
	}

});