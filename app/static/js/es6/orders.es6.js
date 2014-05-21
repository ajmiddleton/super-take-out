/* global ajax */
/* jshint unused:false */
(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    $('#order').on('change', '.menu', getMenu);
    $('#order').on('change', '.dish', recalcTotal);
    $('#add').click(addRow);
    $('#order').on('click', '.deleteRow', deleteRow);
    $('form#order').on('change', 'input', recalcTotal);
    $('form#order').on('blur', 'input', recalcTotal);
  }

  function recalcTotal(){
    var dollarTotal = 0;
    var calorieTotal = 0;
    var items = $('.menu-item').toArray();
    items.forEach(item=>{
      var cost = $(item).find('.dish').find(':selected').attr('data-cost') * 1;
      var calories = $(item).find('.dish').find(':selected').attr('data-calories') * 1;
      var qty = $($(item).children()[0]).val();
      if(!isNaN(cost) && !isNaN(calories)){
        if(qty > 0){
          dollarTotal += cost * qty;
          calorieTotal += calories * qty;
        }
      }
    });
    $('#dollars').text(`$ ${dollarTotal.toFixed(2)}`);
    $('#calories').text(`Calories: ${calorieTotal}`);
  }

  function deleteRow(event){
    if($('.menu-item').length > 1){
      $(this).closest('.menu-item').remove();
    }
    recalcTotal();
    event.preventDefault();
  }

  function addRow(){
    $($('.menu-item')[0]).clone().prependTo('#order');
  }

  function getMenu(){
    var menu = $(this).val();
    ajax(`/dishes/${menu}`, 'get', null, res=>{
      $(this).next().empty().append(res);
      recalcTotal();
    });
  }
})();
