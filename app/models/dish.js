/* jshint unused:false */
'use strict';

var dishes = global.nss.db.collection('dishes');
var Mongo = require('mongodb');
var _ = require('lodash');

class Dish{
  static findByArray(idArray, fn){
    idArray = idArray.map(id=>Mongo.ObjectID(id));
    dishes.find({_id: {$in:idArray}}).toArray((e, records)=>{
      fn(records);
    });
  }

  static findAll(fn){
    dishes.find().toArray((e, records)=>{
      fn(records);
    });
  }

  static findByMenu(menu, fn){
    dishes.find({menu:menu}).toArray((e, records)=>{
      fn(records);
    });
  }

  static menu(fn){
    Dish.findAll(dishes=>{
      var menus = _.uniq(dishes.map(d=>d.menu));
      fn(menus);
    });
  }
}

module.exports = Dish;
