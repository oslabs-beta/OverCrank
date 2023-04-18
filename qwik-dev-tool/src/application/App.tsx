import React from 'react';
import networkListener from './algorithms/networkListener';
import buildTree from './algorithms/parseHtml';
import testDOM from './algorithms/getHtmlTest';
import { elementInfo } from './types/types';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TopBar from './components/TopBar';
import TreeViewContainer from './containers/TreeViewContainer';
import DataViewContainer from './containers/DataViewContainer';

networkListener();
const tree: elementInfo[] = buildTree(testDOM);


const App = () => {
  return (
    <>
      <TopBar></TopBar>
      <div className='flex flex-row' >
        <TreeViewContainer></TreeViewContainer>
        <DataViewContainer></DataViewContainer>
      </div>
      
    </> 
  ) 

};

export default App;
