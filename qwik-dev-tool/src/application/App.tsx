import React, {
  useState,
  useEffect,
  PropsWithChildren,
  useRef,
  MutableRefObject,
} from 'react';
import buildTree from './algorithms/parseHtml';
import getDOM from './algorithms/getHtml';
import { getResources } from './algorithms/getResources';
import { NodeData, Links, MetricsNode } from './types/types';
import TopBar from './components/TopBar';
import TreeViewContainer from './containers/TreeViewContainer';
import DataViewContainer from './containers/DataViewContainer';
import MetricsTreeContainer from './containers/MetricsTreeContainer';
import Tab from '@mui/material/Tab';
import { TabPanel } from '@mui/lab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

declare const chrome: any;

const App = () => {
  const [nodeData, setNodeData] = useState<NodeData>({});
  const [tree, setTree] = useState<JSX.Element | null>(null);
  const [metricsTree, setMetricsTree] = useState<MetricsNode>({
    name: 'http://localhost:5173/',
    children: [],
  });
  const [currentNode, setCurrentNode] = useState<number>(0);
  const [dom, setDOM] = useState<Document | null>(null);
  const unassigned = useRef<Links>({});
  const unassignedLog = useRef<MetricsNode>({
    name: 'http://localhost:5173/',
    children: [],
  });
  const [tabValue, setTabValue] = useState('0');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    getDOM(setDOM);
    getResources(unassigned, unassignedLog, setDOM);
  }, []);
  useEffect(() => {
    // call dom parser
    (() => {
      if (dom) {
        buildTree(dom, unassigned.current, nodeData, setNodeData, setTree);
        const temp = { ...unassignedLog.current };
        setMetricsTree({ ...temp });
      }
    })();
  }, [dom]);

  return (
    <>
      <div className='min-h-500px first-letter:max-w-4xl bg-black'>
        <TopBar></TopBar>
        <TabContext value={tabValue}>
          <TabList
            value={tabValue}
            onChange={handleChange}
            aria-label='view tabs'
            indicatorColor='secondary'
          >
            <Tab
              label='Tree View'
              value='0'
              sx={{ color: 'white' }}
            ></Tab>
            <Tab
              label='Qwik Vizualized'
              value='1'
              sx={{ color: 'white' }}
            ></Tab>
          </TabList>

          <TabPanel
            value='0'
            sx={{ padding: 0 }}
          >
            <div className='flex flex-row min-h-full'>
              <TreeViewContainer
                tree={tree}
                nodeData={nodeData}
                setCurrentNode={setCurrentNode}
              ></TreeViewContainer>
              <DataViewContainer
                nodeData={nodeData}
                currentNode={currentNode}
              ></DataViewContainer>
            </div>
          </TabPanel>
          <TabPanel
            value='1'
            sx={{
              padding: 0,
              maxHeight: 'calc(100vh - 136px - 50px)',
              '@media (min-height: 500px)': {
                maxHeight: 'calc(100vh - 136px - 50px)',
              },
              width: 'auto',
              flexGrow: 1,
              overflowY: 'auto',
            }}
          >
            <MetricsTreeContainer data={metricsTree} />
          </TabPanel>
        </TabContext>
      </div>
    </>
  );
};

export default App;
