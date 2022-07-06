Vue.component("changelog-tab", {
    template: `<div class="changelog-tab">
    <guide-item>
    <template v-slot:title>v1.0.1 Themes & Layer</template>
    <template v-slot:text>2 New Themes.<br>1 New Names.<br>1 New Generator for alpha<br>1 New Line of News Ticker.
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v1.0.0 Update</template>
    <template v-slot:text>Intial Release.
    </template>
    </guide-item>
</div>`
})