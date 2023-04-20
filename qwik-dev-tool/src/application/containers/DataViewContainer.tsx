import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import DataViewer from '../components/DataViewer';


const DataViewContainer = () => {
    return (
        <div className=' bg-neutral-800 flex flex-col w-full border-white border-2 p-2'>
            <DataViewer/>
        </div>
    )
};

export default DataViewContainer