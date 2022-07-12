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

    getAlephGain()
    {
        return this.upgrades.pointGain.apply();
    }

    isUnlocked()
    {
        return game.highestLayer >= 3;
    }

    getAlephBoostFromLayer()
    {
        if(functions.maxLayerUnlocked() < 3) return new Decimal(0);
        if(game.layers[3].timesReset === 0) return new Decimal(0);
        return Decimal.pow(10, Math.max(0, functions.maxLayerUnlocked() - 3));
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