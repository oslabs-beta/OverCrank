import React from 'react';
import networkListener from './algorithms/networkListener';
import buildTree from './algorithms/parseHtml';
import testDOM from './algorithms/getHtmlTest';
import { elementInfo } from './types/types';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

networkListener();
const tree: elementInfo[] = buildTree(testDOM);


const App = () => {
  return (
    <>
      <div className='text-rose-600'>Hi</div>
      <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
      >
        {/* {tree.map((child): any => {
          console.log('Loading Element: ', child.element);
          return child.element;
        })} */}
        {tree[tree.length - 1].element}
      </TreeView>
    </>
    
  ) 

};

export default App;
