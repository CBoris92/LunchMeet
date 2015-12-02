jQuery.sap.require("ui.util.Formatter");

sap.ui.controller("ui.view.letslunch2.LetsLunch2", {

	oFormatYyyymmdd: null,
	oFormatEeeemmdyyy: null,

	onInit: function() {
		this.oFormatYyyymmdd = sap.ui.core.format.DateFormat.getInstance({pattern: "yyyy-MM-dd"});
		this.oFormatEeeemmdyyy =  sap.ui.core.format.DateFormat.getInstance({pattern: "EEEE, d MMMM yyyy"});
	},

	/**
	 * Navigates back to the menu
	 * 
	 */
	handleNavBackToMenu : function(evt) {
		this.nav.back("NavMenu");
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