jQuery.sap.declare("ui.Component");

sap.ui.core.UIComponent.extend("ui.Component", {

	createContent : function() {

		// create root view
		var oView = sap.ui.view({
			id : "app",
			viewName : "ui.view.App",
			type : "JS",
			viewData : { component : this }
		});

//		// Using OData model to connect against a real service
//		var url = "/proxy/http/<server>:<port>/sap/opu/odata/sap/ZGWSAMPLE_SRV/";
//		var oModel = new sap.ui.model.odata.ODataModel(url, true, "<user>", "<password>");
//		oView.setModel(oModel);

		// set icons library model
		var iconModel = new sap.ui.model.json.JSONModel({
			"Dashboard" : "sap-icon://business-by-design",
			"LetsLunch" : "sap-icon://meal",
			"LunchMeets" : "sap-icon://home",
			"Preferences" : "sap-icon://favorite-list",
			"Menu": "sap-icon://menu2",
			"Like": "ui/img/others/like_button2.png",
			"Dislike": "ui/img/others/dislike_button2.png",
			"Rewind": "ui/img/others/rewind_button1.png",
			"Superlike": "ui/img/others/superlike_button1.png",
			"Favorites": "sap-icon://favorite"
		});
		iconModel.setDefaultBindingMode("OneWay");
		oView.setModel(iconModel, "icon");

		// set i18n model
		var i18nModel = new sap.ui.model.json.JSONModel({
			"LunchMeetsTitle":"Lunches & Meets",
			"LunchMeetTitle":"Lunch & Meet",

			"DashboardTitle":"Dashboard",
			"LetsLunchTitle":"Let's Lunch !",
			"PreferencesTitle":"Preferences",
			"PreferenceTitle":"Preference",

			"TypeCuisine":"Cuisine",
			"TypeRestauration":"Type de Restauration",
			"TempsPrefere":"Temps préféré",

			"NavMenuTitle":"Navigation",
			"ShowHideMenu":"Show/Hide",

			"Accept":"LunchMeetMe!",
			"Decline":"Nope",

			"MessagePageHeader":"Bienvenue à LunchMeet",
			"MessagePageDescription":"Générateur de rencontres à l'heure du déjeuner.",
			"MessagePageText":"LunchMeet",

			"RestaurantAddress":"Adresse",
			"RestaurantPrice":"Prix",
			"AveragePrice":"Prix moyen",
			"AverageRating":"Note moyenne",

			"Infos":"Infos",
			"Users":"Participants",

			"NoImageFound":"Image introuvable",
			"NoDataFound":"Ah tiens, il manque des données ici !"
		});
		i18nModel.setDefaultBindingMode("OneWay");
		oView.setModel(i18nModel, "i18n");

		// set users model
		var usersModel = new sap.ui.model.json.JSONModel("ui/model/users.json");
		usersModel.setDefaultBindingMode("OneWay");
		oView.setModel(usersModel, "users");

		// set lunchmeets model
		var lunchmeetsModel = new sap.ui.model.json.JSONModel("ui/model/lunchmeets.json");
		lunchmeetsModel.setDefaultBindingMode("TwoWay");
		oView.setModel(lunchmeetsModel, "lunchmeets");
		sap.ui.getCore().setModel(lunchmeetsModel, "lunchmeets");

		// set device model
		var deviceModel = new sap.ui.model.json.JSONModel({
			isPhone : jQuery.device.is.phone,
			listMode : (jQuery.device.is.phone) ? "SingleSelectMaster" : "SingleSelectMaster",
			listItemType : (jQuery.device.is.phone) ? "Active" : "Inactive"
		});
		deviceModel.setDefaultBindingMode("OneWay");
		oView.setModel(deviceModel, "device");

		// done
		return oView;
	}
});
