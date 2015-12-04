jQuery.sap.declare("ui.util.Formatter");

jQuery.sap.require("sap.ui.core.format.DateFormat");

ui.util.Formatter = {
	
	date : function (value) {
		if (value) {
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "EEEE, d MMMM"}); 
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
	},

	priceStatus : function (oBudget, oPrice) {
		if (oBudget) {
			// case when the price is above budget
			if (oPrice > oBudget + 5) {
				return "Error";
			} else if (oPrice <= oBudget + 3) {
				return "Success";
			} else {
				return "Warning";
			}
		} 
	},

	// enable login btn
	loginEnable : function(name, pwd) {
        return (name.trim() !== '') && (pwd.trim() !== '')
    },

    // returns number of lunchmeeters in the LunchMeet
    arrayLength : function(array) {
    	return array.length +"p";
    },

    // find author among the lunchmeeters
    author : function(oLunchmeeters) {
    	var res = "";
    	$.each(oLunchmeeters, function(property, element) {
    		var oStatus = element.status;
    		if (oStatus == "author") {
    			res = element.username;
    		} else {
    			// console.log("not the author, next element");
    		}
    	});
    	var oUserModel = new MeteorModel(
            "lunchmeeters",
            lunchmeeters.find({"username":res}),
            lunchmeeters        
        );
    	return "créé par "+ oUserModel.oData[0].fullname;
    },

    // set visible property of icons for budget of the restaurant
    setBudgetIcons : function (value) {
    	// sap.ui.getCore().byId("pages.lunchmeets.LunchmeetsDetail--idIconSmallBudget").setVisible(false);
    	// sap.ui.getCore().byId("pages.lunchmeets.LunchmeetsDetail--idIconMediumBudget").setVisible(false);
    	// sap.ui.getCore().byId("pages.lunchmeets.LunchmeetsDetail--idIconLargeBudget").setVisible(false);

    	// // var oBudget = this.getView().getModel().getProperty('budget');
    	// var oBudget2 = 8;
    	// if (value <= oBudget2) {sap.ui.getCore().byId("pages.lunchmeets.LunchmeetsDetail--idIconSmallBudget").setVisible(true);}
    	// else if (value > oBudget2 && value <= oBudget2 + 5) {
    	// 	sap.ui.getCore().byId("pages.lunchmeets.LunchmeetsDetail--idIconSmallBudget").setVisible(true);
    	// 	sap.ui.getCore().byId("pages.lunchmeets.LunchmeetsDetail--idIconMediumBudget").setVisible(true);
    	// } else {
    	// 	sap.ui.getCore().byId("pages.lunchmeets.LunchmeetsDetail--idIconSmallBudget").setVisible(true);
	    // 	sap.ui.getCore().byId("pages.lunchmeets.LunchmeetsDetail--idIconMediumBudget").setVisible(true);
	    // 	sap.ui.getCore().byId("pages.lunchmeets.LunchmeetsDetail--idIconLargeBudget").setVisible(true);
    	// }
    },

    formatMapUrl: function(sStreet, sZip, sCity, sCountry) {
        var res = "https://maps.googleapis.com/maps/api/staticmap?zoom=14.5&size=500x300&markers="
        + jQuery.sap.encodeURL(sStreet + ", " + sZip +  " " + sCity + ", " + sCountry);
        return res;
    },

    toGoogleMapsInNewTab : function(sStreet, sZip, sCity, sCountry) {
        return "https://www.google.com/maps/place/"
        + jQuery.sap.encodeURL(sStreet + ", " + sZip +  " " + sCity + ", " + sCountry);
    },

    address : function (sStreet, sZip, sCity, sCountry) {
        return sStreet + ", " + sCity;
    }
};