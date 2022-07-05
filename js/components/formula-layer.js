Vue.component("formula-layer", {
    data: function()
    {
        return {
            formula: game.formulaLayer
        }
    },
    computed: {
        canProduceAleph: function()
        {
            return this.formula.getNBoostFromLayer().gt(0);
        },
        isSoftCapped: function()
        {
            return this.formula.n.gt(1e300);
        }
    },
    methods: {
        formatNumber: (n, prec, prec1000, lim) => functions.formatNumber(n, prec, prec1000, lim),
        layer: () => game.metaLayer.layer
    },
    template: `<div class="formula-layer">
<div class="resource">
    <p>You have {{formatNumber(formula.n, 2, 2, 1e9)}} <span class="omega">ℵ</span></p>
    <p>You get {{formatNumber(formula.getNGain(), 2, 2, 1e9)}} <span class="omega">n</span> every second</p>
</div>
<div class="boosts">
    <div v-if="canProduceAleph">
        <p>Your boost for layer, translated to a x{{formatNumber(formula.getNBoostFromLayer(), 2, 2)}} Boost on <span class="aleph">ℵ</span> gain</p>
    </div>
    <div v-else>
        <p>You need to go <span class="flipped-v">&Omega;</span> at least once to get <span class="omega">F</span></p>
    </div>
</div>
<div class="tabs">
    <button @click="formula.maxAll()">Max All (M)</button>
</div>
<h3>n(t) = \u221At</h3>
<h3>Formula Upgrades</h3>
</div>`
});