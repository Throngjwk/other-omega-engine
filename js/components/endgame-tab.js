Vue.component("pid-tab", {
    computed: {
        xValue: function() {
            x = new Decimal(15)
            return x
        },
        yValue: function() {
            y = new Decimal(20)
            return y
        },
    },
    methods: {
        updatePID: () => {
            x = new Decimal(document.getElementById("x").value)
            y = new Decimal(document.getElementById("y").value)
        },
    },
    template: `<div id="pid">
    <h1>PID</h1>
    <input min="0" max="40" id="x" type="number"></input>
    <input min="0" max="40" id="y" type="number"></input>
</div>`
})