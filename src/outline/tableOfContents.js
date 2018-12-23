import { Link } from "gatsby";
import React from "react";

const DocumentList = ({ className, documents }) => documents.length > 0 && (
    <ol className={className}>
        {documents.map((document, index) => (
            <li key={index}>
                <Link to={document.slug}>{document.title}</Link>
                <DocumentList documents={document.children} />
            </li>
        ))}
    </ol>
)

const TableOfContents = ({ className, chapters }) => (
    <DocumentList className={className} documents={chapters} />
)

export default TableOfContents;