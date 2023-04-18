import React, {useState, useEffect} from 'react';
import networkListener from './algorithms/networkListener';
import { NodeData, Links } from './types/types';



const App = () => {
  const [nodeData, setNodeData] = useState<NodeData>({})
  const [tree, setTree] = useState<JSX.Element>()
  const [unassigned, setUnassigned] = useState<Links>({})
  const [currentNode, setCurrentNode] = useState<number>()

  useEffect(() => networkListener(), []) // feed network listener nodeData
  useEffect(() => {
    // call dom parser
  }, [nodeData])


  return <div className='text-rose-600'>Hi</div>
};

export default App;
