import { Link } from "gatsby";
import React from "react";
import { findNext } from "./tree";

const NextLink = ({ className, chapters, slug }) => {
    const next = findNext(chapters, n => n.slug === slug);
    return next && next !== true && (
        <Link className={className} to={next.slug}>{next.title}</Link>
    )
}

export default NextLink;