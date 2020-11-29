const User = require('../models/user');
const Order = require('../models/order');
const mongoose = require('mongoose');


exports.seedUsersAndOrders = async (req, res, next) => {
    // let user = new User({name: "IJAZ"});
    users = [{
        name: "Rahul"
    }, {
        name: "Ramesh"
    }, {
        name: "Ankita"
    }];
    await User.deleteMany({})
    await Order.deleteMany({})

    User.insertMany(users, function(err, docs) {
        if (err) {
            res.send("Oops something went wrong while inserting users", err)
        } else {
            console.log("Multiple documents inserted to Collection", docs);

            let orders = []
            for (i = 0; i < docs.length; i++) {
                for (j = 0; j < 2; j++) {
                    orders.push({
                        subtotal: Math.floor((Math.random() * 100) + 1),
                        userid: docs[i]
                    })
                }

            }
           
            Order.insertMany(orders, function(err, docs) {
                if (err) {
                    res.send("Error inserting order", err)
                } else {
                    res.send("OK")
                }
            })
        }
    });
    // user.save();
    // console.log(user);
}

exports.getOrders = async (req, res, next) => {

    const orders = await Order.aggregate([{
            $group: {

                _id: '$userid',
                averageBillValue: {
                    $avg: "$subtotal"
                },
                noOfOrders: {
                    $sum: 1
                }
            },

        },
        {
            $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "user_details"
            }
        }
    ])
    console.log("> All Orders\n", orders);
    let response = [];

    orders.forEach((function(order) {
        response.push({
            userid: order._id,
            name: order.user_details[0].name,
            noOfOrders: order.noOfOrders,
            averageBillValue: order.averageBillValue
        });
    }));

    res.send(response);
}


exports.updateNumberOfOrders = async (req, res, next) => {


    try {

        const orders = await Order.aggregate([{
            $group: {

                _id: '$userid',
                noOfOrders: {
                    $sum: 1
                }
            },

        }, ]);


        totalCountTobeUpdated = 0;

        for (j = 0; j < orders.length; j++) {

            console.log(orders[j].noOfOrders)
            let userid = orders[j]._id
            let user = await User.findById(userid);
            user.no_orders = orders[j].noOfOrders;
            user.save();
            

            // console.log(userUpdate.noOfOrders
        }

      
        res.send({success : true,message: "Successfully updated"});
      
        
    } catch (err) {
        console.log(err)
        res.send("OOPS SOMETHING WENT WRONG");
    }



    // res.send(response);
}