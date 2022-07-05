class FormulaLayer
{
    constructor()
    {
        this.n = new Decimal(0);
        this.t = new Decimal(1)
        this.upgrades = {
            aGain: new AlephUpgrade("A Gain",
                level => new Decimal.pow(2.25, level).mul(50),
                level => new Decimal(1).add(level)),
        };
    }

    getNGain()
    {
        return this.t.sqrt();
    }

    getTGain()
    {
        return new Decimal(1);
    }

    isUnlocked()
    {
        return game.metaLayer.layer.gte("1.8e308");
    }

    getNBoostFromLayer()
    {
        if(game.metaLayer.layer.gte("1.8e308")) return new Decimal(0);
        return game.metaLayer.layer.log10().sub(308);
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
            this.n = this.n.add(this.getNGain().mul(dt));
            this.t = this.t.add(this.getTGain())
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