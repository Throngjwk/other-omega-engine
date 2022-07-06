Vue.component("incremental-mass-layer", {
    data: function()
    {
        return {
            incrementalMass: game.incrementalMassLayer
        }
    },
    computed: {
        unlockedIncrementalMass: function()
        {
            return game.restackLayer.upgradeTreeNames.template3.level.gte(1);
        },
        isSoftCapped: function()
        {
            return this.incrementalMass.IMpoints.gt(1e300);
        }
    },
    methods: {
        formatNumber: (n, prec, prec1000, lim) => functions.formatNumber(n, prec, prec1000, lim),
        layer: () => game.metaLayer.layer
    },
    template: `<div class="incremental-mass-layer">
    <div v-if="unlockedIncrementalMass">
    <div class="resource">
        <p>You have {{formatNumber(incrementalMass.IMpoints, 2, 2, 1e9)}} <span class="omega">IM</span></p>
        <p>You get {{formatNumber(incrementalMass.getIncrementalMassGain(), 2, 2, 1e9)}} <span class="omega">IM</span> every second</p>
</div>
<div class="upgrades">
        <incremental-mass-upgrade :upgrade="incrementalMass.upgrades.IMGain"></incremental-mass-upgrade>
</div>
    </div>
    <div v-else>
        <h2>Incremental Mass Disbaled</h2>
        <h3>Sorry i think reach restack layer unlock incremental mass.</h3>
    </div>
</div>`
});