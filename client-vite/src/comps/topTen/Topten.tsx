import React, { useState, useEffect } from 'react'
import { Container, List, ListItem, ListItemText } from '@mui/material'
import { getTopTen } from '../../api/borrowing'
import { TopTenBook } from '../../utils/types'

const TopTen: React.FC = () => {
  const [topBooks, setTopBooks] = useState<TopTenBook[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTopTen()
        setTopBooks(data)
        console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <Container>
      <List>
        {topBooks.map((book, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={book.name}
              secondary={`Borrow Count: ${book.borrowcount}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default TopTen
