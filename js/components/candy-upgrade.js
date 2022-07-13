Vue.component("candy-upgrade", {
    props: ["upgrade"],
    template: `<resource-upgrade :upgrade="upgrade" :resourcename="'<span class=` + 'aleph' + `>C</span>'"></resource-upgrade>`
});