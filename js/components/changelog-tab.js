Vue.component("changelog-tab", {
    template: `<div class="changelog-tab">
    <guide-item>
    <template v-slot:title>v1.0.2 Weird</template>
    <template v-slot:text>3 New Themes.<br>2 New Saves<br>Imporve Incremental mass new content coming soon..
    </template>
    </guide-item>
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