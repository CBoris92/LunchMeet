sap.ui.controller("ui.view.App", {

	onInit : function () {
		sap.ui.getCore().getEventBus().subscribe('nav', 'menu', 
			function (channel, event, data){
				if (lunchmeeters.find({username: data.user}).count()) {
					this.to("NavMenu", this, data.isMaster); // navigate to Filter view
				}
			}.bind(this)
		);
	},
	
	/**
	 * Navigates to another page
	 * @param {string} pageId The id of the next page
	 * @param {sap.ui.model.Context} context The data context to be applied to the next page (optional)
	 */
	to : function (pageId, context, isMaster, oUsername) {

		var app = this.getView().app;
		var page = null;
		// load page on demand
		if(!isMaster) {
			isMaster = ("Master" === pageId);
		}
		
		if (app.getPage(pageId, isMaster) === null) {
			page = sap.ui.view({
				id : pageId,
				viewName : "ui.view." + pageId,
				type : "XML"
			});
			page.getController().nav = this;
			app.addPage(page, isMaster);
			jQuery.sap.log.info("app controller > loaded page: " + pageId);
		}
		
		// show the page
		app.to(pageId);
		
		// set data context on the page
		if (context) {
			page = pageId == 'NavMenu' ? app.getMasterPage('NavMenu') : app.getPage(pageId);			
			page.setBindingContext(context);
		}
	},
	
	/**
	 * Navigates back to a previous page
	 * @param {string} pageId The id of the next page
	 */
	back : function (pageId) {
		this.getView().app.backToPage(pageId);
	}
});