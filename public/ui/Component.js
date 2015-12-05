jQuery.sap.declare("ui.Component");
jQuery.sap.require("meteor-ui5.MeteorModel");

sap.ui.core.UIComponent.extend("ui.Component", {

	metadata: {
		"rootView": "ui.view.App",
		"routing": {
			"config": {
				"routerClass": "sap.m.routing.Router",
				"viewPath": "ui.view",
				"viewType": "XML",
				"controlId": "appRoot",
				"controlAggregation": "pages",

				"transition": "slide"

			},
			"routes": [
				{
					"name": "menu",
					// empty hash - normally the start page
					"pattern": "",
					"target": "Menu"
				},				
				{
					"name": "lunchmeets",
					"pattern": "lunchmeets",
					"target": "Lunchmeets"
				},
				{
					"name": "lunchmeetsDetail",
					"pattern": "lunchmeets/lunchmeet",
					"target": "LunchmeetsDetail"
				},
				{
					"name": "lunchmeetsCreate",
					"pattern": "lunchmeets/create",
					"target": "LunchmeetsCreate"
				},
				{
					"name": "dashboard",
					"pattern": "dashboard",
					"target": "Dashboard"
				},
				{
					"name": "notFound",
					"pattern": "notFound",
					"target": "NotFound"
				}
			],
			"targets": {
				"Menu": {
					"viewName": "pages.Menu"
				},
				"Lunchmeets": {
					"viewName": "pages.lunchmeets.Lunchmeets",
					"viewType": "JS"
				},
				"LunchmeetsDetail": {
					"viewName": "pages.lunchmeets.LunchmeetsDetail"
				},
				"LunchmeetsCreate": {
					"viewName": "pages.lunchmeets.LunchmeetsCreate"
				},
				"Dashboard": {
					"viewName": "pages.dashboard.Dashboard"
				},
				"NotFound": {
					"viewName": "pages.fragments.NotFound",
					"transition": "show"
				}
			}
		}
	},

	init : function () {
		sap.ui.core.UIComponent.prototype.init.apply(this, arguments)

		// Parse the current url and display the targets of the route that matches the hash
		this.getRouter().initialize();
	},

	createContent : function() {

		var oView = sap.ui.xmlview(this.getMetadata().getRootView().viewName);
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
			"Favorites": "sap-icon://favorite",
			"SubmitReview": "sap-icon://create",
			"Edit": "sap-icon://edit",
			"PreferenceLevel2": "sap-icon://drop-down-list"
		});
		iconModel.setDefaultBindingMode("OneWay");
		oView.setModel(iconModel, "icon");

		// set i18n model
		var i18nModel = new sap.ui.model.json.JSONModel({
			"LunchmeetsTitle":"Lunches & Meets",
			"LunchMeetTitle":"Lunch & Meet",

			"DashboardTitle":"Dashboard",
			"LetsLunchTitle":"Let's Lunch !",
			"PreferencesTitle":"Preferences",

			"TypeCuisine":"Cuisine",
			"TypeRestauration":"Type de Restauration",
			"TempsPrefere":"Temps préféré",
			"Budget":"Budget",

			"NavMenuTitle":"Navigation",
			"ShowHideMenu":"Show/Hide",

			"Accept":"Accepté",
			"Decline":"Nope",
			"Sent":"Envoyé",

			"MessagePageHeader":"Bienvenue à LunchMeet",
			"MessagePageDescription":"Générateur de rencontres à l'heure du déjeuner.",
			"MessagePageText":"LunchMeet",

			"RestaurantAddress":"Adresse",
			"RestaurantPrice":"Payé",
			"AveragePrice":"Prix moyen",
			"AverageRating":"Note moyenne",

			"Infos":"Infos",
			"Users":"Participants",

			"NoImageFound":"Image introuvable",
			"NoDataFound":"Ah tiens, il manque des données ici !",

			"Edit": "Edit",

			"LoginTitle": "Lunchmeeter, are you ready ?",

		});
		i18nModel.setDefaultBindingMode("OneWay");
		oView.setModel(i18nModel, "i18n");
		
		// build and set Lunchmeeters Meteor model from meteor subscription and cursor
		var sSubscription = "lunchmeeters";
        var oCursor = lunchmeeters.find();
        var oLunchMeeters = new MeteorModel(
                    sSubscription,
                    oCursor,
                    lunchmeeters          // Meteor collection required if we want two-way binding
        );
        oView.setModel(oLunchMeeters, "lunchmeeters");

		// set device model
		var deviceModel = new sap.ui.model.json.JSONModel({
			isPhone : jQuery.device.is.phone,
			listMode : (jQuery.device.is.phone) ? "SingleSelectMaster" : "SingleSelectMaster",
			listItemType : (jQuery.device.is.phone) ? "Active" : "Inactive"
		});
		deviceModel.setDefaultBindingMode("OneWay");
		oView.setModel(deviceModel, "device");
		sap.ui.getCore().setModel(deviceModel, "device");

		return oView;
	}

});
