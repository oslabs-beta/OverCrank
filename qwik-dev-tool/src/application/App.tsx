import React, {useState, useEffect} from 'react';
import networkListener from './algorithms/networkListener';
import buildTree from './algorithms/parseHtml';
import testDOM from './algorithms/getHtmlTest';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { NodeData, Links } from './types/types';



const App = () => {
  const [nodeData, setNodeData] = useState<NodeData>({})
  const [tree, setTree] = useState<JSX.Element | null>(null)
  const [unassigned, setUnassigned] = useState<Links>({})
  const [currentNode, setCurrentNode] = useState<number>(0)

  useEffect(() => networkListener(), []) // feed network listener nodeData
  useEffect(() => {
    // call dom parser
    
  }, [nodeData])


  return (
    <>
      <div className='text-rose-600'>Hi</div>
      <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
      >
        {tree}
      </TreeView>
    </>
    
  ) 

};

export default App;
