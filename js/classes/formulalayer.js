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
            boostN: new FormulaLayerUpgrade("Boost for a log10(n)",
                level => new Decimal.pow(1e5, level).mul(1e5),
                level => new Decimal(1).add(level.mul(this.n.add(10).log10()))),
            divRMRP: new FormulaLayerUpgrade("Divide of All Resource Mulitiplers and Resource Powerers",
                level => new Decimal.pow(1000, level).mul(1e9),
                level => new Decimal.pow(3, level)),
            boostN2: new FormulaLayerUpgrade("Boost for a log10(L)",
                level => new Decimal.pow(1e9, level).mul(1e6),
                level => new Decimal.pow(game.metaLayer.layer.add(10).log10(), level)),
            basePower: new FormulaLayerUpgrade2("Base Power of increase resource mulitipler.",
                level => new Decimal(20).mul(level.add(1)),
                level => new Decimal.pow(2, level.add(1))),
            mulitB: new FormulaLayerUpgrade2("Mulitipling of Based b this formula.",
                level => new Decimal(35).mul(level.add(1)),
                level => new Decimal(1).add(level.mul(new Decimal.pow(50, this.b)))),
            divRP: new FormulaLayerUpgrade2("Divide of All Resource Powerers",
                level => new Decimal(60).mul(level.add(1)),
                level => new Decimal.pow(8, level)),
            mulitB2: new FormulaLayerUpgrade2("Mulitipling of Based b this formula.",
                level => new Decimal(100).mul(level.add(1)),
                level => new Decimal(1).add(level.mul(new Decimal.pow(30, this.b)))),
        };
    }

    getNGain()
    {
        return this.t.sqrt().pow(this.b.add(1)).mul(this.a.add(1)).mul(this.upgrades.boostN.apply()).mul(this.upgrades.boostN2.apply()).mul(this.upgrades.mulitB.apply()).mul(this.getNBoostFromLayer());
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