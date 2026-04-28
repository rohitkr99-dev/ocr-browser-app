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

const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("fileInput");
const fileName = document.getElementById("fileName");

dropZone.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", () => {
  if (fileInput.files.length) {
    fileName.textContent = fileInput.files[0].name;
  }
});

/* Drag Effects */
dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.classList.add("active");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("active");
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.classList.remove("active");
  fileInput.files = e.dataTransfer.files;
  fileName.textContent = fileInput.files[0].name;
});

/* Button Loading State */
function startLoading() {
  document.getElementById("extractBtn").disabled = true;
  document.getElementById("btnText").textContent = "Processing...";
  document.querySelector(".spinner").classList.remove("hidden");
}

function stopLoading() {
  document.getElementById("extractBtn").disabled = false;
  document.getElementById("btnText").textContent = "Extract Text";
  document.querySelector(".spinner").classList.add("hidden");
}
