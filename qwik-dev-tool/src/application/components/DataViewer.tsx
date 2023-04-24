import SyntaxHighlighter from "react-syntax-highlighter";
import { agate } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Typography } from '@mui/material';
import {FC} from 'react';
import { NodeData } from '../types/types';

const dummyText = 
`let dummyVal = 100;
dummyVal++;
console.log(dummyVal);
`

type Props = {
  nodeData: NodeData,
  currentNode: number
}
type Info = {
  element: JSX.Element | null
  loaded: string | null,
  action: (string | null)[] | null,
  operation: (string | null)[] | null
}



const DataViewer: FC<Props> = ({nodeData, currentNode}) => {
  console.log(nodeData)
  const info: Info = {
    element: null,
    loaded: null,
    action: null,
    operation: null
  }
  if (Object.keys(nodeData).length) {
  const events: string[] = Object.keys(nodeData[currentNode].events)
  const loaded = (() => {
    let notLoaded = 0;
    if (events.length) {
      events.forEach(el => {
        nodeData[currentNode].events[el].operation === null && notLoaded++
      })
      return notLoaded === events.length ? 'Not Loaded' :
        (notLoaded < events.length && notLoaded !== 0) ? 'Partially Loaded' :
        'Fully Loaded';
    } else {
      return 'This element does not contain any events'
  }})()
  const operations = (() => {
    const js: (string | null)[] = []
    if (events.length) { 
      if (loaded === 'Partially Loaded' || loaded === 'Fully Loaded') {
      events.forEach (el => {
        js.push(nodeData[currentNode].events[el].operation)
      })
    }
  }
    return js
  })()
  const actions = (() => {
    const js: (string | null)[] = []
    if (events.length) { 
      events.forEach (el => {
        if (nodeData[currentNode].events[el].action !== undefined) {
          js.push(nodeData[currentNode].events[el].action)
        }
      })
  }
    return js
  })()
  info.element = nodeData[currentNode].element,
  info.loaded = loaded
  info.action = actions
  info.operation = operations
  }
    return (
        <div className="flex flex-col p-2">
            <Typography variant='body1' color='common.white'>
                <div id='element' className="pb-1 pt-5">
                    <h1>HTML Element:</h1>
                    {info.element}
                </div>
                <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"/>
                <div id='is-loaded' className="py-1">
                    <h6>Is Loaded:</h6>
                    {info.loaded}
                </div>
                <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"/>
                <div id='action' className="py-1">
                    <h6>Action: </h6>
                    {info.action}
                </div>
                <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"/>
                <div id='operation' className="py-1">
                    <h6>Operation: </h6>
                    <p>{info.operation}</p>
                </div>
                <hr className="h-px my-4 border-0 bg-gray-700"/>
                <div id='js' className="py-2">
                    <h6 className="pb-3" >JavaScript: </h6>
                    {/* <SyntaxHighlighter
                        language="typescript"
                        style={agate}
                    >
                        {info.operation}
                    </SyntaxHighlighter> */}
                </div>
            </Typography>
        </div>
    );
}

export default DataViewer;