class Fighter {
    constructor(name = 'Fighter', power = 10, health = 1000) {
        this.name = name;
        this.power = power;
        this.health = health;
    }

    setDamage(damage) {
        this.health -= damage;
        // If health became negative, set it to zero
        // since the message such as "health: -100 HP" would look oddly
        if (this.health < 0) {
            this.health = 0;
        }
        console.log(`${this.name}'s health: ${this.health} HP`);
    }

    hit(enemy, point) {
        let damage = point * this.power;
        console.log(`${this.name} HITS ${enemy.name}: -${damage} HP!`);
        enemy.setDamage(damage);
    }
}

class ImprovedFighter extends Fighter {
    hit(enemy, point) {
        return super.hit(enemy, point * 2);
    }
}

let fighter = new Fighter('Heihachi', 10, 1000);
let improvedFighter = new ImprovedFighter('Jinpachi', 8, 1200);

// Make the message before the battle
var announcement = (fighter1Name = 'Fighter1', fighter2Name = 'Fighter2') =>
console.log(`GET READY FOR THE NEXT BATTLE!
${fighter1Name} VS ${fighter2Name}
READY?
FIGHT!

`);
// This message will be displayed if no one wins
var endBattleMessage = '\nUnfortunately, fighters got tired and stopped fighting';

var fight = function(fighter, improvedFighter, ...point) {
    // Randomly choose which fighter hits first
    let fIndex1 = Math.floor((Math.random() * 2));
    // Set the sequence of the fighters
    let fighters = [
        arguments[fIndex1],
        arguments[Math.abs(fIndex1 - 1)]
    ];
    announcement(fighters[0].name, fighters[1].name);

    // If no point was passed as argument, display the message about battle ending
    if (point.length == 0) {
        console.log(endBattleMessage);
    }

    for (let i = 0; i < point.length; i++) {
        // Switch indexes of the fighters to set an attacker
        let fIndex1 = i % 2;
        let fIndex2 = Math.abs(fIndex1 - 1);

        fighters[fIndex1].hit(fighters[fIndex2], point[i]);

        // The battle stops if someone's health dropped to 0
        if (fighters[fIndex2].health == 0) {
            console.log('\nK.O.');
            console.log(`${fighters[fIndex1].name} WINS!`);
            break;
        }
        // In case the loop has gone through all points,
        // display message about battle ending
        if (i == point.length - 1) {
            console.log(endBattleMessage);
        }
    }
};

fight(fighter, improvedFighter, 10, 35, 25, 50, 15, 60, 30, 25);