addLayer("q", {
    name: "quantum", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Q", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#25E27D",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "quantum", // Name of prestige currency
    baseResource: "times", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade('q', 14)) mult = mult.times(upgradeEffect('q', 14))
        if(hasUpgrade('q', 15)) mult = mult.times(upgradeEffect('q', 15))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Big Bang",
            description: "Get 1 time every second.",
            cost: new Decimal(1),
        },
        12: {
            title: "Gravity",
            description: "Double your time gain.",
            cost: new Decimal(5),
        },
        13: {
            title: "Inflation",
            description: "Time gain is boosted by quantums.",
            cost: new Decimal(15),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }
        },
        14: {
            title: "String",
            description: "Quantums gain is boosted by quantums.",
            cost: new Decimal(35),
            effect() {
                return player[this.layer].points.add(2).pow(0.25)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }
        },
        15: {
            title: "Reheating",
            description: "Quantums gain is boosted by times and add a new layer(TBD).",
            cost: new Decimal(150),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }
        },
    },
})
