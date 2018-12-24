function pathParent(path) {
    const index = path.lastIndexOf('/', path.length - 2);
    return index < 0 ? '' : path.substring(0, index + 1);
}

export function toTree({ edges }, root) {
    let nodesByParent = {};
    edges.forEach(edge => {
        const path = edge.node.fields.slug;
        const parent = pathParent(path);

        let nodes = nodesByParent[parent] || [];
        nodes.push({
            slug: path,
            title: edge.node.frontmatter.title,
            fileAbsolutePath: edge.node.fileAbsolutePath
        });
        nodesByParent[parent] = nodes;
    });

    return getNodes(nodesByParent, root);
}

function getNodes(nodesByParent, folder) {
    let nodes = nodesByParent[folder] || [];
    nodes.sort((a,b) => a.fileAbsolutePath > b.fileAbsolutePath ? 1 : -1);
    nodes.forEach(node => {
        node.children = getNodes(nodesByParent, node.slug);
    });

    return nodes;
}

export function mapNodes(nodes, selector) {
    let mapping = [];
    for (let index = 0; index < nodes.length; index++) {
        const node = nodes[index];
        mapping.concat([selector(node)]);
        const children = mapNodes(node.children, selector);
        mapping.concat(children);
    }
    return mapping;
}

export function findNode(nodes, predicate) {
    for (let index = 0; index < nodes.length; index++) {
        const node = nodes[index];
        if (predicate(node)) {
            return node;
        }
        const child = findNode(node.children, predicate);
        if (child) {
            return child;
        }
    }
    return null;
}

export function findAncestors(nodes, predicate) {
    for (let index = 0; index < nodes.length; index++) {
        const node = nodes[index];
        if (predicate(node)) {
            return [];
        }
        const ancestors = findAncestors(node.children, predicate);
        if (ancestors) {
            return [node].concat(ancestors);
        }
    }
    return null;
}
