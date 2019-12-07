function initAccordion() {
    let accoridons = document.querySelectorAll(".accordion > li > a");
    console.log(accoridons);

    for (let a of accoridons) {
        a.addEventListener("click", accordionToggleHandler);
    }
}

function accordionToggleHandler() {
    let parent = this.parentElement;

    if (parent.classList.contains('active')) {
        parent.classList.remove('active');
    } else {
        parent.classList.add('active');
    }

}

initAccordion();