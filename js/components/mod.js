Vue.component("mod", {
    template: `<div>
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <h4>Heading 4</h4>
    <h5>Heading 5</h5>
    <h6>Heading 6</h6>
    <span>My Span</span>
    <span class="aleph">Aleph Effect Text</span>
    <span class="omega">Omega Color Text</span>
    <p>My Label</p>
    <h2>My Layer. <resource-name :layerid="5"></resource-name><resource-name :layerid="300"></resource-name></h2>
    <input></input>
    <input type="number"></input>
    <guide-item>
        <template v-slot:title>My Guide</template>
        <template v-slot:text>my label guide description.
        </template>
    </guide-item>
    <h1>My Unicode Character Label. &#x2802;&#x281F;&#x2821;</h1>
    </div>`
})
