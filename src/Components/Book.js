import React from 'react'
import '../Components/book.scss'

const Book = (props) => {
  const { id, book_pages, book_publication_year, book_title } = props
  return (
    <li className="Book d-flex" >
          <div className="col">
              <span className="field">
                  Title
              </span>
              <p>{book_title}</p>
          </div>
          <div className="col-1">
              <span className="field">
                  Year
              </span>
              <p>{book_publication_year}</p>
          </div>
          <div className="col-1">
              <span className="field">
                  pages
              </span>
              <p>{book_pages}</p>
          </div>
    </li>
  )
}

export default Book
