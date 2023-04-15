// Function that takes in the full DOM and returns a newly structured Object
import { elementInfo } from '../types/types'
import TreeItem from '@mui/lab/TreeItem';

const isQwikComment = (node: ChildNode): boolean => {
    return (node.nodeType === Node.COMMENT_NODE && node.textContent && /^\/qv$/.test(node.textContent)) ? true: false;
}

const buildTree = (html: Document) => {
    // Create Top Level Tree containing the DOM Element and the associated Qwik data
    const parsedDOMTree: elementInfo[] = [];
    // Recursive function definition that searches through the DOM tree grabbing the 
    // current node and if it is contained within a Qwik comment 
    // Qwik comments follow the paradigm of <!--qw ...> ... <!--/qw>
    const buildTreeRecursive = (node: ChildNode): JSX.Element => {
        const qwikData: string[] = [];

        // Check if the current node is a comment node
        // If a qwik comment then save the comment along with the next non-comment node
        while (node.textContent && isQwikComment(node)) {
            qwikData.push(node.textContent);
            // Qwik comments are siblings to target node
            // Move to the next node
            if(node.nextSibling) node = node.nextSibling;
        }

        // Qwik data extracted now create a new JSX Element to the parseDOMTree
        if(!node.hasChildNodes) {
            const treeItem = (
                <TreeItem
                label={`${node.nodeName}`}
                />
            )
            parsedDOMTree.push({ element: treeItem, qwik: qwikData });
            return treeItem;
        }
        // If there are children invoke buildTreeRecursive on the child node
        else {
            const children = Array.from(node.childNodes);
            const treeItem = (
                <TreeItem
                label={`${node.nodeName}`}
                >
                    {children.map((child: ChildNode, index: number) => {
                        buildTreeRecursive(child)
                    })}
                </TreeItem>
            )
            parsedDOMTree.push({ element: treeItem, qwik: qwikData })
            return treeItem;
        }
    }

    buildTreeRecursive(html)
    // Return the TreeItems along with the comments
    return parsedDOMTree;
}

export default buildTree;