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
        this.upgradeTree = [
           [
                new IncrementalMassLayerUpgrade("Increase your incremental mass gain",
                level => Decimal.pow(1.4, level).mul(500),
                level => Decimal.pow(1.2, level)),
           ]
        ]
        this.upgradeTree[1][0].setRequirements([this.upgradeTree[0][0]], [this.upgradeTree[1][1]]);
        this.upgradesTreeNames = {
            IMGain2: this.upgradeTree[0][0],
        }
    }

    getIncrementalMassGain()
    {
        return this.upgrades.IMGain.mul(this.getIncrementalMassBoostFromLayer);
    }

    isUnlocked()
    {
        return game.restackLayer.upgradesTreeNames.template3.leve.gte(1);
    }

    getIncrementalMassBoostFromLayer()
    {
        if(game.restackLayer.upgradesTreeNames.template3.leve.gte(1)) {
         return new Decimal(1) 
        } else {
            return new Decimal(0)
        };
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