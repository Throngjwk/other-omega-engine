Vue.component("formula-upgrade2", {
    props: ["upgrade"],
    template: `<resource-upgrade :upgrade="upgrade" :resourcename="'<span class=` + 'omega' + `>a</span>'"></resource-upgrade>`
});