---
title: Comparing D&D Weapon Masteries by Rolling Dice with WebPPL
datePublished: 2024-11-17
tags: [games, math]
summary: TODO
---

```js
// var geometric = function() {
//   return flip(.5) ? 0 : geometric() + 1;
// }

// var conditionedGeometric = function() {
//   var x = geometric();
//   factor(x > 2 ? 0 : -Infinity);
//   return x;
// }

// parameters
var AC = 14; // enemy armor class

var PROFICIENCY_BONUS = 3;       // scales with character level

var STR_MODIFIER = 4;
var ATTACK_ABILITY_MODIFIER = STR_MODIFIER; // usually STR, or DEX for finesse

// dice

var die = function(n) {
  return randomInteger(n) + 1;
}

var d4  = function() { return die(4); }
var d6  = function() { return die(6); }
var d8  = function() { return die(8); }
var d10 = function() { return die(10); }
var d12 = function() { return die(12); }
var d20 = function() { return die(20); }

// D&D mechanics

var attackRoll = function() {
  return d20() + PROFICIENCY_BONUS + ATTACK_ABILITY_MODIFIER;
}

var attackHits = function(armorClass) {
  return (attackRoll() >= armorClass);
}

var advantage = function(roll) {
  var x = roll();
  var y = roll();
  return Math.max(x, y);
}

let grazeDamage = function() {
  return STR_MODIFIER;
}

let cleaveDamage = function() {
  return d10();
}

let polearmDamage = function() {
  return d10() + STR_MODIFIER;
}

let poleStrikeDamage = function() {
  return d4() + STR_MODIFIER;
}

// compare Cleave vs Graze

var simulateCleave = function() {
  let cleave     = attackHits(AC) ? cleaveDamage()           : 0;
  let attack1    = attackHits(AC) ? polearmDamage() + cleave : 0;
  let attack2    = attackHits(AC) ? polearmDamage()          : 0;
  let poleStrike = attackHits(AC) ? poleStrikeDamage()       : 0; 
  
  return attack1 + attack2 + poleStrike;
}

var simulateGraze = function() {
  let attack1    = attackHits(AC) ? polearmDamage() : grazeDamage();
  let attack2    = attackHits(AC) ? polearmDamage() : grazeDamage();
  
  // assuming pole strike benefits from the graze weapon mastery
  let poleStrike = attackHits(AC) ? poleStrikeDamage() : grazeDamage(); 
  
  return attack1 + attack2 + poleStrike;
}

// simulation

var result = function() {
  return simulateCleave();
}

// var distA = Infer(
// //   {method: 'enumerate', maxExecutions: Infinity},
//   { method: "rejection", samples: 1000000 },
//   simulateCleave);

// var distB = Infer(
// //   {method: 'enumerate', maxExecutions: Infinity},
//   { method: "rejection", samples: 1000000 },
//   simulateGraze);

// viz.auto(distA);
// viz.auto(distB);

viz.line([1,2,3], [4,5,6], {xLabel: 'foo', yLabel: 'bar'})
```