// Define the "people" collection
// people = new Mongo.Collection("people");


// define the "lunchmeeters" collection
lunchmeeters = new Mongo.Collection("lunchmeeters");

// Server-only code
if (Meteor.isServer){

    // Server startup code
    Meteor.startup(function() {
        // Prevent /demoapp/ templates/controllers from being cached in development
        // so that we can make changes and see them reflected in the browser immediately.
        // TODO Still need to employ something like UI5 cachebuster for deploying new versions
        // of app in production.
        if (process.env.NODE_ENV === "development"){
            WebApp.rawConnectHandlers.use('/ui/', function(req, res, next) {
                res.setHeader('cache-control', 'no-cache');
                next();
            });
        }



        // Seed our people collection with some starting data if it's empty
        // if (!people.find().count()){
        //     people.insert({
        //         name: "Jim",
        //         age: 36,
        //         city: "Melbourne"
        //     });
        //     people.insert({
        //         name: "Jill",
        //         age: 22,
        //         city: "Sydney"
        //     });
        //     people.insert({
        //         name: "Rodney",
        //         age: 54,
        //         city: "Wollongong"
        //     });
        // }


        // seed our lunchmeeters collection with some starting data if it's empty
        
        //  lunchmeeters.remove("FJwsNhKuB3ZsfFBEf");
        // lunchmeeters.remove({username:"bchen"});
        // lunchmeeters.remove({username:"yzhou"});
        // lunchmeeters.remove({username:"lbarlet"});
        // supprime la collection
        lunchmeeters.remove("bchen");
        if (!lunchmeeters.find().count()) {
            lunchmeeters.insert({
                username: "bchen",
                password: "bchen*",
                fullname: "Boris Chen",
                shortname: "Boris",
                picture: "ui/img/pics/bchen.png",
                budget: 10                
            });
            lunchmeeters.insert({
                username: "yzhou",
                password: "yzhou*",
                fullname: "Yang Zhou",
                shortname: "Yang",
                picture: "ui/img/pics/yzhou.png",
                budget: 10                
            });
            lunchmeeters.insert({
                username: "lbarlet",
                password: "lbarlet*",
                fullname: "Lionel Barlet",
                shortname: "Lionel",
                picture: "ui/img/pics/lbarlet.png",
                budget: 10                
            });
        }
    });

    // Publish the people collection
    // Meteor.publish("people", function () {
    //   return people.find();
    // });

    // publish the lunchmeeters collection
    Meteor.publish("lunchmeeters", function () {
        return lunchmeeters.find();
    });
}
