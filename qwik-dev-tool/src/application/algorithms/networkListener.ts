// Query & Attach debugger to current tab
const networkListener = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    console.log(tab);
    chrome.debugger.attach({ tabId: tab.id }, '1.2', () => {
      chrome.debugger.sendCommand(
        { tabId: tab.id },
        'Debugger.enable',
        {},
        () => {
          // Listen for the Debugger.scriptParsed event
          chrome.debugger.onEvent.addListener(
            (source: any, method: any, params: any) => {
              // console.log('method', method); // might not need if
              if (method === 'Debugger.scriptParsed') {
                console.log('Source:', source);
                console.log('Script Parsed:', params);

                const base64data = params.sourceMapURL.split('base64,')[1];
                // console.log('Base 64 String:', base64data);

                const decodedData = atob(base64data);
                console.log('Decoded Base 64 String', decodedData);
              }
            }
          );
        }
      );
    });
  });
};

export default networkListener;
