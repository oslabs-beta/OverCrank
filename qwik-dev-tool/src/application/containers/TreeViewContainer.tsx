import { FC, Dispatch, SetStateAction } from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchBar from '../components/SearchBar';
import { useState } from 'react';
import { Typography } from '@mui/material';
import { ClickType, ClickAction, NodeData } from '../types/types';

type Props = {
  tree: JSX.Element | null;
  nodeData: NodeData;
  setCurrentNode: Dispatch<SetStateAction<number>>;
};

const TreeViewContainer: FC<Props> = ({ tree, nodeData, setCurrentNode }) => {
  const [expanded, setExpanded] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string>('');

  const expandClick: ClickType = () => {
    setExpanded(Object.keys(nodeData));
  };

  const collapseClick: ClickType = () => {
    setExpanded([]);
  };

  const selectClick: ClickAction = (event, id) => {
    if (expanded.includes(id)) setExpanded(expanded.filter((e) => e !== id));
    else setExpanded(expanded.concat(id));
    console.log('Clicked nodeId: ' + String(id));
    setCurrentNode(Number(id));
  };

  return (
    <div className='short:min-h-400px flex w-3/5 flex-col border-2 border-white bg-neutral-800 p-3'>
      <Typography
        variant='body2'
        color='common.white'
      >
        <SearchBar
          collapseClick={collapseClick}
          expandClick={expandClick}
          setSelectedItem={setSelectedItem}
          nodeData={nodeData}
        ></SearchBar>
        <TreeView
          aria-label='file system navigator'
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          expanded={expanded}
          sx={{
            maxHeight: 'calc(500px - 135px)',
            '@media (min-height: 500px)': {
              maxHeight: 'calc(100vh - 136px)',
            },
            width: 'auto',
            flexGrow: 1,
            overflowY: 'auto',
          }}
          onNodeSelect={selectClick}
          selected={selectedItem}
        >
          {tree && tree}
        </TreeView>
      </Typography>
    </div>
  );
};

export default TreeViewContainer;
