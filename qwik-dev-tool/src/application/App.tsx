import React, {useState, useEffect} from 'react';
import networkListener from './algorithms/networkListener';
import buildTree from './algorithms/parseHtml';
import getDOM from './algorithms/getHtml';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { NodeData, Links } from './types/types';
import TopBar from './components/TopBar';
import TreeViewContainer from './containers/TreeViewContainer';
import DataViewContainer from './containers/DataViewContainer';



const App = () => {
  const [nodeData, setNodeData] = useState<NodeData>({})
  const [tree, setTree] = useState<JSX.Element | null>(null)
  const [unassigned, setUnassigned] = useState<Links>({})
  const [currentNode, setCurrentNode] = useState<number>(0)

  useEffect(() => networkListener(), []) // feed network listener nodeData
  useEffect(() => {
    // call dom parser
    (async () => {
      const html:Document = await getDOM()
      buildTree(html, unassigned, setUnassigned, nodeData, setNodeData, setTree);
    })()
  }, [nodeData])

  if(import.meta.env.DEV) {
    return (
      <div className=' min-h-screen first-letter:max-w-4xl bg-black'>
        <TopBar></TopBar>
        <div className='flex flex-row min-h-full' >
          <TreeViewContainer tree={tree}></TreeViewContainer>
          <DataViewContainer></DataViewContainer>
        </div>
      </div>
    ); 
  } else {
    return (
      <>
        <TopBar></TopBar>
        <div className='flex flex-row min-h-full' >
          <TreeViewContainer></TreeViewContainer>
          <DataViewContainer></DataViewContainer>
        </div>
        
      </> 
    );
  }
};

export default App;
