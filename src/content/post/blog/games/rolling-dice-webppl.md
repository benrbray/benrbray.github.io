---
title: Comparing D&D Weapon Masteries by Rolling Dice with WebPPL
datePublished: 2024-11-17
tags: [games, dnd, math]
summary: Should my polearm master Paladin fight with a halberd or glaive?
---

The 2024 rules update for D&D 5e introduced the concept of [weapon masteries](https://www.dndbeyond.com/sources/dnd/free-rules/equipment#MasteryProperties), giving martial classes interesting new ways to specialize their fighting style.  In this post, I try to answer the following question:

> Should my polearm master Paladin fight with a halberd or glaive?

The halberd can be used to **cleave** multiple nearby enemies, while the glaive will always **graze** enemies when an attack misses.  From the rulebook:

> **Graze (Glaive).** If your attack roll with this weapon misses a creature, you can deal damage to that creature equal to the ability modifier you used to make the attack roll. This damage is the same type dealt by the weapon, and the damage can be increased only by increasing the ability modifier.

> **Cleave (Halberd).** If you hit a creature with a melee attack roll using this weapon, you can make a melee attack roll with the weapon against a second creature within 5 feet of the first that is also within your reach. On a hit, the second creature takes the weapon’s damage, but don’t add your ability modifier to that damage unless that modifier is negative. You can make this extra attack only once per turn.



The extra attack from

> ## Polearm Master
> 
> **Pole Strike.** Immediately after you take the Attack action and attack with a Quarterstaff, a Spear, or a weapon that has the Heavy and Reach properties, you can use a Bonus Action to make a melee attack with the opposite end of the weapon. The weapon deals Bludgeoning damage, and the weapon’s damage die for this attack is a d4.
>
> **Reactive Strike.** While you’re holding a Quarterstaff, a Spear, or a weapon that has the Heavy and Reach properties, you can take a Reaction to make one melee attack against a creature that enters the reach you have with that weapon.



```js
// var geometric = function() {
//   return flip(.5) ? 0 : geometric() + 1;
// }

// var conditionedGeometric = function() {
//   var x = geometric();
//   factor(x > 2 ? 0 : -Infinity);
//   return x;
// }

modSTR = 4
targetAC = 15
attack1 = 1d20+7
damage1 = if attack1 > targetAC then (1d10+modSTR) else modSTR
cleave  = attack1 > targetAC then (1d10) else 0

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