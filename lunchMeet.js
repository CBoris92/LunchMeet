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
        lunchmeeters.remove({username:"bchen"});
        // lunchmeeters.remove({username:"yzhou"});
        // lunchmeeters.remove({username:"lbarlet"});
        // supprime la collection
        if (!lunchmeeters.find().count()) {
            lunchmeeters.insert(
                {
                    "username": "bchen",
                    "password": "bchen*",
                    "fullname": "Boris Chen",
                    "lastname": "Boris",
                    "lunchmeets": [
                        {
                            "oId": "bchen1",
                            "createdAt": "2015-12-01",
                            "date": "2015-12-02",
                            "status": "Envoyé",
                            "lunchmeeters": [
                                {
                                    "username": "bchen",
                                    "status": "author"
                                },
                                {
                                    "username": "yzhou",
                                    "status": "approver"
                                }
                            ],
                            "restaurant" : {
                                "name": "Our kebab gourmet",
                                "address": "20 rue du Paradis, Paris 10e",
                                "picture": "ui/img/restaurants/our.png",
                                "averageRating": 2,
                                "averagePrice": 11
                            }
                        },
                        {
                            "oId": "bchen2",
                            "createdAt": "2015-12-01",
                            "date": "2015-11-30",
                            "status": "Accepté",
                            "lunchmeeters": [
                                {
                                    "username": "bchen",
                                    "status": "author"
                                },
                                {
                                    "username": "yzhou",
                                    "status": "approver"
                                }
                            ],
                            "restaurant" : {
                                "name": "Our kebab gourmet",
                                "address": "20 rue du Paradis, Paris 10e",
                                "picture": "ui/img/restaurants/our.png",
                                "averageRating": 2,
                                "averagePrice": 11
                            }
                        },
                        {
                            "oId": "bchen3",
                            "createdAt": "2015-12-01",
                            "date": "2015-12-04",
                            "status": "Nope",
                            "lunchmeeters": [
                                {
                                    "username": "bchen",
                                    "status": "author"
                                },
                                {
                                    "username": "yzhou",
                                    "status": "approver"
                                }
                            ],
                            "restaurant" : {
                                "name": "Our kebab gourmet",
                                "address": "20 rue du Paradis, Paris 10e",
                                "picture": "ui/img/restaurants/our.png",
                                "averageRating": 2,
                                "averagePrice": 11
                            }
                        },
                        {
                            "oId": "bchen4",
                            "createdAt": "2015-12-01",
                            "date": "2015-11-29",
                            "status": "Nope",
                            "lunchmeeters": [
                                {
                                    "username": "bchen",
                                    "status": "author"
                                },
                                {
                                    "username": "yzhou",
                                    "status": "approver"
                                }
                            ],
                            "restaurant" : {
                                "name": "Our kebab gourmet",
                                "address": "20 rue du Paradis, Paris 10e",
                                "picture": "ui/img/restaurants/our.png",
                                "averageRating": 2,
                                "averagePrice": 11
                            }
                        }
                    ]
                }             
            );
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
