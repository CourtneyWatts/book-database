import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Banner from '../images/Banner.jpg'
import '../Components/header.scss'

function Header() {
  return (
    <Jumbotron
      fluid
      style={{
        backgroundImage: `url(${Banner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container>
        <div className="Header p-4">
          <h1>The Book Database</h1>
        </div>

      </Container>
    </Jumbotron>
  )
}

export default Header
