import React, { useState, useEffect, PropsWithChildren, useRef } from 'react';
import networkListener from './algorithms/networkListener';
import buildTree from './algorithms/parseHtml';
import getDOM from './algorithms/getHtml';
import { NodeData, Links, Resource } from './types/types';
import TopBar from './components/TopBar';
import TreeViewContainer from './containers/TreeViewContainer';
import DataViewContainer from './containers/DataViewContainer';
declare const chrome: any;
const App = () => {
  const [nodeData, setNodeData] = useState<NodeData>({});
  const [tree, setTree] = useState<JSX.Element | null>(null);
  const [unassigned, setUnassigned] = useState<Links>({});
  const [currentNode, setCurrentNode] = useState<number>(0);
  const [dom, setDom] = useState<Document | null>(null);
  const tempUnassigned = useRef<Links>({})

  const getResources = () => {
    chrome.devtools.inspectedWindow.onResourceAdded.addListener(
      (resource: Resource) => {
        if (
          resource.url.includes('localhost:5173/src/') &&
          !resource.url.includes('sourcemap')
        ) {
          resource.getContent((content, encoding) => assign(resource.url, content))
          waitForDom(setDom);
        }
      }
    );
  };
  const assign = (url: string, content: string):void => {
    const shortenedURL = url.slice(url.indexOf('/src'))
    const trimmedContent = content.slice(0, content.indexOf('//# sourceMappingURL'))
    tempUnassigned.current = {
      ...tempUnassigned.current,
      [shortenedURL]: {
        action: null,
        operation: trimmedContent
      }
    }
  }

  const debounce: any = (func: any, delay: number) => {
    let debounceTimer: any;
    return (...args: any) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const waitForDom = debounce(getDOM, 2000);

  useEffect(() => {
    getDOM(setDom);
    getResources();
  }, []);
  useEffect(() => {
    // call dom parser
    (async () => {
      if (dom) {
        console.log('fired');
        buildTree(
          dom,
          tempUnassigned.current,
          setUnassigned,
          nodeData,
          setNodeData,
          setTree
        );
        // networkListener(unassigned, setUnassigned, nodeData, setNodeData)
      }
    })();
  }, [dom]);

  return tree && nodeData ? (
    <>
      <div className="min-h-screen first-letter:max-w-4xl bg-black">
        <TopBar></TopBar>
        <div className="flex flex-row min-h-full">
          <TreeViewContainer
            tree={tree}
            nodeData={nodeData}
            setCurrentNode={setCurrentNode}
          ></TreeViewContainer>
          <DataViewContainer
            nodeData={nodeData}
            currentNode={currentNode}
          ></DataViewContainer>
        </div>
      </div>
    </>
  ) : (
    <>
      <TopBar></TopBar>
      <div className="flex flex-row min-h-full">
        <TreeViewContainer
          tree={tree}
          nodeData={nodeData}
          setCurrentNode={setCurrentNode}
        ></TreeViewContainer>
        <DataViewContainer
          nodeData={nodeData}
          currentNode={currentNode}
        ></DataViewContainer>
      </div>
    </>
  );
};

export default App;
