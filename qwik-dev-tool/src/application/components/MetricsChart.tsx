import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { Metrics } from "../types/types";
import { FC } from 'react';

type Props = {
  metrics: Metrics[] | null;
};
type Breakdown = {
  name: string
  time?: number,
  blocked?: number,
  connect?: number,
  dns?: number,
  receive?: number,
  send?: number,
  ssl?: number,
  wait?: number,
}

const MetricsChart: FC<Props> = ({metrics}) => {
  const charts: JSX.Element[] = []
  if (metrics) {
    metrics.forEach(el => {
      if (el) {
        const breakdown: Breakdown[] = [
        {
          name: 'Total Time',
          time: el.time,
        },
        {
          name: 'Breakdown',
          blocked: el.blocked > 0 ? el.blocked : undefined,
          dns: el.dns > 0 ? el.dns : undefined,
          connect: el.connect > 0 ? el.connect : undefined,
          send: el.send > 0 ? el.send : undefined,
          wait: el.wait > 0 ? el.wait : undefined,
          receive: el.receive > 0 ? el.receive : undefined,
          ssl: el.ssl > 0 ? el.ssl : undefined,
        }
      ]
      charts.push(
      <BarChart
      width={500}
      height={300}
      data={breakdown}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" stroke="#FFFFFF" />
      <YAxis unit="ms" />
      <Tooltip />
      <Legend />
      <Bar dataKey="time" stackId="a" fill="#8884d8" />
      <Bar dataKey="blocked" stackId="a" fill="#82ca9d" />
      <Bar dataKey="dns" stackId="a" fill="#82429b" />
      <Bar dataKey="connect" stackId="a" fill="#E2E33E" />
      <Bar dataKey="ssl" stackId="a" fill="#F55C00" />
      <Bar dataKey="send" stackId="a" fill="#3AE33E" />
      <Bar dataKey="wait" stackId="a" fill="#CA657C" />
      <Bar dataKey="receive" stackId="a" fill="#5665F5" />
    </BarChart>
      )}
    })
  }

  return (
    <>
      {charts}
    </>
  )
}

export default MetricsChart