const hiddenEditorEl = document.getElementById("hidden-editor");
const sidebar = document.getElementById("sidebar");
if (!sidebar) document.getElementById("sidebar-btn").remove();
const editorEl = document.getElementById("editor");
const langSelect = document.getElementById("lang-select");

const descriptionData = document.getElementById("description-data");
if (descriptionData) descriptionData.innerHTML = descriptionData.textContent;
const editor = ace.edit(editorEl);
editor.setOptions({
  autoScrollEditorIntoView: true,
  copyWithEmptySelection: true,
  showPrintMargin: false,
});
const langsMap = {
  HTML5: "html",
  CSS3: "css",
  "C++": "c_cpp",
  C: "c_cpp",
  "Javascript React": "jsx",
  "Typescript React": "tsx",
  "C#": "csharp",
  "Text File": "text",
};
editor.setTheme("ace/theme/one_dark");

const setLanguage = (el) => {
  const mode = langsMap[el.value] || el.value.toLowerCase();
  editor.session.setMode("ace/mode/" + mode);
};
const setEditorValue = () => {
  hiddenEditorEl.value = editor.getValue();
};
langSelect.addEventListener("change", (e) => setLanguage(e.target));
window.addEventListener("load", () => {
  editor.setValue(hiddenEditorEl.value);
  setLanguage(langSelect);
});
editorEl.addEventListener("input", setEditorValue);
editorEl.addEventListener("paste", setEditorValue);

const extensionConverter = {
  exs: "Elixir",
  js: "Javascript",
  ts: "Typescript",
  html: "HTML5",
  css: "CSS3",
  jsx: "Javascript React",
  tsx: "Typescript React",
  cs: "C#",
  cpp: "C++",
  h: "C",
  c: "C",
};

const dropzone = document.getElementById("file-input");
dropzone.addEventListener("change", (e) => {
  const files = e.target.files;
  if (files.length > 0) {
    const file = files[0];
    const reader = new FileReader();
    console.log({ file });
    const display_file = (event) => {
      // set the contents of the <textarea>
      langSelect.value =
        extensionConverter[file.name.split(".")[1]] || "Text File";
      setLanguage(langSelect);
      hiddenEditorEl.value = event.target.result;
      editor.setValue(event.target.result);
    };

    const onReaderLoad = (f) => {
      console.info(". file reader load", f);
      return display_file; // a function
    };

    // Closure to capture the file information.
    reader.onload = onReaderLoad(file);

    // Read the file as text.
    reader.readAsText(file);
  }
});
