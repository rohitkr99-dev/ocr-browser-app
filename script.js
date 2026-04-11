const dropZone = document.querySelector(".drop-zone");

dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.style.background = "rgba(255,255,255,0.1)";
});

dropZone.addEventListener("dragleave", () => {
    dropZone.style.background = "transparent";
});

dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    document.getElementById("fileInput").files = e.dataTransfer.files;
    dropZone.style.background = "transparent";
});
