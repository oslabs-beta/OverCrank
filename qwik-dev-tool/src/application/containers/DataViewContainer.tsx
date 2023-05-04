import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import DataViewer from '../components/DataViewer';
import {FC} from 'react';
import { NodeData } from '../types/types';

type Props = {
  nodeData: NodeData,
  currentNode: number
}

const DataViewContainer: FC<Props> = ({nodeData, currentNode}) => {
    return (
        <div className=' bg-neutral-800 flex flex-col w-full border-white border-2 p-2'>
            <DataViewer nodeData={nodeData} currentNode={currentNode}/>
        </div>
    )
};

export default DataViewContainer