Vue.component("mod-layer", {
    data: function()
    {
        return {
            mod: game.mod
        }
    },
    computed: {
        canProduceMod: function()
        {
            return this.mod.getModBoostFromLayer().gt(0);
        },
        isSoftCapped: function()
        {
            return this.mod.points.gt(1e300);
        }
    },
    methods: {
        formatNumber: (n, prec, prec1000, lim) => functions.formatNumber(n, prec, prec1000, lim),
        highestLayer: () => functions.maxLayerUnlocked()
    },
    template: `<div class="mod-layer">
<div class="resource">
    <p>You have {{formatNumber(mod.x, 2, 2, 1e9)}} <span class="omega">x</span></p>
    <p>You get {{formatNumber(mod.getXGain(), 2, 2, 1e9)}} <span class="omega">x</span> every second</p>
</div>
<div class="boosts">
    <div v-if="canProduceMod">
        <p>Your highest Layer is <resource-name :layerid="highestLayer()"></resource-name>, translated to a x{{formatNumber(mod.getModBoostFromLayer(), 2, 2)}} Boost on <span class="point">P</span> gain</p>
    </div>
    <div v-else>
        <p>You need to go <resource-name :layerid="15"></resource-name> at least once to get <span class="omega">P</span></p>
    </div>
</div>
<div class="tabs">
    <button @click="aleph.maxAll()">Max All (M)</button>
</div>
<h3>Variables</h3>
</div>`
});