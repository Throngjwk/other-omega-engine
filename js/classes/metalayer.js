class MetaLayer
{
    constructor()
    {
        this.active = true;
        this.layer = new Decimal(0);
        this.resource = new Decimal(1);

        this.multiplierUpgrades = [
            new MetaDynamicLayerUpgrade("Increase the Resource Multiplier",
                level => Utils.createValueDilation(level.mul(6).mul(Decimal.pow(1.1, Decimal.max(0, level.sub(15)))), 0.001).floor().add(5),
                level => new Decimal(1),
                level => Decimal.pow(10000, level.pow(game.restackLayer.upgradeTreeNames.resourceMultipliersLevelScaling.apply())).pow(this.getResourceMultiplierBoost())),
            new MetaDynamicLayerUpgrade("Increase the Resource Multiplier",
                level => Utils.createValueDilation(level.mul(24).mul(Decimal.pow(1.1, Decimal.max(0, level.sub(15)))), 0.001).floor().add(72),
                level => new Decimal(1),
                level => Decimal.pow(1e36, level.pow(game.restackLayer.upgradeTreeNames.resourceMultipliersLevelScaling.apply())).pow(this.getResourceMultiplierBoost())),
            new MetaDynamicLayerUpgrade("Increase the Resource Multiplier",
                level => Utils.createValueDilation(level.mul(480).mul(Decimal.pow(1.1, Decimal.max(0, level.sub(15)))), 0.001).floor().add(1920),
                level => new Decimal(1),
                level => Decimal.pow("1e960", level.pow(game.restackLayer.upgradeTreeNames.resourceMultipliersLevelScaling.apply())).pow(this.getResourceMultiplierBoost())),
            new MetaDynamicLayerUpgrade("Increase the Resource Multiplier",
                level => Utils.createValueDilation(level.mul(230400).mul(Decimal.pow(1.1, Decimal.max(0, level.sub(15)))), 0.001).floor().add(691200),
                level => new Decimal(1),
                level => Decimal.pow("1e200000", level.pow(game.restackLayer.upgradeTreeNames.resourceMultipliersLevelScaling.apply())).pow(this.getResourceMultiplierBoost())),
        ];

        this.powerUpgrades = [
            new MetaDynamicLayerUpgrade("Increase the Resource Power",
                level => Utils.createValueDilation(level.mul(110592000).mul(Decimal.pow(1.4, Decimal.max(0, level.sub(5)))), 0.001).floor().add(1105920000),
                level => new Decimal(1),
                level => Decimal.pow(1.2, level).pow(this.getResourcePowererBoost()).mul(game.restackLayer.upgradeTreeNames.resourcePowerersStrength.apply()), {
                    getEffectDisplay: effectDisplayTemplates.numberStandard(2, "^")
                }),
            new MetaDynamicLayerUpgrade("Increase the Resource Power",
                level => Utils.createValueDilation(level.mul(1e21).mul(Decimal.pow(2, Decimal.max(0, level.sub(5)))), 0.001).floor().add(5e21),
                level => new Decimal(1),
                level => Decimal.pow(1.2, level).pow(this.getResourcePowererBoost()).mul(game.restackLayer.upgradeTreeNames.resourcePowerersStrength.apply()), {
                    getEffectDisplay: effectDisplayTemplates.numberStandard(2, "^")
                }),
            new MetaDynamicLayerUpgrade("Increase the Resource Power",
                level => Utils.createValueDilation(level.mul(1e199).mul(Decimal.pow(5, Decimal.max(0, level.sub(3)))), 0.001).floor().add(1e200),
                level => new Decimal(1),
                level => Decimal.pow(1.1, level).pow(this.getResourcePowererBoost()).mul(game.restackLayer.upgradeTreeNames.resourcePowerersStrength.apply()), {
                    getEffectDisplay: effectDisplayTemplates.numberStandard(2, "^")
                }),
            new MetaDynamicLayerUpgrade("Increase the Resource Power",
                level => Utils.createValueDilation(level.mul("1e325").mul(Decimal.pow(10, Decimal.max(0, level.sub(1)))), 0.001).floor().add("4e325"),
                level => new Decimal(1),
                level => Decimal.pow(1.09, level).pow(this.getResourcePowererBoost()).mul(game.restackLayer.upgradeTreeNames.resourcePowerersStrength.apply()), {
                    getEffectDisplay: effectDisplayTemplates.numberStandard(2, "^")
                })
        ];
    }

    getMultiPS()
    {
        let multi = new Decimal(1);
        for(const upg of this.multiplierUpgrades)
        {
            multi = multi.mul(upg.apply());
        }
        for(const upg of this.powerUpgrades)
        {
            multi = multi.pow(upg.apply());
        }
        return new Decimal(game.restackLayer.metaUpgrade.apply()).mul(multi).pow(game.restackLayer.upgradeTreeNames.resourceMultiplier.apply());
    }

    getLayersPS()
    {
        return this.getMultiPS().log10().div(PrestigeLayer.getPrestigeCarryOverForLayer(this.layer));
    }

    getResourceMultiplierBoost()
    {
        return game.restackLayer.upgradeTreeNames.resourceMultiplierUpgrades.apply()
            .mul(game.restackLayer.upgradeTreeNames.resourceMultiplierUpgradesTime.apply())
            .mul(game.restackLayer.upgradeTreeNames.resourceMultiplierUpgrades2.apply());
    }

    getResourcePowererBoost()
    {
        return game.restackLayer.upgradeTreeNames.resourcePowerersUpgrades.apply();
    }

    getApproxAlpha()
    {
        if(this.layer.gt(1e6))
        {
            const carryOver = PrestigeLayer.getPrestigeCarryOverForLayer(this.layer);
            return Decimal.pow(10, Decimal.pow(carryOver, Decimal.max(0, this.layer)));
        }
        let log = new Decimal(1);
        for(let i = 0; i < Math.min(10, this.layer); i++)
        {
            log = log.mul(PrestigeLayer.getPrestigeCarryOverForLayer(i));
        }
        const carryOver = PrestigeLayer.getPrestigeCarryOverForLayer(this.layer);
        const fract = ((carryOver - 1) * this.resource.log10().div(carryOver - 1)) + (1);
        return Decimal.pow(10, Decimal.pow(carryOver, Decimal.max(0, this.layer.sub(10))).mul(log).mul(fract));
    }

    maxAll()
    {
        for(const u of this.powerUpgrades.concat(this.multiplierUpgrades))
        {
            u.buyMax();
        }
    }

    tick(dt)
    {
        if(this.active)
        {
            if(this.getLayersPS().lt(10))
            {
                this.resource = this.resource.mul(Decimal.pow(this.getMultiPS(), dt));
                if(this.resource.log10().gte(PrestigeLayer.getPrestigeCarryOverForLayer(this.layer.toNumber())))
                {
                    const layerAmnt = this.layer.gt(10) ? this.resource.log(Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(10))).floor() : 1;
                    this.resource = this.resource.div(Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(this.layer.toNumber())).pow(layerAmnt));
                    this.layer = this.layer.add(layerAmnt);
                }
            }
            else
            {
                this.resource = new Decimal(1);
                this.layer = this.layer.add(this.getLayersPS().mul(dt));
            }
        }
    }

    load(obj)
    {
        this.active = obj.active;
        this.layer = obj.layer;
        this.resource = obj.resource;
        for(let i = 0; i < obj.multiplierUpgrades.length; i++)
        {
            this.multiplierUpgrades[i].level = obj.multiplierUpgrades[i].level;
        }
        for(let i = 0; i < obj.powerUpgrades.length; i++)
        {
            this.powerUpgrades[i].level = obj.powerUpgrades[i].level;
        }
    }
}
