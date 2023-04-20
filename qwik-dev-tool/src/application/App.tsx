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

// Only enable if inside the Chrome browser as dependant upon API calls
if(import.meta.env.PROD) networkListener();

const App = () => {
  if(import.meta.env.DEV) {
    return (
      <div className=' min-h-screen first-letter:max-w-4xl bg-black'>
        <TopBar></TopBar>
        <div className='flex flex-row min-h-full' >
          <TreeViewContainer></TreeViewContainer>
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
