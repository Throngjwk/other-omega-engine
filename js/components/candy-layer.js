Vue.component("candy-layer", {
    data: function()
    {
        return {
            candy: game.candyLayer
        }
    },
    computed: {
        canProduceAleph: function()
        {
            return this.candy.getCandyBoostFromLayer().gt(0);
        },
        isSoftCapped: function()
        {
            return this.candy.candy.gt(1e300);
        }
    },
    methods: {
        formatNumber: (n, prec, prec1000, lim) => functions.formatNumber(n, prec, prec1000, lim),
    },
    template: `<div class="aleph-layer">
<div class="resource">
    <p>You have {{formatNumber(candy.points, 2, 2, 1e9)}} <span class="aleph">P</span></p>
    <p>You have {{formatNumber(candy.candy, 2, 2, 1e9)}} <span class="aleph">C</span></p>
    <p>You get {{formatNumber(candy.getPointGain(), 2, 2, 1e9)}} <span class="aleph">P</span> every second</p>
</div>
<div class="boosts">
    ...
</div>
<div class="tabs">
    <button @click="candy.clickPrestige()">Prestige!</button>
</div>
</div>`
});