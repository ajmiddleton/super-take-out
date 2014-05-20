/* jshint unused:false */
'use strict';

var traceur = require('traceur');
var Dish = traceur.require(__dirname + '/../models/dish.js');
var User = traceur.require(__dirname + '/../models/user.js');
var _ = require('lodash');

exports.new = (req, res)=>{
  Dish.menu(menuItems=>{
    User.findById(req.session.userId, user=>{
      res.render('orders/new', {title: 'New Order', menuItems:menuItems, user:user});
    });
  });
};
