import React, { Component } from 'react'
import Book from './Book'
import Container from 'react-bootstrap/Container'
import axios from 'axios'
import Pagination from 'react-bootstrap/Pagination'

class Books extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      itemsPerPage: 100,
      books: [],
      pages: null,
      page: 1,
    }
    this.getBooks = this.getBooks.bind(this)
    this.goToPage = this.goToPage.bind(this)
    this.skipBackwardOne = this.skipBackwardOne.bind(this)
    this.skipBackwardTen = this.skipBackwardTen.bind(this)
    this.skipForwardOne = this.skipForwardOne.bind(this)
    this.skipForwardTen = this.skipForwardTen.bind(this)
  }
  getBooks(page) {
    axios
      .post('http://nyx.vima.ekt.gr:3000/api/books', {
        page: page,
        itemsPerPage: this.state.itemsPerPage,
      })
      .then((response) => {
        this.setState((st) => ({
          books: response.data.books,
          pages: Math.ceil(response.data.count / st.itemsPerPage),
          isLoading: false,
          page: parseInt(page),
        }))
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  goToPage(e) {
    const page = e.target.innerText
    this.props.history.push(`${page}`)
    this.getBooks(page)
  }
  skipBackwardOne() {
    if (this.state.page <= 1) {
      return
    }
    let newPage = parseInt(this.state.page - 1)
    this.props.history.push(`${newPage}`)
    this.getBooks(newPage)
  }
  skipBackwardTen() {
    if (this.state.page <= 1) {
      return
    }
    let newPage = this.state.page - 10
    newPage = newPage <= 0 ? 1 : newPage
    this.props.history.push(`${newPage}`)
    this.getBooks(newPage)
  }
  skipForwardOne() {
    if (this.state.page >= this.state.pages) {
      return
    }
    let newPage = parseInt(this.state.page + 1)
    this.props.history.push(`${newPage}`)
    this.getBooks(newPage)
  }
  skipForwardTen() {
    if (this.state.page >= this.state.pages) {
      return
    }
    let newPage = parseInt(this.state.page + 10)
    console.log(newPage)
    newPage = newPage >= this.state.pages ? this.state.pages : newPage
    this.props.history.push(`${newPage}`)
    this.getBooks(newPage)
  }

  componentDidMount() {
    const page = this.props.match.params.num || 1
    this.getBooks(page)
  }
  componentDidUpdate() {
    console.log('component updated')
  }

  render() {
    const books = this.state.books.map((book) => {
      return <Book {...book} key={book.id}/>
    })

    let active = parseInt(this.props.match.params.num || 1)
    let startingPage = active >= 5 ? active - 2 : 1
    let endingPage = active >= 5 ? active + 2 : 5
    if (endingPage >= this.state.pages) {
      startingPage = this.state.pages - 4
      endingPage = this.state.pages
    }

    let items = []
    for (let number = startingPage; number <= endingPage; number++) {
      items.push(
        <Pagination.Item
          onClick={number != active ? this.goToPage : undefined}
          key={number}
          active={number == active}
          style={{ width: '45px', textAlign: 'center' }}
        >
          {number}
        </Pagination.Item>
      )
    }
    // Condition added to stop the navigation rendering while the first api call is sent
    if (this.state.books[0]) {
      return (
        <Container>
          <Pagination className='justify-content-end mb-5'>
            <Pagination.First onClick={this.skipBackwardTen} />
            <Pagination.Prev onClick={this.skipBackwardOne} />
            {items}
            <Pagination.Next onClick={this.skipForwardOne} />
            <Pagination.Last onClick={this.skipForwardTen} />
          </Pagination>
          <ul className='p-0 mt-5 mb-5 Books'>{books}</ul>
          <Pagination className='justify-content-end mb-5'>
            <Pagination.First onClick={this.skipBackwardTen} />
            <Pagination.Prev onClick={this.skipBackwardOne} />
            {items}
            <Pagination.Next onClick={this.skipForwardOne} />
            <Pagination.Last onClick={this.skipForwardTen} />
          </Pagination>
        </Container>
      )
    } else {
      return <Container></Container>
    }
  }
}

export default Books
