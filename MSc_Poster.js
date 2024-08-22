// URL of the PDF file
const url = './MSc_RAS/MSc_Poster.pdf';  // Replace with the path to PDF file

// PDF.js setup
const pdfjsLib = window['pdfjsLib'];

// Asynchronous download of PDF
const loadingTask = pdfjsLib.getDocument(url);
loadingTask.promise.then(function(pdf) {
    console.log('PDF loaded');

    // Fetch the first page
    pdf.getPage(1).then(function(page) {
        console.log('Page loaded');

        const scale = 1.5;
        const viewport = page.getViewport({ scale: scale });

        // Prepare canvas using PDF page dimensions
        const canvas = document.getElementById('pdf-render');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context
        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        const renderTask = page.render(renderContext);
        renderTask.promise.then(function () {
            console.log('Page rendered');
        });
    });
}, function (reason) {
    // PDF loading error
    console.error(reason);
});