jQuery.sap.declare("ui.util.Formatter");

jQuery.sap.require("sap.ui.core.format.DateFormat");

ui.util.Formatter = {
	
	date : function (value) {
		if (value) {
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "dd.MM.yyyy"}); 
			return oDateFormat.format(new Date(value));
		} else {
			return value;
		}
	},

	comment : function (value) {
		if (value) {
			return "\""+value+"\"";
		} else {
			return value;
		}
	}	
};