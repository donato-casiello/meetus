document.addEventListener("DOMContentLoaded", () => {
    console.log("Base javascript loaded")
})

let textBtn = document.getElementById("textBtn")
textBtn.addEventListener("click", () => {
    console.log("Text btn clicked")
    window.open("/text/", "_self")
})

let videoBtn = document.getElementById("videoBtn")
videoBtn.addEventListener("click", () => {
    console.log("Video btn clicked")
    window.open("/video/", "_self")
})