Vue.component("formula-upgrade", {
    props: ["upgrade"],
    template: `<resource-upgrade :upgrade="upgrade" :resourcename="'<span class=` + 'omega' + `>n</span>'"></resource-upgrade>`
});