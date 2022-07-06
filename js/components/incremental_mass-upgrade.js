Vue.component("incremental-mass-upgrade", {
    props: ["upgrade"],
    template: `<resource-upgrade :upgrade="upgrade" :resourcename="'<span class=` + 'omega' + `>IM</span>'"></resource-upgrade>`
});