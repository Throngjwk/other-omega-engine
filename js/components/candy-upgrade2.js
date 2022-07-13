Vue.component("candy-upgrade2", {
    props: ["upgrade"],
    template: `<resource-upgrade :upgrade="upgrade" :resourcename="'<span class=` + 'aleph' + `>P</span>'"></resource-upgrade>`
});