sap.ui.controller("ui.view.pages.lunchmeets.Lunchmeets", {

	onInit : function () {},
	
	/**
	 * Navigates to another page
	 * @param {string} pageId The id of the next page
	 * @param {sap.ui.model.Context} context The data context to be applied to the next page (optional)
	 */
	to : function (pageId, context, isMaster, oTransitionName) {

		var app = this.getView().app;
		var page = null;
		// load page on demand
		if(!isMaster) {
			isMaster = ("pages.lunchmeets.LunchmeetsMaster" === pageId);
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
		app.to(pageId, oTransitionName);
		
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
		this.getView().app.backToPage("pages.lunchmeets."+this.getView().app.getPreviousPage().getId());
		// this.getView().app.backToPage(pageId);
	}
});