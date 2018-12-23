import PropTypes from 'prop-types';
import React from 'react';
import '../stylesheets/main.scss';
import Header from './header';


const Layout = ({ className, children, head }) => (
  <>
    <div className={`index-head-container`}>
      <Header />
      {head}
    </div>
    <div className={className}>
      {children}
    </div>
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
