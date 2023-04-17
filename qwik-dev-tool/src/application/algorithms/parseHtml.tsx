// Function that takes in the full DOM and returns a newly structured Object
import { elementInfo } from '../types/types'
import { TreeItem } from '@mui/lab';


const buildTree = (html: Document) => {
    // Create Top Level Tree containing the DOM Element and the associated Qwik data
    const parsedDOMTree: elementInfo[] = [];
    let id = 0;
    // Recursive function definition that searches through the DOM tree grabbing the 
    // current node and if it is contained within a Qwik comment 
    // Qwik comments follow the paradigm of <!--qw ...> ... <!--/qw>
    const buildTreeRecursive = (node: ChildNode, qwikComments: ChildNode[]): JSX.Element => {
        // Check to see if the node has on* based event that will be lazy loaded
        let lazyLoadedEvents: string[] = [];
        const attributesNames = (node as Element).getAttributeNames();
        // Search for any attributes containing the on* keyword
        for(const attribute in attributesNames) {
            if(attribute.slice(0, 2) === 'on') lazyLoadedEvents.push(attribute);
        }

        // Create a new JSX TreeItem Element to the parseDOMTree along with associated Qwik data
        if(!node.hasChildNodes) {
            const treeItem = (
                <TreeItem
                nodeId={String(id++)}
                label={`${node.nodeName}`}
                />
            )
            parsedDOMTree.push({ element: treeItem, qwik: qwikComments, lazyLoadedActions: lazyLoadedEvents});
            return treeItem;
        }
        // If there are children invoke buildTreeRecursive on the child node
        else {
            const children = Array.from(node.childNodes);
            const treeItem = (
                <TreeItem
                nodeId={String(id++)}
                label={`${node.nodeName}`}
                >
                    {/* NOTE: not a fan of the "any" type here, as there is the chance of generating a null React Child if entire page is just comments which should in theory never happen... */} 
                    {children.map((child: ChildNode, index: number): any => {
                        const qwikCommentStack: ChildNode[] = [];
                        // Check if it is an opening or closing qwik comment
                        // Opening comment
                        if(node.nodeName === '#comment') {
                            if(node.textContent === 'qv') qwikCommentStack.push(node);
                            else if(node.textContent === '/qv') qwikCommentStack.pop();
                        } else {
                            buildTreeRecursive(child, qwikCommentStack);
                        }
                    })}
                </TreeItem>
            )
            parsedDOMTree.push({ element: treeItem, qwik: qwikComments, lazyLoadedActions: lazyLoadedEvents });
            return treeItem;
        }
    }
    const el: ChildNode = html.childNodes[1];
    buildTreeRecursive(el, []);
    // Return the TreeItems along with the comments
    return parsedDOMTree;
}

export default buildTree;