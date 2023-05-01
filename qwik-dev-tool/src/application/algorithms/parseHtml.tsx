// Function that takes in the full DOM and returns a newly structured Object
import { elementInfo, lazyLoadedNode, NodeData, Links } from '../types/types';
import { TreeItem } from '@mui/lab';
import { Dispatch, SetStateAction, useRef } from 'react';

const getStyle = (data: elementInfo, id: number) => {
  let notLoaded = 0;
  if (data) {
    const events: string[] = Object.keys(data.events);
    if (events.length) {
      events.forEach((el) => {
        data.events[el].operation === null && notLoaded++;
      });

      return notLoaded === events.length
        ? { color: 'white' }
        : notLoaded < events.length && notLoaded !== 0
        ? { color: 'blue' }
        : { color: 'purple' };
    }
  }

  return { color: 'white' };
};

const buildTree = (
  html: Document,
  unassigned: Links,
  currentData: NodeData,
  setNodeData: Dispatch<SetStateAction<NodeData>>,
  setTree: Dispatch<SetStateAction<JSX.Element | null>>
): void => {
  // Create Top Level Tree containing the DOM Element and the associated Qwik data
  console.log(currentData);
  const data: NodeData = {};

  let id = 0;
  // Recursive function definition that searches through the DOM tree grabbing the
  // current node and if it is contained within a Qwik comment
  // Qwik comments follow the paradigm of <!--qw ...> ... <!--/qw>
  const buildTreeRecursive = (
    node: ChildNode,
    qwikComments: string[]
  ): JSX.Element => {
    // Check to see if the node has on* based event that will be lazy loaded
    let lazyLoadedEvents: Links = {};
    try {
      // Cannot extract attributes from empty comment nodes
      if (node.nodeType === Node.ELEMENT_NODE) {
        const attributesNames = (node as Element).getAttributeNames();
        // Search for any attributes containing the on* keyword
        for (const attribute of attributesNames) {
          const uncutAttributeData = (node as Element).getAttribute(attribute);
          const attributeData = uncutAttributeData?.slice(
            0,
            uncutAttributeData.indexOf('#')
          );
          if (attribute.slice(0, 2) === 'on') {
            if (attributeData) {
              console.log(attribute, attributeData, id);
              if (unassigned[attributeData]) {
                lazyLoadedEvents[attributeData] = unassigned[attributeData];
                lazyLoadedEvents[attributeData].action = attribute;
                delete unassigned[attributeData];
              } else {
                let loaded = false;
                for (const key in currentData) {
                  if (currentData[key].events[attributeData]) {
                    lazyLoadedEvents[attributeData] =
                      currentData[key].events[attributeData];
                    loaded = true;
                    console.log('Loaded', String(loaded));
                  }
                }
                if (!loaded) {
                  lazyLoadedEvents[attributeData] = {
                    action: attribute,
                    operation: null,
                    metrics: null,
                  };
                }
              }
            }
          }
        }
      }
    } catch (err) {
      console.log('Error in parsing attributes', err, 'Error node: ', node);
    }
    data[id] = {
      element: <></>,
      qwik: qwikComments,
      events: lazyLoadedEvents,
      htmlElement: node as HTMLElement,
    };

    // Create a new JSX TreeItem Element to the parseDOMTree along with associated Qwik data
    if (!node.hasChildNodes()) {
      const treeItem = (
        <TreeItem
          sx={getStyle(data[id], id)}
          nodeId={String(id++)}
          label={`${node.nodeName}`}
        />
      );
      return treeItem;
    }
    // If there are children invoke buildTreeRecursive on the child node
    else {
      const associatedQwikCommentStack: string[][] = [];
      let qwikCommentStack: string[] = [];
      const children = Array.from(node.childNodes);

      const treeItem = (
        <TreeItem
          sx={getStyle(data[id], id)}
          nodeId={String(id++)}
          label={`${node.nodeName}`}
        >
          {children
            .map((child: ChildNode, index: number): JSX.Element | undefined => {
              const el = child as Element;
              const tagName = el.tagName ? el.tagName.toLowerCase() : '';
              // Check if it is an opening or closing qwik comment
              const commentArr: string[] = [...qwikCommentStack];
              if (child.nodeType === Node.COMMENT_NODE && child.textContent) {
                // Opening comment
                if (child.textContent.slice(0, 2) === 'qv') {
                  commentArr.push(child.textContent);
                }
                // Closing comment
                else if (child.textContent.slice(0, 3) === '/qv') {
                  commentArr.pop();
                }
              }
              // Exclude text data under elements and <script/> tags for readability
              else if (
                child.nodeType === Node.TEXT_NODE ||
                tagName === 'script' ||
                tagName === '#comment' ||
                tagName === 'path'
              ) {
                return;
              }
              // Not comment so build out the child tree elements
              else {
                return buildTreeRecursive(child, qwikCommentStack);
              }
              associatedQwikCommentStack.push(commentArr);
              qwikCommentStack = [...commentArr];
            })
            .filter((e) => e !== undefined)}
        </TreeItem>
      );
      return treeItem;
    }
  };
  const main: ChildNode = html.childNodes[0];
  console.log('Starting build tree process');
  setTree(buildTreeRecursive(main, []));
  setNodeData(data);
  console.log('parsedDOMTree result:', data);
  // Return the TreeItems along with the comments
};

export default buildTree;
