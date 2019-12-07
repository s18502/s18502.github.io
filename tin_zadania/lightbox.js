function initLightbox() {
    let photos = document.querySelectorAll(".lightbox > li");

    for (let photo of photos) {
        photo.addEventListener("click", photoClickedHandler);
    }
}

function createButton(text, btnClass, listener) {
    let btn = document.createElement("button");
    btn.innerText = text;
    btn.classList.add('lb-nav');
    btn.classList.add(btnClass);
    btn.addEventListener("click", listener);

    return btn;
}

function clickOutsideHandler(event) {

    var specifiedElement = document.getElementById('overlay-container');
    if (!specifiedElement) return;

    var isClickInside = specifiedElement.contains(event.target);

    if (!isClickInside) {
        var actives = document.querySelectorAll(".lightbox > li.active");
        for (let a of actives) {
            a.classList.remove('active');
        }

        var elem = document.getElementById('lightbox-overlay');
        elem.parentNode.removeChild(elem);
        //the click was outside the specifiedElement, do something
    }
}

function photoClickedHandler(e) {
    let overlayDiv = document.createElement("div");
    overlayDiv.id = "lightbox-overlay";

    let containerDiv = document.createElement("div");
    containerDiv.id = 'overlay-container';

    let firstRow = document.createElement("div");
    let imgElement = document.createElement("img");
    imgElement.id = "lightbox-current-photo";
    imgElement.src = this.querySelector("img").src;
    firstRow.appendChild(imgElement);

    let secondRow = document.createElement("div");
    let backBtn = createButton("←", "lb-go-back", goBack);
    let forwardBtn = createButton("→", "lb-go-forward", goForward);
    secondRow.appendChild(backBtn);
    secondRow.appendChild(forwardBtn);

    containerDiv.appendChild(firstRow);
    containerDiv.appendChild(secondRow);

    overlayDiv.appendChild(containerDiv);

    document.body.appendChild(overlayDiv);

    if (this.classList.contains('active')) {
        this.classList.remove('active');
    } else {
        this.classList.add('active');
    }

    overlayDiv.addEventListener('click', clickOutsideHandler);
}

function goBack() {
    let allItems = Array.from(document.querySelectorAll(".lightbox > li"));
    console.log(allItems);
    let activeItem = document.querySelector(".lightbox > li.active");
    let idx = allItems.indexOf(activeItem);
    if (idx === 0) { return; }

    var overlay = document.getElementById('lightbox-current-photo');
    let newActive = allItems[idx - 1];
    console.log(newActive);
    overlay.src = newActive.querySelector("img").src;

    activeItem.classList.remove('active');
    newActive.classList.add('active');
    console.log(newActive)
}


function goForward() {
    let allItems = Array.from(document.querySelectorAll(".lightbox > li"));

    let activeItem = document.querySelector(".lightbox > li.active");
    let idx = allItems.indexOf(activeItem);
    if (idx === (allItems.length - 1)) { return; }

    var overlay = document.getElementById('lightbox-current-photo');
    let newActive = allItems[idx + 1];
    console.log(newActive);
    overlay.src = newActive.querySelector("img").src;

    activeItem.classList.remove('active');
    newActive.classList.add('active');
}

initLightbox();