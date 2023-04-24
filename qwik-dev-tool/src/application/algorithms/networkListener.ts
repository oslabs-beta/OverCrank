// Query & Attach debugger to current tab
import { Dispatch, SetStateAction } from 'react';
import { NodeData, Links } from '../types/types';

type resultInfo = {
  attached: boolean,
  extensionId?: string,
  faviconUrl?: string,
  id: string,
  tabId?: number,
  title: string,
  type: 'page' | 'background_page' | 'worker' | 'other',
  url: string
}

declare const chrome: any;

const networkListener = (
  unassigned: Links,
  setUnassigned: Dispatch<SetStateAction<Links>>,
  nodeData: NodeData,
  setNodeData: Dispatch<SetStateAction<NodeData>>
): void => {
 chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
    const tab = tabs[0]?.id;
   
    //  await chrome.debugger.getTargets((result: resultInfo[]) => {
    //   result.forEach(el => {
    //     if (el.tabId) {
    //       if (tab === el.tabId && el.attached === true) {
    //         chrome.debugger.detach({tabId: tab})
    //         console.log('detached')
    //       }
    //     }
    //   })
    // })
    chrome.debugger.attach({ tabId: tab }, '1.2',  () => {
      chrome.debugger.sendCommand({ tabId: tab }, 'Debugger.enable', {}, () => {
        chrome.debugger.onEvent.addListener(
          async (source: any, method: any, params: any) => {
            // Everytime a script is parsed:

            // Decode and parse
            const base64data = params.sourceMapURL?.split('base64,')?.[1];
            const decodedData = base64data && atob(base64data);
            const parsedData = decodedData && JSON.parse(decodedData);
            const JSContent = parsedData?.sourcesContent?.[0];
            const url: string = params.url ?? '';

            // Fetch URL then store readable stream in fetchData var
            let fetchData: string;
            fetch(url)
              .then((response: Response) => {
                if (!response.body) {
                  throw new Error('Response has no body');
                }
                // lock reader to stream
                const reader = response.body.getReader();
                let fetchData: string;
                async function readStream() {
                  while (true) {
                    // read stream chunks to value var
                    const { done, value } = await reader.read();
                    if (done) {
                      return fetchData;
                    }
                    // decode string from value buffer
                    fetchData = new TextDecoder().decode(value);
                  }
                }
                // Get metric data
                chrome.devtools.network.getHAR((harLog: any) => {
                  for (const entry of harLog.entries) {
                    const url = entry.request.url;
                  }
                });
                // invoke helper
                return readStream();
              })
              .catch((error) => console.error(error));
            // Check nodeData state for URL, then store fetchData appropriatly
            // console.log(url)
            // const shortened = url.slice(url.indexOf('/src'))
            // console.log(shortened, fetchData, 'fetchData')
            // let found = false;
            // console.log(nodeData, 'in listener')
            // if (Object.keys(nodeData).length) {
            //   for (const key in nodeData) {
            //     if (nodeData[key].events[shortened]) {
            //       console.log('exists', fetchData)
            //       const nodeDataCopy = { ...nodeData };
            //       nodeDataCopy[key].events[shortened] = {
            //         action: nodeDataCopy[key].events[shortened].action,
            //         operation: fetchData,
            //       }
            //       setNodeData(nodeDataCopy);
            //       found = true;
            //     }
            //   }
            // }
            // if (!found) {
            //   const unassignedCopy = { ...unassigned };
            //   unassignedCopy[shortened] = {
            //     action: null,
            //     operation: fetchData
            //   }
            //   setUnassigned(unassignedCopy);
            // }
          }
        );
        // }
        // );
      });
    });
  });
};

export default networkListener;
