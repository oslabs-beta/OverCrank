import SyntaxHighlighter from "react-syntax-highlighter";
import { agate } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Typography } from '@mui/material';

const dummyText = 
`let dummyVal = 100;
dummyVal++;
console.log(dummyVal);
`

const DataViewer = () => {
    return (
        <div className="flex flex-col p-2">
            <Typography variant='body1' color='common.white'>
                <div id='element' className="pb-1 pt-5">
                    <h1>HTML Element: </h1>
                </div>
                <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"/>
                <div id='is-loaded' className="py-1">
                    <h6>Is Loaded: </h6>
                </div>
                <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"/>
                <div id='action' className="py-1">
                    <h6>Action: </h6>
                </div>
                <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"/>
                <div id='operation' className="py-1">
                    <h6>Operation: </h6>
                </div>
                <hr className="h-px my-4 border-0 bg-gray-700"/>
                <div id='js' className="py-2">
                    <h6 className="pb-3" >JavaScript: </h6>
                    <SyntaxHighlighter
                        language="typescript"
                        style={agate}
                    >
                        { dummyText }
                    </SyntaxHighlighter>
                </div>
            </Typography>
        </div>
    );
}

export default DataViewer;