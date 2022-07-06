Vue.component("incremental-mass-layer", {
    data: function()
    {
        return {
            formula: game.formulaLayer
        }
    },
    computed: {
        unlockIncrementalMass: function()
        {
            return game.restackLayer.upgradeTreeNames.template3.level.gte(1);
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
    template: `<div class="incremental-mass-layer">
    <div v-if="unlockedIncrementalMass">
        <p>Your boost for layer, translated to a x{{formatNumber(formula.getNBoostFromLayer(), 2, 2)}} Boost on <span class="aleph">ℵ</span> gain</p>
    </div>
    <div v-else>
        <h2>Incremental Mass Disbaled</h2>
        <h3>Sorry i think reach restack layer unlcok incremental mass.</h3>
    </div>
</div>`
});