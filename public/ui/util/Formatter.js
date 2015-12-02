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
    	sap.ui.getCore().byId("lunchmeets2.LunchMeet2--idIconSmallBudget").setVisible(false);
    	sap.ui.getCore().byId("lunchmeets2.LunchMeet2--idIconMediumBudget").setVisible(false);
    	sap.ui.getCore().byId("lunchmeets2.LunchMeet2--idIconLargeBudget").setVisible(false);

    	// var oBudget = this.getView().getModel().getProperty('budget');
    	var oBudget2 = 8;
    	if (value <= oBudget2) {sap.ui.getCore().byId("lunchmeets2.LunchMeet2--idIconSmallBudget").setVisible(true);}
    	else if (value > oBudget2 && value <= oBudget2 + 5) {
    		sap.ui.getCore().byId("lunchmeets2.LunchMeet2--idIconSmallBudget").setVisible(true);
    		sap.ui.getCore().byId("lunchmeets2.LunchMeet2--idIconMediumBudget").setVisible(true);
    	} else {
    		sap.ui.getCore().byId("lunchmeets2.LunchMeet2--idIconSmallBudget").setVisible(true);
	    	sap.ui.getCore().byId("lunchmeets2.LunchMeet2--idIconMediumBudget").setVisible(true);
	    	sap.ui.getCore().byId("lunchmeets2.LunchMeet2--idIconLargeBudget").setVisible(true);
    	}
    }
};