var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

var mainImage = $('.main-image');
var listImage = $$('.list-image img');
var wrapListImage = $$('.list-image div');
var btnPrev = $('.btn-prev');
var btnNext = $('.btn-next');
var currentIndex = 0;
var angle = 360 / wrapListImage.length;
var radius = 300; // Adjust this value to change the radius of the circle

var autoChangeInterval = null;
const autoChangeDelay = 3000; // 5 seconds

function updateImage(index) {
    currentIndex = index;
    // Set background image for mainImage
    mainImage.style.backgroundImage = `url("${listImage[currentIndex].getAttribute('src')}")`;
    wrapListImage.forEach((wrap, i) => {
        var img = wrap.querySelector('img'); // Lấy phần tử con img trong mỗi phần tử div của wrapListImage
        wrap.style.transform = `rotateY(${i * angle - currentIndex * angle}deg) translateZ(${radius}px)`;
        img.style.opacity = i === currentIndex ? 1 : 0.6;
    });
}

listImage.forEach((element, index) => {
    element.addEventListener('click', event => {
        updateImage(index);
        resetAutoChange(); // Reset auto change interval when user interacts with images
    });
});

btnNext.addEventListener('click', event => {
    currentIndex = (currentIndex < wrapListImage.length - 1) ? currentIndex + 1 : 0;
    updateImage(currentIndex);
    resetAutoChange(); // Reset auto change interval when user interacts with buttons
});

btnPrev.addEventListener('click', event => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : wrapListImage.length - 1;
    updateImage(currentIndex);
    resetAutoChange(); // Reset auto change interval when user interacts with buttons
});

// Function to start auto change interval
function startAutoChange() {
    autoChangeInterval = setInterval(() => {
        currentIndex = (currentIndex < wrapListImage.length - 1) ? currentIndex + 1 : 0;
        updateImage(currentIndex);
    }, autoChangeDelay);
}

// Function to reset auto change interval
function resetAutoChange() {
    clearInterval(autoChangeInterval);
    startAutoChange();
}

// Initial display
updateImage(currentIndex);
startAutoChange(); // Start auto change interval initially

// Adjust the size and position of images based on main-image size
window.addEventListener('resize', () => {
    var mainImageRect = mainImage.getBoundingClientRect();
    radius = mainImageRect.width / 2; // Adjust the radius based on the size of main-image
    updateImage(currentIndex);
});
