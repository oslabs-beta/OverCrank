import { FC, Dispatch, SetStateAction } from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchBar from '../components/SearchBar';
import { Typography } from '@mui/material';
import { NodeData } from '../types/types';

type Props = {
  tree: JSX.Element | null;
  nodeData: NodeData;
  setCurrentNode: Dispatch<SetStateAction<number>>;
};

const TreeViewContainer: FC<Props> = ({ tree, nodeData, setCurrentNode }) => {
  return (
    <div className='short:min-h-400px flex w-3/5 flex-col border-2 border-white bg-neutral-800 p-3'>
      <Typography
        variant='body2'
        color='common.white'
      >
        <SearchBar></SearchBar>
        <TreeView
          aria-label='file system navigator'
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{
            maxHeight: 'calc(500px - 135px)',
            '@media (min-height: 500px)': {
              maxHeight: 'calc(100vh - 136px)',
            },
            width: 'auto',
            flexGrow: 1,
            overflowY: 'auto',
          }}
          onNodeSelect={function (
            event: React.SyntheticEvent,
            nodeIds: string
          ): void {
            setCurrentNode(Number(nodeIds));
          }}
        >
          {tree && tree}
        </TreeView>
      </Typography>
    </div>
  );
};

export default TreeViewContainer;
