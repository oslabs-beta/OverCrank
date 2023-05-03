// exports reusable types

export type Action = string | null;
export type Operation = string | null; 
export type Metrics = {
  size: string,
  startedDateTime: string,
  finishedDateTime: string,
  time: number,
  blocked: number,
  connect: number,
  dns: number,
  receive: number,
  send: number,
  ssl: number,
  wait: number,
} | null

export type lazyLoadedNode = {
    action: Action,
    operation: Operation
    metrics: Metrics
};

export interface Links {
  [link: string]: lazyLoadedNode
};

export type elementInfo = {
    element: JSX.Element, 
    qwik: string[],
    events: Links
};

export type NodeData = {
  [id: string]: elementInfo
}

export type Resource = {
    url: string;
    type: string;
    getContent: (callback: (content: string, encoding: string) => void) => any;
    setContent: (
      content: string,
      commit: boolean,
      callback?: (error?: object) => void
    ) => any;
  }

export type HarLogEntry = {
  cache: object,
  connection: string,
  request: {
    method: string,
    url: string,
    headers: {name: string, value: string}[]
  }
  response: {
    bodySize: number,
    content: {
      mimeType: string,
      size: number
    }
    status: number,
    statusText: string
  }
  startedDateTime: string,
  time: number,
  timings: {
    blocked: number,
    connect: number,
    dns: number,
    receive: number,
    send: number,
    ssl: number,
    wait: number
  }
}

export type UnassignedReferral = {
  "http://localhost:5173/": MetricsNode
}

export type MetricsNode = {
  children: MetricsNode[]
  name: string
}