Vue.component("mod-upgrade", {
    props: ["upgrade"],
    template: `<resource-upgrade :upgrade="upgrade" :resourcename="'<span class=` + 'omega' + `>P</span>'"></resource-upgrade>`
});