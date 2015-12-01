jQuery.sap.require("ui.util.Formatter");

sap.ui.controller("ui.view.lunchmeets.LunchMeets", {

	onInit : function () {
		// sap.ui.getCore().getEventBus().subscribe('handleNavBtnPressed', 'press',
		// 	function (channel, event, data){
		// 		this.handleNavBtnPressed(data);
		// 	}.bind(this)
		// );
	},

	handleNavBackToMenu : function (evt) {
		this.nav.back("NavMenu");
	},
	
	handleListSelect : function (evt) {
		var context = (evt.getParameter("listItem").getBindingContext('lunchmeets') || evt.getSource().getBindingContext('lunchmeets'));
		this.nav.to("lunchmeets.LunchMeet");

		// send the object data model through eventbus 
		sap.ui.getCore().getEventBus().publish("handleLunchMeetModel", "setModel", context);

		this.getView().byId('LunchMeetsList').setSelectedItem(evt.getParameter("listItem"), false);
	}
	// handleSearch : function (evt) {
		
	// 	// create model filter
	// 	var filters = [];
	// 	var query = evt.getParameter("query");
	// 	if (query && query.length > 0) {
	// 		var filter = new sap.ui.model.Filter("SoId", sap.ui.model.FilterOperator.Contains, query);
	// 		filters.push(filter);
	// 	}
		
	// 	// update list binding
	// 	var list = this.getView().byId("list");
	// 	var binding = list.getBinding("items");
	// 	binding.filter(filters);
	// }
});