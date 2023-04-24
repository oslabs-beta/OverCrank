// exports reusable types

export type Action = string | null;
export type Operation = string | null; 

export type lazyLoadedNode = {
    action: Action,
    operation: Operation
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