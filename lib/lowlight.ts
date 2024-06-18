import { createLowlight } from "lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import cpp from "highlight.js/lib/languages/cpp";
import cs from "highlight.js/lib/languages/csharp";
import php from "highlight.js/lib/languages/php";
import python from "highlight.js/lib/languages/python";
import ruby from "highlight.js/lib/languages/ruby";
import elixir from "highlight.js/lib/languages/elixir";
import c from "highlight.js/lib/languages/c";
import plaintext from "highlight.js/lib/languages/plaintext";

declare global {
  var lowlight: ReturnType<typeof createLowlight>;
}

let lowlight = globalThis.lowlight;
if (!lowlight) {
  lowlight = createLowlight();
  lowlight.register("html", html);
  lowlight.register("css", css);
  lowlight.register("javascript", js);
  lowlight.register("typescript", ts);
  lowlight.register("cpp", cpp);
  lowlight.register("python", python);
  lowlight.register("elixir", elixir);
  lowlight.register("ruby", ruby);
  lowlight.register("c", c);
  lowlight.register("php", php);
  lowlight.register("csharp", cs);
  lowlight.register("plaintext", plaintext);
}
if (process.env.NODE_ENV !== "production") globalThis.lowlight = lowlight;
export default lowlight;
