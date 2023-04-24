import { FC, Dispatch, SetStateAction } from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchBar from '../components/SearchBar'
import { Typography } from '@mui/material';
import { NodeData } from '../types/types';


type Props = {
  tree: JSX.Element | null,
  nodeData: NodeData,
  setCurrentNode: Dispatch<SetStateAction<number>>
}

const TreeViewContainer: FC<Props> = ({tree, nodeData, setCurrentNode}) => {
    return (
      <div className=' bg-neutral-800 flex flex-col w-3/5 border-white border-2 p-3'>
        <Typography variant='body2' color="common.white">
          <SearchBar></SearchBar>
            <TreeView
              aria-label="file system navigator"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              sx={{ maxHeight: '80vh', width: 'auto', flexGrow: 1, overflowY: 'auto' }}
              onNodeSelect={function(event: React.SyntheticEvent, nodeIds: string):void {
                setCurrentNode(Number(nodeIds))
              }}
              >
                {tree && tree}
            </TreeView>
          </Typography>
      </div>
     )
}


export default TreeViewContainer;