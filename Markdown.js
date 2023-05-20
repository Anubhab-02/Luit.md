

var scientificEditor = new SimpleMDE({
    element: document.getElementById("scientific-editor"),
    renderingConfig: {
        codeSyntaxHighlighting: true,
    },
});

var md = window.markdownit({
    html: true,
    linkify: true,
    typographer: true,
});

md.use(window.markdownitMathjax());

function render() {
    var text = scientificEditor.value();
    var result = md.render(text);
    var A4 = document.getElementById("A4");
    A4.innerHTML = result;
    MathJax.typesetPromise([A4]);
}


async function saveAs() {
    const options = {
        suggestedName: 'notes.md',
        startIn: 'desktop',
        // suggestedDirectory: 'documents'
    };
    var text = scientificEditor.value();
    const handle = await window.showSaveFilePicker(options);
    const writable = await handle.createWritable();
    await writable.write(text);
    await writable.close();
}


function openFile(event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function () {
        var text = reader.result;
        scientificEditor.value(text);
    };
    reader.readAsText(input.files[0]);
}



function exportAsHTML() {
    const text = scientificEditor.value();
    const result = md.render(text);
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
     body{
        font-size:18px;
        font-family:'Arial';
        padding-top:3rem;
        padding-bottom:2rem;
        position:absolute;
        left:50%;
        transform:translateX(-50%);
}
     }
     
    table {
    border-collapse: collapse;
    margin-bottom: 1em;
    width: 100%;
    }

    th,
    td {
    border: 1px solid #ddd;
    padding: 0.5em;
    text-align: left;
    }

    th {
    background-color: #f2f2f2;
    font-weight: bold;
    }

    blockquote{
    color: rgb(141, 141, 141);
    padding-left: 1em;
    }

    ul{
    padding-left: 2rem;
    }

    </style>
    </head>
    <body>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
    <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
    ${result}
    </body>
    </html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Luit.html';
    a.click();
}







function toggleClass() {
    var output = document.getElementById("Renderer");
    output.classList.toggle("read");

    var editor = document.getElementById("editor");
    editor.classList.toggle("editor");
}




var button = document.getElementById("myButton");
button.addEventListener("click", function () {
    if (button.textContent === "Write") {
        button.textContent = "Read";
    } else {
        button.textContent = "Write";
    }
});























