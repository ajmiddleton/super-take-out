/* jshint unused:false */
'use strict';

var traceur = require('traceur');
var Dish = traceur.require(__dirname + '/../models/dish.js');
var User = traceur.require(__dirname + '/../models/user.js');
var Order = traceur.require(__dirname + '/../models/order.js');
var _ = require('lodash');

exports.new = (req, res)=>{
  Dish.menu(menuItems=>{
    User.findById(req.session.userId, user=>{
      res.render('orders/new', {title: 'New Order', menuItems:menuItems, user:user});
    });
  });
};

exports.create = (req, res)=>{
  var dishObjs = [];
  for(var i=0; i < req.body.qty.length; i++){
    var tempObj = {};
    tempObj.qty = req.body.qty[i];
    tempObj.dishId = req.body.dishId[i];
    dishObjs.push(tempObj);
  }

  var order = new Order(req.session.userId, dishObjs);
  order.totalCost((newOrder)=>{
    newOrder.totalCalories((newOrder2)=>{
      order = newOrder2;
      order.save(()=>res.redirect('/orders'));
    });
  });
};
