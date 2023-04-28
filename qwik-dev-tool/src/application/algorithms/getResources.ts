import { MutableRefObject, Dispatch, SetStateAction } from 'react';
import { Links, Resource, HarLogEntry } from '../types/types';
import getDOM from './getHtml';
import { debounce } from './debounce';

declare const chrome: any;

const waitForDom = debounce(getDOM, 1000);

export const getResources = (
  unassigned: MutableRefObject<Links>,
  setDOM: Dispatch<SetStateAction<Document | null>>
) => {
  chrome.devtools.inspectedWindow.onResourceAdded.addListener(
    async (resource: Resource) => {
      console.log(
        'chrome.devtools.inspectedWindow.onResourceAdded.addListener() returns Resource:',
        resource
      );
      if (
        resource.url.includes('localhost:5173/src/') &&
        !resource.url.includes('sourcemap')
      ) {
        await resource.getContent((content, encoding) => {
          console.log("resource.getContent() returns content:", content)
          assign(resource.url, content, unassigned);
        });
        chrome.devtools.network.getHAR((harLog: object): void =>
          console.log("chrome.devtools.network.getHAR() returns harlog:",harLog)
        );
        waitForDom(setDOM);
      }
    }
  );
};

const assign = (
  url: string,
  content: string,
  unassigned: MutableRefObject<Links>
): void => {
  chrome.devtools.network.getHAR((harLog: { entries: HarLogEntry[] }): void => {
    for (let i = harLog.entries.length - 1; i >= 0; i--) {
      if (harLog.entries[i].request.url === url) {
        const shortenedURL = url.slice(url.indexOf('/src'));
        const trimmedContent = content.slice(
          0,
          content.indexOf('//# sourceMappingURL')
        );
        const finishedDateTime = new Date(
          Date.parse(harLog.entries[i].startedDateTime) + harLog.entries[i].time
        ).toISOString();
        unassigned.current = {
          ...unassigned.current,
          [shortenedURL]: {
            action: null,
            operation: trimmedContent,
            metrics: {
              size: `${harLog.entries[i].response.content.size / 8000}kb`,
              startedDateTime: harLog.entries[i].startedDateTime,
              finishedDateTime,
              time: harLog.entries[i].time,
              blocked: harLog.entries[i].timings.blocked,
              connect: harLog.entries[i].timings.connect,
              dns: harLog.entries[i].timings.dns,
              receive: harLog.entries[i].timings.receive,
              send: harLog.entries[i].timings.send,
              ssl: harLog.entries[i].timings.ssl,
              wait: harLog.entries[i].timings.wait,
            },
          },
        };
        break;
      }
    }
  });
};
