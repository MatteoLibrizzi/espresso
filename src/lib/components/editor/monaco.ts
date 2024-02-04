import * as monaco from "monaco-editor";

// Import the workers in a production-safe way.
// This is different than in Monaco's documentation for Vite,
// but avoids a weird error ("Unexpected usage") at runtime
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import { Registry } from "monaco-textmate"; // import the Registry class from monaco-textmate
import { wireTmGrammars } from "monaco-editor-textmate"; // import the wireTmGrammars function
import * as pythonGrammar from "./MagicPython.tmLanguage.json";
// import * as darkTheme from "./vs-dark-plus-theme.json";

self.MonacoEnvironment = {
  getWorker: function (_: string, label: string) {
    switch (label) {
      case "json":
        return new jsonWorker();
      // case "python":
      //     return new pythonWorker();
      case "typescript":
      case "javascript":
        return new tsWorker();
      default:
        return new editorWorker();
    }
  },
};

// create a new registry
const registry = new Registry({
  getGrammarDefinition: async (scopeName: any) => {
    switch (scopeName) {
      case "source.python":
        return {
          format: "json",
          content: await (await fetch("./MagicPython.tmLanguage.json")).text(),
        };
      default:
        throw Error("Language not supported");
    }
  },
});

// // fetch the dark theme
// fetch("./vs-dark-plus-theme.json")
//     .then((data) => data.json())
//     .then((data) => {
//         monaco.editor.defineTheme("vs-dark-plus", data);
//         monaco.editor.setTheme("vs-dark-plus");

//         // map of monaco "language id's" to TextMate scopeNames
//         const grammars = new Map();
//         grammars.set("python", "source.python");

//         wireTmGrammars(monaco, registry, grammars, editor);
//     });
export default monaco;
