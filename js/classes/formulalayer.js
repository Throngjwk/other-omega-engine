class FormulaLayer
{
    constructor()
    {
        this.n = new Decimal(0);
        this.a = new Decimal(0);
        this.b = new Decimal(0);
        this.t = new Decimal(1);
        this.upgrades = {
            aGain: new FormulaLayerUpgrade("A Gain",
                level => new Decimal.pow(2.25, level).mul(50),
                level => new Decimal(0).add(level)),
            bGain: new FormulaLayerUpgrade2("B Gain",
                level => new Decimal(15).mul(level.add(1)),
                level => new Decimal(0).add(level)),
        };
    }

    getNGain()
    {
        return this.t.sqrt().mul(this.a.add(1)).mul(this.getNBoostFromLayer());
    }

    getTGain()
    {
        return new Decimal(1);
    }

    FixAGain()
    {
        this.a = this.upgrades.aGain.level;
    }

    FixBGain()
    {
        this.b = this.upgrades.bGain.level;
    }

    isUnlocked()
    {
        return game.metaLayer.layer.gte("1.8e308");
    }

    getNBoostFromLayer()
    {
        if(game.metaLayer.layer.gte("1.8e308")) return new Decimal(1);
        return game.metaLayer.layer.log10().sub(307);
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