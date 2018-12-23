function pathParent(path) {
    const index = path.lastIndexOf('/');
    return index < 0 ? '' : path.substring(0, index);
}

function pathFilename(path) {
    const index = path.lastIndexOf('/');
    return index < 0 ? '' : path.substring(index + 1);
}

function flatten(collection, selector) {
    if (collection.length === 0) {
        return [];
    }
    else {
        return collection.map(selector).reduce((a,b) => a.concat(b));
    }
}

export function toTree({ edges }, root) {
    let filesByFolder = {};
    let foldersByParent = {};
    edges.forEach(edge => {
        const path = edge.node.fields.slug.slice(0, -1);
        const filename = pathFilename(path);
        const folder = pathParent(path);
        const parent = pathParent(folder);

        let files = filesByFolder[folder] || [];
        files.push({
            slug: edge.node.fields.slug,
            title: edge.node.frontmatter.title,
            filename: filename
        });
        filesByFolder[folder] = files;

        let folders = foldersByParent[parent] || {};
        folders[folder] = true;
        foldersByParent[parent] = folders;
    });

    return getNodes(filesByFolder, foldersByParent, root);
}

function getNodes(filesByFolder, foldersByParent, folder) {
    const folders = Object.keys(foldersByParent[folder] || {});
    const folderChildren = flatten(folders, f => getNodes(filesByFolder, foldersByParent, f));
    
    let files = filesByFolder[folder] || [];
    if (files.length === 0) {
        return folderChildren;
    }

    files.sort((a, b) => a.filename > b.filename ? 1 : -1);
    const first = files[0];
    const rest = files.slice(1);
    const fileChildren = rest.map(f => ({
        slug: f.slug,
        title: f.title,
        filename: f.filename,
        children: []
    }));

    let children = fileChildren.concat(folderChildren);
    children.sort((a,b) => a.filename > b.filename ? 1 : -1);
    return [{
        slug: first.slug,
        title: first.title,
        filename: pathFilename(folder),
        children: children
    }];
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
