let isReady = false;
$(document).ready(() => {
    if (!isReady) {
        isReady = true
        $('header').load('header.ejs')
        $('footer').load('footer.ejs')
    }
    moveFooter()
    $(window).resize(() => {
        moveFooter()
    })
})

function moveFooter() {
    console.log($(window).height())
    console.log($(document).height())
    if ($(window).height() <= $(document).height()) {
        $("footer").css("position", "static")
    } else {
        $("footer").css("position", "fixed")
    }
}