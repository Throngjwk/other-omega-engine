class Mod
{
    constructor()
    {
        this.points = new Decimal(0);
        this.x = new Decimal(0);
        this.upgrades = {
            pointGain: new AlephUpgrade("Increase your point gain",
                level => Decimal.pow(1.215, level).mul(100),
                level => Decimal.pow(1.2, level)),
        };
    }

    getModGain()
    {
        return this.upgrades.pointGain.apply().mul(this.getModBoostFromLayer());
    }

    getXGain()
    {
        return new Decimal(0).mul(this.getModBoostFromLayer());
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