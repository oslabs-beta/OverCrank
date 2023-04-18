// Function that takes in the full DOM and returns a newly structured Object
import { elementInfo, lazyLoadedNode } from '../types/types'
import { TreeItem } from '@mui/lab';


const buildTree = (html: Document): elementInfo[] => {
    // Create Top Level Tree containing the DOM Element and the associated Qwik data
    console.log(html);
    const parsedDOMTree: elementInfo[] = [];
    let id = 0;
    // Recursive function definition that searches through the DOM tree grabbing the 
    // current node and if it is contained within a Qwik comment 
    // Qwik comments follow the paradigm of <!--qw ...> ... <!--/qw>
    const buildTreeRecursive = (node: ChildNode, qwikComments: string[]): JSX.Element => {
        // Check to see if the node has on* based event that will be lazy loaded
        let lazyLoadedEvents: lazyLoadedNode[] = [];
        try {
            // Cannot extract attributes from empty comment nodes
            if(node.nodeType === Node.ELEMENT_NODE) {
                const attributesNames = (node as Element).getAttributeNames();
                // Search for any attributes containing the on* keyword
                for(const attribute of attributesNames) {
                    const attributeData = (node as Element).getAttribute(attribute);
                    if(attribute.slice(0, 2) === 'on') {
                        lazyLoadedEvents.push({action: attribute, operation: attributeData});
                    }
                }
            }
        }
        catch(err) {
            console.log('Error in parsing attributes', err, 'Error node: ', node);
        }

        // Create a new JSX TreeItem Element to the parseDOMTree along with associated Qwik data
        if(!node.hasChildNodes()) {
            const treeItem = (
                <TreeItem
                nodeId={String(id++)}
                label={`${node.nodeName}`}
                />
            );
            parsedDOMTree.push({ element: treeItem, qwik: qwikComments, lazyLoadedActions: lazyLoadedEvents});
            return treeItem;
        }
        // If there are children invoke buildTreeRecursive on the child node
        else {
            const children = Array.from(node.childNodes);

            const associatedQwikCommentStack: string[][] = [];
            let qwikCommentStack: string[] = [];

            const treeItem = (
                <TreeItem
                nodeId={String(id++)}
                label={`${node.nodeName}`}
                >
                    {/* NOTE: not a fan of the any here but it allows for comment extraction in parallel */}
                    {children.map((child: ChildNode, index: number): any => {
                        // Check if it is an opening or closing qwik comment
                        const commentArr: string[] = [...qwikCommentStack];
                        if(child.nodeType === Node.COMMENT_NODE && child.textContent) {
                            // Opening comment
                            if(child.textContent.slice(0, 2) === 'qv') {
                                commentArr.push(child.textContent);
                            } 
                            // Closing comment
                            else if(child.textContent.slice(0, 3) === '/qv') {
                                commentArr.pop();
                            }
                        // Not comment so build out the child tree elements
                        } else {
                            return buildTreeRecursive(child, qwikCommentStack);
                        }
                        associatedQwikCommentStack.push(commentArr);
                        qwikCommentStack = [...commentArr];
            })}
                </TreeItem>
            );
            console.log(treeItem);
            parsedDOMTree.push({ element: treeItem, qwik: qwikComments, lazyLoadedActions: lazyLoadedEvents });
            return treeItem;
        }
    }
    const el: ChildNode = html.childNodes[0];
    buildTreeRecursive(el, []);
    console.log('parsedDOMTree result:', parsedDOMTree);
    // Return the TreeItems along with the comments
    return parsedDOMTree;
}

export default buildTree;