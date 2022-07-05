class Mod
{
    constructor()
    {
        this.points = new Decimal(0);
        this.x = new Decimal(0);
        this.upgrades = {
            pointGain: new ModUpgrade("Increase your point gain",
                level => Decimal.pow(1.225, level).mul(100),
                level => Decimal.pow(1.2, level)),
            xGain: new ModUpgrade("Increase your x gain",
                level => new Decimal.pow(2, level).mul(5000),
                level => new Decimal(0).add(level.mul(0.5))),
            boostAlephBase: new ModUpgrade2("Increase your base boost of aleph",
                level => new Decimal.pow(1e5, level).mul(100),
                level => new Decimal(1).add(level.mul(0.2))),
            moreX: new ModUpgrade2("Increase your log10(x) for x gain.",
                level => new Decimal.pow(1e20, level).mul(1e5),
                level => new Decimal(1).add(level.mul(this.x.add(1).log10()))),
        };
    }

    getModGain()
    {
        return this.upgrades.pointGain.apply().mul(this.getModBoostFromLayer());
    }

    getXGain()
    {
        return this.upgrades.xGain.apply().mul(this.upgrades.moreX.apply()).mul(this.getModBoostFromLayer());
    }

    isUnlocked()
    {
        return game.highestLayer >= 15;
    }

    getModBoostFromLayer()
    {
        if(functions.maxLayerUnlocked() < 15) return new Decimal(0);
        if(game.layers[15].timesReset === 0) return new Decimal(0);
        return Decimal.pow(10, Math.max(0, functions.maxLayerUnlocked() - 15));
    }

    getXBoostFromLayer()
    {
        if(functions.maxLayerUnlocked() < 15) return new Decimal(0);
        if(game.layers[15].timesReset === 0) return new Decimal(0);
        return Decimal.pow(10, Math.max(0, functions.maxLayerUnlocked() - 15));
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
            this.points = this.points.add(this.getModGain().mul(dt));
            this.x = this.x.add(this.getXGain().mul(dt));
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