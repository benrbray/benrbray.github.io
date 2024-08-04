import type { JSX } from "solid-js/jsx-runtime";

const getHostFromUrl = (url: string): string => {
  return new URL(url).hostname.replace("www.", "");
};

const isAbsoluteUrl = (url: string): boolean => {
  const formatedUrl = url.toLowerCase();
  return formatedUrl.startsWith("http") || formatedUrl.startsWith("https");
};

export const isUrlExternal = (url: string, host: string): boolean => {
  if (isAbsoluteUrl(url)) {
    const providedHost = getHostFromUrl(url);

    return providedHost !== host;
  } else {
    return false;
  }
};

// const ExternalIcon = () => {
//   return <span style="position: relative; margin-left: 0.2em; vertical-align: bottom; text-align: center;">
//     <svg
//       xmlns="http://www.w3.org/2000/svg" 
//       width="14" height="14" viewBox="0 0 24 24"
//       fill="none" stroke="currentColor"
//       stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
//     >
//       <g fill="none" fill-rule="evenodd">
//       <path d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5M15 3h6v6M10 14L20.2 3.8"/>
//       </g>
//     </svg>
//   </span>;
// };

export const MarkdownLink = (props: JSX.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  // TODO detect if link is internal or external
  if(isAbsoluteUrl(props.href!)) {
    // return <span><a {...props} />&#8205;<ExternalIcon /></span>
    return <a {...props} />
  } else {
    return <a {...props} />
  }
}