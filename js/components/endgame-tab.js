Vue.component("endgame-tab", {
    computed: {
        layer: function() {
            layer = game.metaLayer.layer;
            return layer
        },
    },
    methods: {
        hardResetGame: () => functions.hardResetGame(),
        layerHack: () => game.metaLayer.layer = new Decimal("1e400")
    },
    template: `<div id="endgame">
    <h2><span class="omega">You</span> Win!</h2>
    <p>Win Win! at game than <span class="omega">{{layer}}</span><br>
    <button onclick="game.settings.tab = 'Layers'">Continue</button> <button @click="hardResetGame()">Wipe Game</button> <button @click="layerHack()">Layer to 1e400</button></p>
</div>`
})