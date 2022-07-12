class CandyLayer
{
    constructor()
    {
        this.points = new Decimal(0);
        this.upgrades = {
            candyGain: new CandyUpgrade2("Increase your point gain",
                level => new Decimal(2).pow(level),
                level => Decimal.pow(1.75, level)),
        }

    getPointGain()
    {
        return this.upgrades.pointGain.apply();
    }

    clickPrestige()
    {
        this.candy = this.points.div(10)
        this.points = new Decimal(0)
    }

    isUnlocked()
    {
        return game.metaLayer.active
    }

    getCandyBoostFromLayer()
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
            this.aleph = this.aleph.add(this.getAlephGain().mul(dt));
        }
    }

    loadFromSave(obj)
    {
        this.aleph = obj.aleph;
        for(const k of Object.getOwnPropertyNames(obj.upgrades))
        {
            if(this.upgrades[k])
            {
                this.upgrades[k].level = obj.upgrades[k].level;
            }
        }
    }
}
}