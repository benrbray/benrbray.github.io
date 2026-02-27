/** @jsxImportSource hastscript */

import type { Root, Element as HastElement, ElementContent, RootContent} from "hast";
import { toText } from "hast-util-to-text";
import type { VFile } from "vfile";

import { CONTINUE, SKIP, visitParents, type VisitorResult } from 'unist-util-visit-parents';
import { execSync, execFile, spawn, spawnSync } from "child_process";

////////////////////////////////////////////////////////////////////////////////

export type RehypeWrapSectionsOptions = { 
  
}

type RehypeWrapSectionsConfig = {
  
}

/**
 * Convert the user-friendly `RehypeWrapSectionsOptions` into a more explicit config
 * object.  The main difference is that any missing _options_ must be filled
 * in with a default value to create a _config_.
 *
 * This distinction between _options_ and _config_ allows for the package API
 * to change without breaking the implementation, and vice-versa.
 */
const optionsToConfig = (options: RehypeWrapSectionsOptions): RehypeWrapSectionsConfig => {
  return options;
}

////////////////////////////////////////////////////////////////////////////////

export function rehypeWrapSections(options: RehypeWrapSectionsOptions) {

  let config = optionsToConfig(options);
  return runRehypeWrapSections(config);
}

export default rehypeWrapSections;


const splitArray = <A>(
  array: A[],
  splitPredicate: (a:A) => { split: boolean, keep: boolean }
): A[][] => {
  let result: A[][] = [];

  let chunk: A[] = [];
  
  for(let a of array) {
    const filter = splitPredicate(a);
    if(filter.split) {
      result.push(chunk);
      chunk = [];
    }

    if(!filter.split || filter.keep) {
      chunk.push(a);
    }
  }

  if(chunk.length > 0) {
    result.push(chunk);
  }

  return result;
}

const toElementContent = (rc: RootContent): ElementContent => {
  if(rc.type === "doctype") {
    // our hast trees will always be fragments, so we do not handle doctype elements from RootContent
    throw new Error("rehype-wrap-sections not implemented when hast tree contains doctype element!!!")
  }

  return rc;
}


const runRehypeWrapSections = (config: RehypeWrapSectionsConfig) => {

  // const processTypst = (t: TypstElement): void => {
  //   console.log(`found typst! ${toText(t.scope)}`)
    
  //   const typstSource = toText(t.scope);
  //   const resultSvgBlob = compileTypst(typstSource);

  //   const result: HastElement = {
  //     type: "element",
  //     properties: {
  //       "src": resultSvgBlob
  //     },
  //     tagName: "img",
  //     children: []
  //   }

  //   const index = t.parent.children.indexOf(t.scope);
  //   t.parent.children.splice(index, 1, result);
  // }

  // [a] -> (a -> [])

  /* ---- transform ------------------------------------- */

  console.log("\n\nrehype-typst!\n\n")

  return function(tree: Root, _file: VFile): undefined {
    // the RootContent type includes <doctype> elements, but our markdown files
    // will always be fragments containing only ElementContent, so throw an
    // error if any <doctype> elements are present
    const children: ElementContent[] = tree.children.map(toElementContent);

    // split on horizontal rules
    const chunks = splitArray(children, content => {
      const split = (content.type == "element" && content.tagName == "hr");
      return { split: split, keep: !split }
    })
    
    // wrap each chunk in a div
    const wrapped: RootContent[] = chunks.map(chunk => {
      return {
        type: "element",
        tagName: "div",
        properties: {
          "class" : "markdown-chunk"
        },
        children: chunk
      }
    })

    tree.children = wrapped;

    // // traverse the hast syntax tree, collecting all typst elements
    // let typstElements: TypstElement[] = [];

    
    // visitParents(tree, "element", (element, parents): VisitorResult => {
    //   // look for citation `hast` nodes produced by `remark-cite`
    //   const typstElement = visitCitations(element, parents);
    //   if(typstElement !== null) {
    //     typstElements.push(typstElement);
    //     return SKIP;
    //   } else {
    //     return CONTINUE;
    //   }
    // });

    // // render typst elements
    // typstElements.forEach(t => {
    //   processTypst(t);
    // });
  }
}