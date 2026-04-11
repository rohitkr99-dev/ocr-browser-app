async function processPDF() {
    const file = document.getElementById('fileInput').files[0];
    if (!file) return alert("Upload a PDF first");

    const button = document.getElementById("extractBtn");
    button.disabled = true;

    document.getElementById("status").innerText = "Processing...";

    const reader = new FileReader();

    reader.onload = async function () {
        const typedArray = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;

        let fullText = "";

        for (let i = 1; i <= pdf.numPages; i++) {

            const percent = Math.round((i / pdf.numPages) * 100);
            document.getElementById("progress").style.width = percent + "%";
            document.getElementById("status").innerText = "Processing page " + i;

            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 2 });

            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            await page.render({ canvasContext: context, viewport: viewport }).promise;

            const imageData = canvas.toDataURL("image/png");

            const { data: { text } } = await Tesseract.recognize(imageData, 'eng');

            fullText += text + "\n\n";
        }

        document.getElementById("output").value = fullText;
        document.getElementById("status").innerText = "Done!";
        button.disabled = false;
    };

    reader.readAsArrayBuffer(file);
}
