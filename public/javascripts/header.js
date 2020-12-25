let tabBar

$(document).ready(() => {
    initComponents()
    $(".header_title").click(() => {
        location.href = "/"
    })
    clickTabs()
})

function initComponents() {
    document.querySelectorAll('.mdc-text-field').forEach(value => {
        new mdc.textField.MDCTextField(value)
    })
    document.querySelectorAll('.mdc-button').forEach(value => {
        new mdc.ripple.MDCRipple(value)
    })
    document.querySelectorAll('.mdc-icon-button').forEach(value => {
        let br = new mdc.ripple.MDCRipple(value)
        br.unbounded = true;
    })


    document.querySelectorAll('.mdc-tab-bar').forEach(value => {
        tabBar = new mdc.tabBar.MDCTabBar(value)
    })
}

function clickTabs() {
    $("#tab_input_manual").click(() => {
        tabBar.activateTab(1)
        location.href = "/input/manual"
    })
    $("#tab_input_file").click(() => {
        tabBar.activateTab(2)
        location.href = "/input/file"
    })
    $("#tab_search_type").click(() => {
        tabBar.activateTab(3)
        location.href = "/search/type"
    })
    $("#tab_search_case").click(() => {
        tabBar.activateTab(4)
        location.href = "/search/case"
    })
}