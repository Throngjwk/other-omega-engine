const game = {
    version: "1.1",
    timeSaved: Date.now(),
    layers: [],
    highestLayer: 0,
    highestUpdatedLayer: 0,
    automators: {
        autoMaxAll: new Automator("Auto Max All", "Automatically buys max on all Layers", () =>
        {
            for(let i = Math.max(0, game.volatility.autoMaxAll.apply().toNumber()); i < game.layers.length; i++)
            {
                game.layers[i].maxAll();
            }
        }, new DynamicLayerUpgrade(level => Math.floor(level / 3) + 1, () => null, () => "Decrease the Automator interval",
            level => Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(level.toNumber()) * [0.2, 0.5, 0.8][level.toNumber() % 3]),
            level => level.gt(0) ? Math.pow(0.8, level.toNumber() - 1) * 10 : Infinity, null, {
                getEffectDisplay: effectDisplayTemplates.automator()
            })),
        autoPrestige: new Automator("Auto Prestige", "Automatically prestiges all Layers", () =>
        {
            for(let i = 0; i < game.layers.length - 1; i++)
            {
                if(game.layers[game.layers.length - 2].canPrestige() && !game.settings.autoPrestigeHighestLayer)
                {
                    break;
                }
                if(game.layers[i].canPrestige() && !game.layers[i].isNonVolatile())
                {
                    game.layers[i].prestige();
                }
            }
        }, new DynamicLayerUpgrade(level => Math.floor(level / 2) + 2, () => null, () => "Decrease the Automator interval",
            level => Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(level.add(2).toNumber()) * (level.toNumber() % 2 === 0 ? 0.25 : 0.75)),
            level => level.gt(0) ? Math.pow(0.6, level.toNumber() - 1) * 30 : Infinity, null, {
                getEffectDisplay: effectDisplayTemplates.automator()
            })),
        autoAleph: new Automator("Auto Aleph", "Automatically Max All Aleph Upgrades", () =>
        {
            game.alephLayer.maxAll();
        }, new DynamicLayerUpgrade(level => level + 3, () => null, () => "Decrease the Automator interval",
            level => Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(level.add(3).toNumber()) * 0.7),
            level => level.gt(0) ? Math.pow(0.6, level.toNumber() - 1) * 60 : Infinity, null, {
                getEffectDisplay: effectDisplayTemplates.automator()
            })),
        autoAuto: new Automator("Auto Automators", "Automatically Max All Automators (except this)", () =>
        {
            for(let i = 0; i < game.automators.length - 2; i++)
            {
                game.automators[i].upgrade.buyMax()
            }
        }, new DynamicLayerUpgrade(level => level + 7, () => null, () => "Decrease the Automator interval",
            level => Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(level.add(10).toNumber()) * 10),
            level => level.gt(0) ? Math.pow(0.6, level.toNumber() - 1) * 500 : Infinity, null, {
                getEffectDisplay: effectDisplayTemplates.automator()
            })),
    },
    volatility: {
        layerVolatility: new DynamicLayerUpgrade(level => level + 1, level => level,
            function()
            {
                return "Make the next Layer non-volatile";
            }, level => Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(level.add(1).toNumber())), level => level.sub(1), null, {
                getEffectDisplay: function()
                {
                    const val1 = this.level.eq(0) ? "None" : PrestigeLayer.getNameForLayer(this.apply().toNumber());
                    const val2 = PrestigeLayer.getNameForLayer(this.getEffect(this.level.add(1)).toNumber());
                    return val1 + " → " + val2;
                }
            }),
        prestigePerSecond: new DynamicLayerUpgrade(level => Math.round(level * 1.3) + 3, level => null,
            () => "Boost the Prestige Reward you get per second",
            function(level)
            {
                const max = PrestigeLayer.getPrestigeCarryOverForLayer(Math.round(level.toNumber() * 1.3) + 3);
                return Decimal.pow(10, new Random(level.toNumber() * 10 + 10).nextDouble() * max).round();
            }, level => new Decimal(0.5 + 0.1 * level), null, {
                getEffectDisplay: effectDisplayTemplates.percentStandard(0)
            }),
        autoMaxAll: new DynamicLayerUpgrade(level => level + 2, level => level,
            function()
            {
                return "The next Layer is maxed automatically each tick";
            }, level => Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(level.add(2).toNumber()) * 0.125), level => level.sub(1), null, {
                getEffectDisplay: function()
                {
                    const val1 = this.level.eq(0) ? "None" : PrestigeLayer.getNameForLayer(this.apply().toNumber());
                    const val2 = PrestigeLayer.getNameForLayer(this.getEffect(this.level.add(1)).toNumber());
                    return val1 + " → " + val2;
                }
            }),
    },
    achievements: [
        new Achievement("You played!", "If you dont have this, you shouldn't exist", "&omega;", () => true),
        new Achievement("Starting out", "Gain 1 &alpha;", "&alpha;", () => game.layers[0] && game.layers[0].resource.gte(1)),
        new Achievement("5 alpha", "Gain 5 &alpha;", "+&alpha;", () => game.layers[0] && game.layers[0].resource.gte(5)),
        new Achievement("First Generator", "Buy 1 <span>&alpha;<sub>1</sub></span> Generator", "<span>&alpha;<sub>1</sub></span>", () => game.layers[0] && game.layers[0].generators[0].bought.gt(0)),
        new Achievement("Second Generator", "Buy 1 <span>&alpha;<sub>2</sub></span> Generator", "<span>&alpha;<sub>2</sub></span>", () => game.layers[0] && game.layers[0].generators[1].bought.gt(0)),
        new Achievement("Third Generator", "Buy 1 <span>&alpha;<sub>3</sub></span> Generator", "<span>&alpha;<sub>3</sub></span>", () => game.layers[0] && game.layers[0].generators[2].bought.gt(0)),
        new Achievement("Fourth Generator", "Buy 1 <span>&alpha;<sub>4</sub></span> Generator", "<span>&alpha;<sub>4</sub></span>", () => game.layers[0] && game.layers[0].generators[3].bought.gt(0)),
        new Achievement("Fifth Generator", "Buy 1 <span>&alpha;<sub>5</sub></span> Generator", "<span>&alpha;<sub>5</sub></span>", () => game.layers[0] && game.layers[0].generators[4].bought.gt(0)),
        new Achievement("Sixth Generator", "Buy 1 <span>&alpha;<sub>6</sub></span> Generator", "<span>&alpha;<sub>6</sub></span>", () => game.layers[0] && game.layers[0].generators[5].bought.gt(0)),
        new Achievement("Seventh Generator", "Buy 1 <span>&alpha;<sub>7</sub></span> Generator", "<span>&alpha;<sub>7</sub></span>", () => game.layers[0] && game.layers[0].generators[6].bought.gt(0)),
        new Achievement("Eightth Generator", "Buy 1 <span>&alpha;<sub>8</sub></span> Generator", "<span>&alpha;<sub>8</sub></span>", () => game.layers[0] && game.layers[0].generators[7].bought.gt(0)),
        new Achievement("Nineth Generator", "Buy 1 <span>&alpha;<sub>9</sub></span> Generator", "<span>&alpha;<sub>9</sub></span>", () => game.layers[0] && game.layers[0].generators[8].bought.gt(0)),
        new Achievement("Million", "Reach 1,000,000 &alpha;", "&alpha;", () => game.layers[0] && game.layers[0].resource.gte(1e6)),
        new Achievement("10 billion a lot", "Reach 1.00e10 &alpha;", "&alpha;", () => game.layers[0] && game.layers[0].resource.gte(1e10)),
        new Achievement("Gigistonk", "Reach 1.00e20 &alpha;", "&alpha;", () => game.layers[0] && game.layers[0].resource.gte(1e20)),
        new Achievement("Half a Power 100", "Reach 1.00e50 &alpha;", "&alpha;", () => game.layers[0] && game.layers[0].resource.gte(1e50)),
        new Achievement("Googol:1e102%?", "Reach 1.00e100 &alpha;", "&alpha;", () => game.layers[0] && game.layers[0].resource.gte(1e100)),
        new Achievement("Beta Version", "Gain 1 L2", "L2", () => game.layers[1] && game.layers[1].resource.gte(1)),
        new Achievement("Hundred", "Reach 100 L2", "100 L2;", () => game.layers[1] && game.layers[1].resource.gte(100)),
        new Achievement("First Generator Layer 2", "Buy 1 <span>L2<sub>1</sub></span> Generator", "<span>L2<sub>1</sub></span>", () => game.layers[1] && game.layers[1].generators[0].bought.gt(0)),
        new Achievement("Wheel Generator Layer 2", "Buy 1 <span>L2<sub>3</sub></span> Generator", "<span>L2<sub>3</sub></span>", () => game.layers[1] && game.layers[1].generators[2].bought.gt(0)),
        new Achievement("To a Infinity!", "Reach 1.80e308 &alpha;", "&alpha;", () => game.layers[0] && game.layers[0].resource.gte("1.8e308")),
        new Achievement("Wholey Generator Layer 2", "Buy 1 <span>L2<sub>5</sub></span> Generator", "<span>L2<sub>5</sub></span>", () => game.layers[1] && game.layers[1].generators[4].bought.gt(0)),
        new Achievement("Partial Generator Layer 2", "Buy 1 <span>L2<sub>8</sub></span> Generator", "<span>L2<sub>8</sub></span>", () => game.layers[1] && game.layers[1].generators[7].bought.gt(0)),
        new Achievement("BIG BIG MUCH ALPHA...", "Reach 1.80e708 &alpha;", "&alpha;", () => game.layers[0] && game.layers[0].resource.gte("1.8e708")),
        new Achievement("Third Layer", "Gain 1 L3", "L3", () => game.layers[2] && game.layers[2].resource.gte(1)),
        new Achievement("First Generator Layer 3", "Buy 1 <span>L3<sub>1</sub></span> Generator", "<span>L2<sub>1</sub></span>", () => game.layers[2] && game.layers[2].generators[0].bought.gt(0)),
        new Achievement("Wrong Generator Layer 3", "Buy 1 <span>L3<sub>6</sub></span> Generator", "<span>L2<sub>6</sub></span>", () => game.layers[2] && game.layers[2].generators[5].bought.gt(0)),
        new Achievement("Aleph-0", "Start gaining aleph", "&aleph;", () => game.alephLayer.isUnlocked()),
        new Achievement("Aleph-1", "Have 1e75 aleph", "&aleph;<sub>1</sub>", () => game.alephLayer.aleph.gte("1e75")),
        new Achievement("Aleph-2", "Have 1e200 aleph", "&aleph;<sub>2</sub>", () => game.alephLayer.aleph.gte("1e200")),
        new Achievement("Aleph-3", "Have 1.8e308 aleph", "&aleph;<sub>3</sub>", () => game.alephLayer.aleph.gte("1.8e308")),
        new Achievement("Stacking up", "Do a restack and restart your progress", "&kappa;", () => game.restackLayer.timesReset > 0),
        new Achievement("Upgradalicious", "Max all the non-meta upgrades", "↑<sub>↑<sub>↑</sub></sub>", () => (Object.values(game.restackLayer.permUpgrades).filter(u => u.level.gt(0)).length + Object.values(game.restackLayer.permUpgrades).filter(u => u.level.gt(1)).length) == 12),
        new Achievement("Idle^2", "Buy the meta upgrade", "↑<sub>2<sub>", () => game.restackLayer.metaUpgrade.level.gte(1)),
        new Achievement("No turning back", "Go meta and be reborn", "&Omega;", () => game.metaLayer.active),
        new Achievement("Endgame", "Reach layer 1.8e308 and finish "+mod.primaryName+mod.secondaryName, "Ʊ", () => game.metaLayer.layer.gte(Infinities[0])),
    ],
    secretAchievements: [
        new Achievement("A very long wait...", "Have a game with over 3 months of time", "...", () => game.timeSpent > 50803200),
        new Achievement("Aleph-π", "Have πe314 aleph", "&aleph;<sub>π</sub>", () => game.alephLayer.aleph.gte("3.141e341")),
        new Achievement("Meta sucks!", "Get &Omega; without meta", "&Omega;&Omega;&Omega;&Omega;&Omega;", () => game.highestLayer >= 47 && !game.metaLayer.active),
        new Achievement("Volatility sucks!", "Get &epsilon; without layer volatility upgrade", "&epsilon;&epsilon;&epsilon;&epsilon;&epsilon;", () => game.highestLayer >= 5 && game.volatility.layerVolatility.level.eq(0)),
        new Achievement("Aleph-LOL", "Have πe404 aleph", "&aleph;<sub>LOL</sub>", () => game.alephLayer.aleph.gte("3.141e404")),
    ],
    alephLayer: new AlephLayer(),
    restackLayer: new ReStackLayer(),
    metaLayer: new MetaLayer(),
    currentLayer: null,
    currentChallenge: null,
    notifications: [],
    timeSpent: 0,
    settings: {
        tab: "Layers",
        showAllLayers: true,
        showMinLayers: 5,
        showMaxLayers: 5,
        showLayerOrdinals: true,
        layerTickSpeed: 1,
        buyMaxAlways10: true,
        disableBuyMaxOnHighestLayer: false,
        resourceColors: true,
        resourceGlow: true,
        newsTicker: true,
        autoMaxAll: true,
        autoPrestigeHighestLayer: true,
        notifications: true,
        saveNotifications: true,
        confirmations: true,
        offlineProgress: true,
        titleStyle: 2,
        theme: mod.themes[0][1],
        layerNames: mod.layerNames[0][1],
        font: mod.fonts[0][1],
        saveInfo: "i have no idea"
    },
};
const initialGame = functions.getSaveString();
