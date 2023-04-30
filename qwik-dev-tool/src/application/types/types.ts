// exports reusable types

import React from 'react';

export type Action = string | null;
export type Operation = string | null;

export type lazyLoadedNode = {
  action: Action;
  operation: Operation;
  metrics: object | null;
};

export interface Links {
  [link: string]: lazyLoadedNode;
}

export type elementInfo = {
  element: JSX.Element;
  qwik: string[];
  events: Links;
  label: string;
  // ref: React.MutableRefObject<HTMLInputElement | null | undefined>;
};

export type NodeData = {
  [id: string]: elementInfo;
};

export type Resource = {
  url: string;
  type: string;
  getContent: (callback: (content: string, encoding: string) => void) => any;
  setContent: (
    content: string,
    commit: boolean,
    callback?: (error?: object) => void
  ) => any;
};

export type HarLogEntry = {
  cache: object;
  connection: string;
  request: {
    method: string;
    url: string;
  };
  response: {
    bodySize: number;
    content: {
      mimeType: string;
      size: number;
    };
    status: number;
    statusText: string;
  };
  startedDateTime: string;
  time: string;
  timings: {
    blocked: number;
    connect: number;
    dns: number;
    receive: number;
    send: number;
    ssl: number;
    wait: number;
  };
};

export type ClickAction = (
  event: React.SyntheticEvent<Element, Event>,
  id: string
) => void;

export type ClickType = () => void;
