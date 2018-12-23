import { Link } from "gatsby";
import React from "react";
import { findAncestors } from "./tree";

const Breadcrumb = ({ className, chapters, slug }) => {
    const ancestors = findAncestors(chapters, n => n.slug === slug);
    return ancestors && ancestors.length > 0 && (
        <ol className={className}>
            { ancestors.map((node, index) => (
                <li key={index}>
                    <Link to={node.slug}>{node.title}</Link>
                </li>
            )) }
        </ol>
    )
}

export default Breadcrumb;