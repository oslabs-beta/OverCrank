import { MutableRefObject, Dispatch, SetStateAction } from "react";
import { Links, Resource } from "../types/types";
import getDOM from './getHtml'
import { debounce } from "./debounce";

declare const chrome: any

const waitForDom = debounce(getDOM, 1500);

const assign = (url: string, content: string, unassigned: MutableRefObject<Links>):void => {
  const shortenedURL = url.slice(url.indexOf('/src'))
  const trimmedContent = content.slice(0, content.indexOf('//# sourceMappingURL'))
  unassigned.current = {
    ...unassigned.current,
    [shortenedURL]: {
      action: null,
      operation: trimmedContent
    }
  }
}

export const getResources = (unassigned: MutableRefObject<Links>, setDOM: Dispatch<SetStateAction<Document | null>>) => {
  chrome.devtools.inspectedWindow.onResourceAdded.addListener(
    async (resource: Resource) => {
      if (
        resource.url.includes('localhost:5173/src/') &&
        !resource.url.includes('sourcemap')
      ) {
        await resource.getContent((content, encoding) => assign(resource.url, content, unassigned))
        waitForDom(setDOM);
      }
    }
  );
};