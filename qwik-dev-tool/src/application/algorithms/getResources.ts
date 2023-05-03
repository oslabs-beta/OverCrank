import { MutableRefObject, Dispatch, SetStateAction } from "react";
import { Links, Resource, HarLogEntry, MetricsNode} from "../types/types";
import getDOM from './getHtml'
import { debounce } from "./debounce";

declare const chrome: any

const waitForDom = debounce(getDOM, 1200);

const domAndLog = async (unassignedLog: MutableRefObject<MetricsNode>, setDOM: Dispatch<SetStateAction<Document | null>>) => {
  let temp = {...unassignedLog.current}
  await chrome.devtools.network.getHAR((harLog: {entries: HarLogEntry[]}): void => {
    console.log(harLog)
    harLog.entries.forEach(entry => {
      entry.request.headers.forEach(el => {
        if (el.name === 'Referer') {
          temp = handleNested(el.value, entry.request.url, temp)
        }
      })
    })
    console.log('ASSIGNING', temp, 'to ref', unassignedLog)
    unassignedLog.current = {...temp}
    console.log('ASSIGNED', temp, 'to ref', unassignedLog, 'DONE')
  });
  getDOM(setDOM);
}

const waitForDomAndLog = debounce(domAndLog, 1500)

const handleNested = (ref:string, url: string, current: MetricsNode): MetricsNode => {
  if (current.name === url) return current
  if (current.name === ref) {
    if (!current.children.filter(el => el.name === url).length) {
      current.children.push({name: url, children: []})
      //console.log(current)
      return current;
    }
  } else if (current.children.length) {
    current.children = current.children.map(el => handleNested(ref, url, el))
    return current
  }
  //console.log('return from nested', current)
  return current
}

// const assignLog = (entry: HarLogEntry, temp: MetricsNode) => {
//   entry.request.headers.forEach(el => {
//     if (el.name === 'Referer') {
//       console.log(el, entry.request.url)
//       return handleNested(entry.request.url, temp)
//     }
//   })
// }

const assign = (url: string, content: string, unassigned: MutableRefObject<Links>):void => {
  chrome.devtools.network.getHAR((harLog: {entries: HarLogEntry[]}): void => {
    for (let i = 0; i < harLog.entries.length; i++) {
      if (harLog.entries[i].request.url === url) {
        const shortenedURL = url.slice(url.indexOf('/src'))
        const trimmedContent = content.slice(0, content.indexOf('//# sourceMappingURL'))
        const finishedDateTime = (new Date(Date.parse(harLog.entries[i].startedDateTime) + harLog.entries[i].time)).toISOString();
        unassigned.current = {
          ...unassigned.current,
          [shortenedURL]: {
            action: null,
            operation: trimmedContent,
            metrics: {
              size: `${harLog.entries[i].response.content.size / 8000} kb`,
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
            }
          }
        }
        // break;
      }
    }
  })
}

export const getResources = (unassigned: MutableRefObject<Links>, unassignedLog: MutableRefObject<MetricsNode>, setDOM: Dispatch<SetStateAction<Document | null>>) => {
  chrome.devtools.inspectedWindow.onResourceAdded.addListener(
    async (resource: Resource) => {
      if (
        resource.url.includes('localhost:5173/src/') &&
        !resource.url.includes('sourcemap')
      ) {
        await resource.getContent((content, encoding) => assign(resource.url, content, unassigned))
        // await chrome.devtools.network.getHAR((harLog: {entries: HarLogEntry[]}): void => {
        //   console.log(harLog)
        //   harLog.entries.forEach(el => assignLog(el, unassignedLog))
        // });
        // waitForDom(setDOM);
        // waitForDomAndLog(unassignedLog, setDOM)
        waitForDomAndLog(unassignedLog, setDOM)
      }
    }
  );
};