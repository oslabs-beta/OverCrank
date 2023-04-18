// exports reusable types

export interface Links {
  [link: string]: string | null
}

export interface NodeData {
  [id: string]: {
    events: Links
  }
}