// exports reusable types

export type Action = string;
export type Operation = string | null; 

export type lazyLoadedNode = {
    action?: Action,
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

export interface NodeData {
  [id: string]: elementInfo
}
