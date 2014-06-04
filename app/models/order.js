/*jshint unused:false */

var orders = global.nss.db.collection('orders');
var traceur = require('traceur');
var Dish = traceur.require(__dirname + '/../models/dish.js');
var async = require('async');

class Order{
  constructor(userId, dishObjs){
    this.userId = userId;
    this.meal = dishObjs;
    this.date = new Date();
  }

  totalCost(callback){
    var dishIds = this.meal.map(dish=>dish.dishId);
    var order = this;
    var tasks = [];
    tasks.push((fn)=>{
      Dish.findByArray(dishIds, dishes=>{
        var total = 0;
        dishes.forEach((dish, i)=>{
          total += dish.cost * order.meal[i].qty;
        });
        fn(null, total);
      });
    });
    async.parallel(tasks, (e, results)=>{
      order.cost = results[0];
      callback(order);
    });
  }

  totalCalories(callback){
    var dishIds = this.meal.map(dish=>dish.dishId);
    var order = this;
    var tasks = [];
    tasks.push((fn)=>{
      Dish.findByArray(dishIds, dishes=>{
        var total = 0;
        dishes.forEach((dish, i)=>{
          total += dish.calories * order.meal[i].qty;
        });
        fn(null, total);
      });
    });
    async.parallel(tasks, (e, results)=>{
      order.calories = results[0];
      callback(order);
    });
  }

  save(fn){
    orders.save(this, ()=>fn());
  }
}

module.exports = Order;
