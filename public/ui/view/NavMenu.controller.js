sap.ui.controller("ui.view.NavMenu", {

	onInit : function () {
		sap.ui.getCore().getEventBus().subscribe('handleNavMenuListSelect', 'press',
			function (channel, event, data){
				this.handleNavMenuListSelect(data);
			}.bind(this)
		);
	},

	handleNavMenuListSelect : function (evt) {
		var selectedItem = evt.getParameter("listItem");
		var i18nModel = this.getView().getModel('i18n');
		switch(selectedItem.getProperty('title')) {
		    
	        case i18nModel.oData.DashboardTitle:
		        this.nav.to("dashboard.Dashboard");
		        break;
		    case i18nModel.oData.LetsLunchTitle:
		        this.nav.to("letslunch.LetsLunch");
		        break;  
		    case i18nModel.oData.LunchMeetsTitle:
		        this.nav.to("lunchmeets.LunchMeets");
		        break;
		}
		// deselect the previous selected item
		this.getView().byId('NavMenuList').setSelectedItem(selectedItem, false);
	},

	handleSplitAppMode : function (evt) {
		// set the expanded mode
		if (!this.getView().getModel('device').getData().isPhone) {
			var oSplitApp = sap.ui.getCore().byId('splitApp');
			oSplitApp.setMode((oSplitApp.getMode() == sap.m.SplitAppMode.ShowHideMode) ? sap.m.SplitAppMode.HideMode : sap.m.SplitAppMode.ShowHideMode);
		}
	}

});