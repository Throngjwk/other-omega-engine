class IncrementalMassLayer
{
    constructor()
    {
        this.IMpoints = new Decimal(0);
        this.upgrades = {
            IMGain: new IncrementalMassLayerUpgrade("Increase your incremental mass gain",
                level => Decimal.pow(1.3, level).mul(100),
                level => Decimal.pow(1.215, level)),
        };
    }

    getIncrementalMassGain()
    {
        return this.upgrades.IMGain.mul(this.getIncrementalMassBoostFromLayer());
    }

    isUnlocked()
    {
        return game.restackLayer.upgradeTreeNames.template3.leve.gte(1);
    }

    getIncrementalMassBoostFromLayer()
    {
        return new Decimal(1)
    }

    maxAll()
    {
        for(const k of Object.keys(this.upgrades))
        {
            this.upgrades[k].buyMax();
        }
    }

    tick(dt)
    {
        if(this.isUnlocked())
        {
            this.IMpoints = this.IMpoints.add(this.getIncrementalMassGain().mul(dt));
        }
    }

    loadFromSave(obj)
    {
        this.IMpoints = obj.IMpoints;
        for(const k of Object.getOwnPropertyNames(obj.upgrades))
        {
            if(this.upgrades[k])
            {
                this.upgrades[k].level = obj.upgrades[k].level;
            }
        }
    }
}
