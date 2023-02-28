// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  try to take over the world!
// @author       You
// @match        https://wizardofodds.com/games/blackjack/hand-calculator/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wizardofodds.com
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  // Your code here...
  //add 10 text boxes
  var i;
  // add initial values for the text boxes
  var initialValues = [0.68822641267019, 0.8370321235178, 0.96723712050945, 1.3020499699166, 0.85563283737375, 0.50221927411068, 0, -0.31621213555117, -0.93003569279755, -1.1160428313571];
  for (i = 0; i < 10; i++) {
    //document.querySelector("#rules > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody")
    var x = document.createElement("INPUT");
    x.setAttribute("type", "text");
    x.setAttribute("value", initialValues[i]);
    x.setAttribute("id", "card" + i);
    document.querySelector("#rules > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody").appendChild(x);
    //ugly but works
  }
  //add a text box for the current balance
  var a = document.createElement("INPUT");
  a.setAttribute("type", "text");
  a.setAttribute("value", "0");
  a.setAttribute("id", "balance");
  document.querySelector("#rules > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody").appendChild(a);
  //add a calculate button and a text box to display the result
  var y = document.createElement("INPUT");
  y.setAttribute("type", "button");
  y.setAttribute("value", "Calculate");
  y.setAttribute("id", "calculate");
  y.setAttribute("onclick", "calculate()");
  document.querySelector("#rules > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody").appendChild(y);
  var z = document.createElement("INPUT");
  z.setAttribute("type", "text");
  z.setAttribute("value", "0");
  z.setAttribute("id", "result");
  document.querySelector("#rules > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody").appendChild(z);
  //add another text box to display the total number of cards in the deck
  var w = document.createElement("INPUT");
  w.setAttribute("type", "text");
  w.setAttribute("value", "0");
  w.setAttribute("id", "totalCards");
  document.querySelector("#rules > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody").appendChild(w);
  //add a third text box to calculate the betting size
  var v = document.createElement("INPUT");
  v.setAttribute("type", "text");
  v.setAttribute("value", "0");
  v.setAttribute("id", "bettingSize");
  document.querySelector("#rules > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody").appendChild(v);
  //add a function to calculate the result
  function calculate(){
    //get the exact deck composition (from the text boxes)
    //document.querySelector("#qty2"), document.querySelector("#qty3"), document.querySelector("#qty4"), etc. to qty9
    var deckComposition = [];
    //get total number of cards in the deck
    var totalCards = 0;
    //i already declared
    for (i = 2; i < 10; i++) {
      deckComposition.push(document.querySelector("#qty" + i).value);
      totalCards += Number(document.querySelector("#qty" + i).value);
    }
    //for the 10s use #qtyT
    totalCards += Number(document.querySelector("#qtyT").value);
    deckComposition.push(document.querySelector("#qtyT").value);
    //for the aces use #qtyA
    totalCards += Number(document.querySelector("#qtyA").value);
    deckComposition.push(document.querySelector("#qtyA").value);

    //get the card values (from the added text boxes)
    //document.querySelector("#card0"), document.querySelector("#card1"), etc. to #card9
    var cardValues = [];
    //i already declared
    for (i = 0; i < 10; i++) {
      cardValues.push(document.querySelector("#card" + i).value);
    }
    //calculate the true count
    var trueCount = 0;
    //i already declared
    for (i = 0; i < 10; i++) {
      //doesn't scale but should work
      if(i != 8) trueCount += cardValues[i] * (8-deckComposition[i]);
      else trueCount += cardValues[i] * (32-deckComposition[i]);
    }
    trueCount = trueCount / Math.ceil(totalCards/52);
    //display the result
    document.querySelector("#result").value = trueCount;
    //display the total number of cards in the deck
    document.querySelector("#totalCards").value = totalCards;
    //calculate the approx house edge
    var houseEdge = trueCount * 0.005 - 0.005;
    //calculate the betting size
    var bettingSize = document.querySelector("#balance").value * houseEdge;
    //display the betting size
    document.querySelector("#bettingSize").value = Math.max(100,bettingSize);
  }
  //append the function to the calculate button
  document.querySelector("#calculate").addEventListener("click", calculate);
})();