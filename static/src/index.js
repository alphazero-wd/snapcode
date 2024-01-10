const hiddenEditorEl = document.getElementById("hidden-editor");
const sidebar = document.getElementById("sidebar");
if (!sidebar) document.getElementById("sidebar-btn").remove();
const editorEl = document.getElementById("editor");
const langSelect = document.getElementById("lang-select");

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

if (langSelect)
  langSelect.addEventListener("change", (e) => setLanguage(e.target));

window.addEventListener("load", () => {
  editor.setValue(hiddenEditorEl.value);
  setLanguage(langSelect);
});

const editSnippetForm = document.getElementById("edit-snippet-form");
const createSnippetForm = document.getElementById("create-snippet-form");
const updateSnippetEditor = () => {
  hiddenEditorEl.value = editor.getValue();
};

if (editSnippetForm)
  editSnippetForm.addEventListener("submit", updateSnippetEditor);

if (createSnippetForm)
  createSnippetForm.addEventListener("submit", updateSnippetEditor);

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

const fileInput = document.getElementById("file-input");
if (fileInput)
  fileInput.addEventListener("change", (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      const displayFile = (event) => {
        langSelect.value =
          extensionConverter[file.name.split(".").at(-1)] || "Text File";
        setLanguage(langSelect);
        hiddenEditorEl.value = event.target.result;
        editor.setValue(event.target.result);
      };

      const onReaderLoad = () => displayFile;
      reader.onload = onReaderLoad(file);
      reader.readAsText(file);
    }
  });

const sortBy = document.getElementById("sort_by");
sortBy.addEventListener("change", () => {
  sortBy.parentElement.submit();
});
