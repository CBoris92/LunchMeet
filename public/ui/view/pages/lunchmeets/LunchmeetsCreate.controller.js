jQuery.sap.require("ui.util.Formatter");

sap.ui.controller("ui.view.pages.lunchmeets.LunchmeetsCreate", {

	oFormatYyyymmdd: null,
	oFormatEeeemmdyyy: null,

	onInit: function() {
		this.oFormatYyyymmdd = sap.ui.core.format.DateFormat.getInstance({pattern: "yyyy-MM-dd"});
		this.oFormatEeeemmdyyy =  sap.ui.core.format.DateFormat.getInstance({pattern: "EEEE, d MMMM yyyy"});
	},

	/**
	 * Navigates back to the worklist
	 * 
	 */
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


	/**
	 * Whenever a selection is made on the calendar, we update the display text
	 *
	 */
	handleCalendarSelect: function(oEvent) {
		var oCalendar = oEvent.oSource;
		this._updateText(oCalendar);
	},

	/**
	 * Update the display text based on Calendar selection
	 *
	 */
	_updateText: function(oCalendar) {
		var oText = this.getView().byId("selectedDate");
		var aSelectedDates = oCalendar.getSelectedDates();
		var oDate;
		if (aSelectedDates.length > 0 ) {
			oDate = aSelectedDates[0].getStartDate();
			oText.setText(this.oFormatEeeemmdyyy.format(oDate));
		} else {
			oText.setValue("No Date Selected");
		}
	}



});