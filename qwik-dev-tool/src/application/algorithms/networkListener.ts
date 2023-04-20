// const TESTnodeData = {
//   0: {
//     events: {
//       'http://localhost:5173/src/counter_component_div_button_onclick_1_lkcvrojx09y.js': `import { useLexicalScope } from "/node_modules/@builder.io/qwik/core.mjs?v=6b027d1f";
// export const counter_component_div_button_onClick_1_LkCVrojX09Y = ()=>{
//     const [count] = useLexicalScope();
//     return count.value++;
// };
// `,
//     },
//   },
//   1: { events: {} },
// };

// Query & Attach debugger to current tab
const networkListener = () =>
  // unassignedList: any,
  // unassignedListSetter: any,
  // nodeData: any,
  // nodeDataSetter: any
  {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0]?.id;
      chrome.debugger.attach({ tabId: tab }, '1.2', () => {
        chrome.debugger.sendCommand(
          { tabId: tab },
          'Debugger.enable',
          {},
          () => {
            // chrome.debugger.sendCommand(
            //   { tabId: tab },
            //   'Network.enable',
            //   {},
            //   () => {
            chrome.debugger.onEvent.addListener(
              (source: any, method: any, params: any) => {
                // Everytime a script is parsed:

                // Decode and parse
                const base64data = params.sourceMapURL?.split('base64,')?.[1];
                const decodedData = base64data && atob(base64data);
                const parsedData = decodedData && JSON.parse(decodedData);
                const JSContent = parsedData?.sourcesContent?.[0];
                const url = params.url ?? '';

                // Fetch URL then store readable stream in fetchData var
                let fetchData;
                fetch(url)
                  .then((response: Response) => {
                    if (!response.body) {
                      throw new Error('Response has no body');
                    }
                    // lock reader to stream
                    const reader = response.body.getReader();

                    async function readStream() {
                      while (true) {
                        // read stream chunks to value var
                        const { done, value } = await reader.read();
                        if (done) {
                          console.log('Finished reading stream');
                          return;
                        }

                        // decode string from value buffer
                        fetchData = new TextDecoder().decode(value);
                      }
                    }
                    // Get metric data
                    chrome.devtools.network.getHAR((harLog) => {
                      for (const entry of harLog.entries) {
                        const url = entry.request.url;
                        console.log(`Request URL: ${url}`);
                        console.log('Timing Metrics:', entry);
                        console.log('JSContent:', JSContent);
                        // console.log("FetchData:", fetchData);
                      }
                    });
                    // invoke helper
                    return readStream();
                  })
                  .catch((error) => console.error(error));

                // Check nodeData state for URL, then store fetchData appropriatly
                // let found = false;
                // for (const key in nodeData) {
                //   if (nodeData[key].events?.[url] === null) {
                //     const nodeDataCopy = { ...nodeData };
                //     nodeDataCopy[key].events[url] = fetchData;
                //     nodeDataSetter(nodeDataCopy);
                //     found = true;
                //   }
                // }
                // if (!found) {
                //   const unassignedCopy = { ...unassignedList };
                //   unassignedCopy[url] = fetchData;
                //   unassignedListSetter(unassignedCopy);
                // }
              }
            );
            // }
            // );
          }
        );
      });
    });
  };

export default networkListener;
