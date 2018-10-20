import React, { Component } from 'react'
import { FaGithubAlt, FaTwitter } from 'react-icons/lib/fa'
import { MdMessage, MdEmail } from 'react-icons/lib/md'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  max-width: 100%;
`

const UserIcon = styled.a`
  margin-left: 25px;
  color: white;
  &:hover {
    color: #00bff3;
    border-bottom: none;
  }
`

const iconStyle = {
  width: '20px',
  height: '20px'
}

class UserLinks extends Component {
  render() {
    return (
      <Container className="user-links">
        <UserIcon href="https://github.com/michaellperry/jinaga">
          <FaGithubAlt style={iconStyle} />
        </UserIcon>
        <UserIcon href="https://twitter.com/michaellperry">
          <FaTwitter style={iconStyle} />
        </UserIcon>
        <UserIcon href="mailto:michael@qedcode.com">
          <MdEmail style={iconStyle} />
        </UserIcon>
      </Container>
    )
  }
}

export default UserLinks
