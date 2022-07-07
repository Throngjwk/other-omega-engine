Vue.component("aleph-layer", {
    data: function()
    {
        return {
            aleph: game.alephLayer
        }
    },
    computed: {
        canProduceAleph: function()
        {
            return this.aleph.getAlephBoostFromLayer().gt(0);
        },
        isSoftCapped: function()
        {
            return this.aleph.aleph.gt(1e300);
        }
    },
    methods: {
        formatNumber: (n, prec, prec1000, lim) => functions.formatNumber(n, prec, prec1000, lim),
        highestLayer: () => functions.maxLayerUnlocked()
    },
    template: `<div class="aleph-layer">
<div class="resource">
    <p>You have {{formatNumber(tree.points, 2, 2, 1e9)}} <span class="omega">P</span></p>
    <p>You get {{formatNumber(tree.getPointGain(), 2, 2, 1e9)}} <span class="omega">P</span> every second</p>
</div>
<div class="boosts">
    <div v-if="canProduceAleph">
        <p>Your highest Layer is <resource-name :layerid="highestLayer()"></resource-name>, translated to a x{{formatNumber(tree.getTreeBoostFromLayer(), 2, 2)}} Boost on <span class="aleph">ℵ</span> gain</p>
    </div>
    <div v-else>
        <p>You need to go <resource-name :layerid="23"></resource-name> at least once to get <span class="omega">T</span></p>
    </div>
</div>
<div class="tabs">
    <button @click="tree.prestige()">Prestige</button>
</div>
<h3>Upgrades</h3>
</div>`
});