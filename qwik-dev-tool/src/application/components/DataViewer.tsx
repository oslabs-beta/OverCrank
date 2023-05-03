import SyntaxHighlighter from 'react-syntax-highlighter';
import { agate } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Typography } from '@mui/material';
import { FC } from 'react';
import { NodeData, Metrics} from '../types/types';
import MetricsChart from './MetricsChart';

type Props = {
  nodeData: NodeData;
  currentNode: number;
};
type Info = {
  element: JSX.Element | null;
  loaded: string | null;
  action: (string | null)[] | null;
  operation: (string | null)[] | null;
  metrics: Metrics[] | null;
};

const DataViewer: FC<Props> = ({ nodeData, currentNode }) => {
  const info: Info = {
    element: null,
    loaded: null,
    action: null,
    operation: null,
    metrics: null
  };
  if (Object.keys(nodeData).length) {
    const events: string[] = Object.keys(nodeData[currentNode].events);
    const loaded = (() => {
      let notLoaded = 0;
      if (events.length) {
        events.forEach((el) => {
          nodeData[currentNode].events[el].operation === null && notLoaded++;
        });
        return notLoaded === events.length
          ? 'Not Loaded'
          : notLoaded < events.length && notLoaded !== 0
          ? 'Partially Loaded'
          : 'Fully Loaded';
      } else {
        return 'This element does not contain any events';
      }
    })();
    const operations = (() => {
      const js: (string | null)[] = [];
      if (events.length) {
        if (loaded === 'Partially Loaded' || loaded === 'Fully Loaded') {
          events.forEach((el) => {
            js.push(nodeData[currentNode].events[el].operation);
          });
        }
      }
      return js;
    })();
    const actions = (() => {
      const js: (string | null)[] = [];
      if (events.length) {
        events.forEach((el) => {
          if (nodeData[currentNode].events[el].action !== undefined) {
            js.push(nodeData[currentNode].events[el].action);
          }
        });
      }
      return js;
    })();
    const metrics = (() => {
      const metrics: Metrics[] = [];
      if (events.length) {
        events.forEach((el) => {
          if (nodeData[currentNode].events[el].metrics !== undefined) {
            metrics.push(nodeData[currentNode].events[el].metrics);
          }
        });
      }
      return metrics;
    })();
    info.element = nodeData[currentNode].element
    info.loaded = loaded
    info.action = actions;
    info.operation = operations;
    info.metrics = metrics
  }
  return (
    <div className='flex flex-col p-2'>
      <Typography
        variant='body1'
        color='common.white'
      >
        <div
          id='is-loaded'
          className='py-1'
        >
          <h6>Is Loaded: {info.loaded}</h6>
        </div>
        <hr className='h-px my-4 bg-gray-200 border-0 dark:bg-gray-700' />
        <div
          id='action'
          className='py-1'
        >
          <h6>Action: {info.action}</h6>
        </div>
        <hr className='h-px my-4 bg-gray-200 border-0 dark:bg-gray-700' />
        <div
          id='size'
          className='py-1'
        >
          <h6>Size: {info.metrics?.map((el => el?.size))}</h6>
        </div>
        <hr className='h-px my-4 bg-gray-200 border-0 dark:bg-gray-700' />
        <div
          id='metrics'
          className='py-1'
        >
          <h6>Download Metrics:</h6>
          <MetricsChart metrics={info.metrics}/>
        </div>
        <hr className='h-px my-4 bg-gray-200 border-0 dark:bg-gray-700' />
        <div
          id='operation'
          className='py-1'
        >
          <h6>Operation: </h6>
          <SyntaxHighlighter
            language='typescript'
            style={agate}
            showLineNumbers={true}
            customStyle={{
              // NOTE: Calculations are 100vh - TopBar height - Component above height
              maxHeight: 'calc(100vh - 136px - 255px)',
              minHeight: '175px',
            }}
          >
            {String(info.operation)}
          </SyntaxHighlighter>
        </div>
      </Typography>
    </div>
  );
};

export default DataViewer;
