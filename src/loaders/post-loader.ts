import { glob, type Loader, type LoaderContext, type ParseDataOptions } from "astro/loaders";
import { z } from "astro:content";
import type { RenderedContent } from "node_modules/astro/dist/content/data-store";

// TODO: this is incomplete
// I want to wrap glob() to attach rendered markdown summaryDisplay and titleDisplay field to each post
//  without rewriting from scratch
// TODO: use astro-loader-gather?
// https://github.com/dustinlacewell/astro-loader-gather/blob/main/glob.ts

// the following is based on
// https://stackoverflow.com/a/79302578

export function postLoader(
  options: {
    /* custom config here */
    pattern: string,
    base: string
  }
) {
  let globLoader = glob({ pattern: options.pattern, base: options.base });
  
  return {
    name: "post-loader",
    // called when updating the collection
    load: async (context: LoaderContext): Promise<void> => {
      globLoader.load({
        ...context,
        parseData: async <TData extends Record<string, unknown>>(
          entry: ParseDataOptions<TData>
        ): Promise<TData> => {
          let summaryDisplay: RenderedContent|null = null;
          if(entry.data["summary"]) {
            summaryDisplay = await context.renderMarkdown(entry.data["summary"] as string);
          }

          const parsed = await context.parseData<TData>(entry);

          return {
            ...parsed,
            ...(summaryDisplay && { summaryDisplay })
          };
        } 
      })
    }
    // optionally, define the schema of an entry
    // schema: async () => z.object({})
  }
}