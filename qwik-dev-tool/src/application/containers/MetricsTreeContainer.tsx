import { FC } from 'react';
import { Tree } from 'react-tree-graph';
import 'react-tree-graph/dist/style.css';
import { MetricsNode } from '../types/types';

type Props = {
  data: MetricsNode;
};

const MetricsTreeContainer: FC<Props> = ({ data }) => {
  return (
    <div className='bg-neutral-800 flex justify-center w-full border-white border-2 p-2 max-h-fit h-full'>
      <Tree
        data={data}
        margins={{
          bottom: 20,
          left: 50,
          right: 225,
          top: 20,
        }}
        svgProps={{ className: 'custom' }}
        height={600}
        width={1800}
      />
    </div>
  );
};

export default MetricsTreeContainer;
