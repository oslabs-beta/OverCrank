// exports reusable types
export type Action = string;
export type Operation = string | null; 
export type lazyLoadedNode = {
    action: Action,
    operation: Operation
};
export type elementInfo = {
    element: JSX.Element, 
    qwik: string[],
    lazyLoadedActions: lazyLoadedNode[]
};