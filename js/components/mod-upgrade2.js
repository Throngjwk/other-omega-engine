Vue.component("mod-upgrade2", {
    props: ["upgrade"],
    template: `<resource-upgrade :upgrade="upgrade" :resourcename="'<span class=` + 'omega' + `>x</span>'"></resource-upgrade>`
});