import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { FaGithubAlt, FaTwitter } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const iconStyle = {
  width: '20px',
  height: '20px'
}

const Header = () => (
  <div className={`nav-container`}>
    <section>
      <Link className="nav-link" to="/">
        {' '}
        HOME{' '}
      </Link>
      <Link className="nav-link" to="/documents/reference/jinaga">
        {' '}
        DOCS{' '}
      </Link>
      <Link className="nav-link" to="/about">
        {' '}
        ABOUT{' '}
      </Link>
    </section>
    <span>
      <div className="user-links">
        <a className="user-icon" href="https://github.com/michaellperry/jinaga"><FaGithubAlt style={iconStyle} /></a>
        <a className="user-icon" href="https://twitter.com/michaellperry"><FaTwitter style={iconStyle} /></a>
        <a className="user-icon" href="mailto:michael@qedcode.com"><MdEmail style={iconStyle} /></a>
      </div>
    </span>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
