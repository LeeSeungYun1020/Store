
$(document).ready(() => {
    initComponents()
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
    const tabBar = new mdc.tab-bar.MDCTabBar(document.querySelector('.mdc-tab-bar'));
    tabBar.getFocusedTabIndex()
}