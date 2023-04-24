import React, {
  useState,
  useEffect,
  PropsWithChildren,
  useRef,
  MutableRefObject,
} from "react";
import networkListener from "./algorithms/networkListener";
import buildTree from "./algorithms/parseHtml";
import getDOM from "./algorithms/getHtml";
import { getResources } from "./algorithms/getResources";
import { NodeData, Links, Resource } from "./types/types";
import TopBar from "./components/TopBar";
import TreeViewContainer from "./containers/TreeViewContainer";
import DataViewContainer from "./containers/DataViewContainer";
declare const chrome: any;
const App = () => {
  const [nodeData, setNodeData] = useState<NodeData>({});
  const [tree, setTree] = useState<JSX.Element | null>(null);
  const [currentNode, setCurrentNode] = useState<number>(0);
  const [dom, setDOM] = useState<Document | null>(null);
  const unassigned = useRef<Links>({});

  useEffect(() => {
    getDOM(setDOM);
    getResources(unassigned, setDOM);
  }, []);
  useEffect(() => {
    // call dom parser
    (async () => {
      if (dom) {
        console.log("fired");
        buildTree(dom, unassigned.current, nodeData, setNodeData, setTree);
      }
    })();
  }, [dom]);

  return (
    <>
      <div className="min-h-500px first-letter:max-w-4xl bg-black">
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
  );
};

export default App;
