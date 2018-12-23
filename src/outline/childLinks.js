import { Link } from "gatsby";
import React from "react";

const ChildLinks = ({ className, children }) => children.length > 0 && (
    <ol className={className}>
        {children.map((document, index) => (
            <li key={index}>
                <Link to={document.slug}>{document.title}</Link>
            </li>
        ))}
    </ol>
);

export default ChildLinks;