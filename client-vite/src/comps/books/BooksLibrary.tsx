import { useEffect, useState } from 'react'
import { Grid, Container, Input } from '@mui/material'
import { BookInstanceLibrary } from '../../utils/types'
import { getBooksLibrary } from '../../api/bookinstances'
import BookCard from './BookCard'
import { booksstyle } from './books.styles'

const BooksLibrary = () => {
  const [books, setBooks] = useState<BookInstanceLibrary[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      setBooks(await getBooksLibrary())
    }

    fetchData()
  }, [])

  const filteredBooks = books.filter((book: BookInstanceLibrary) => {
    return (
      book.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.bookCode?.toString().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <Container>
      <Grid container spacing={5}>
        <Grid
          container
          spacing={3}
          alignItems="center"
          sx={booksstyle.headermargins}
        >
          <Grid item xs={12} sm={6}>
            <Input
              type="text"
              placeholder="Search books"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
        </Grid>
        {filteredBooks.map((book: BookInstanceLibrary) => (
          <BookCard book={book} key={book.bookCode} />
        ))}
      </Grid>
    </Container>
  )
}

export default BooksLibrary
