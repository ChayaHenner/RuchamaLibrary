import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  FormControl,
  Typography,
  Autocomplete,
  TextField,
  Container,
  Grid,
} from '@mui/material'
import NewBorrowConfirm from './borrowConfirm'
import { getBooksInLibrary } from '../api/book'
import { getReaders } from '../api/reader'
import { postBorrow } from '../api/borrowing'
import { BookType, BorrowedBook, Reader } from '../utils/types'
import { borrowstyle } from '../styles/borrow.style'
import SelectedItemsTable from './selectedItemsTable'
import { useLocation } from 'react-router-dom'

const Borrow: React.FC = () => {
  const [confirm, setConfirm] = useState(false)
  const [books, setBooks] = useState<BookType[]>([])
  const [readers, setReaders] = useState<Reader[]>([])
  const [data, setData] = useState<BorrowedBook[]>([])
  const [selectedBook, setSelectedBook] = useState<number | null>(null)
  const [selectedReader, setSelectedReader] = useState<number | null>()
  const [readerName, setReaderName] = useState<string | null>(null)
  const [selectedItems, setSelectedItems] = useState<BookType[]>([])
  const location = useLocation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setBooks(await getBooksInLibrary())
        setReaders(await getReaders(undefined))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    // console.log(location?.state.name)
    if (location.state) {
      setReaderName(location?.state.name)
      setSelectedReader(location?.state.id)
    }
    fetchData()
  }, [])

  const handleBorrow = async () => {
    if (selectedItems.length > 0) {
      try {
        const bookIds = selectedItems.map((item) => item.id)
        const readerId = selectedReader
        const request = {
          reader: readerId,
          ids: bookIds,
        }
        const data = await postBorrow(request)
        console.log(data)
        setConfirm(true)
        setData(data)
        setSelectedItems([])
      } catch (error) {
        console.error('Error making the request:', error)
      }
    } else {
      console.warn('Please select books to borrow.')
    }
  }

  const addToSelectedItems = () => {
    if (selectedBook !== null) {
      const isBookAlreadySelected = selectedItems.some(
        (item) => item.id === selectedBook,
      )
      if (!isBookAlreadySelected) {
        const selectedBookInfo = books.find((book) => book.id === selectedBook)
        if (selectedBookInfo) {
          setSelectedItems((prevItems) => [...prevItems, selectedBookInfo])
        }
      } else {
        console.log('Book is already selected!')
      }
    }
  }
  // const chooseReader = () => { setReaderName(selectedReaderName) };

  const filteredBooks = books.filter(
    (book) => !selectedItems.some((item) => item.id === book.id),
  )

  return (
    <Container>
      {confirm ? (
        <NewBorrowConfirm data={data} />
      ) : (
        <Box sx={borrowstyle.flex}>
          <Box>
            {readerName == null ? (
              <FormControl sx={{ width: 400 }}>
                <Autocomplete
                  sx={{ margin: 1 }}
                  options={readers}
                  getOptionLabel={(option) =>
                    ` ${option.name}    (${option.id})`
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="reader" />
                  )}
                  onChange={(_, value) => {
                    setSelectedReader(value?.id || null)
                    setReaderName(value?.name || null)
                    // setSelectedReaderName(value?.name || null)
                  }}
                />
              </FormControl>
            ) : (
              <>
                <Grid container alignItems="center">
                  <Typography variant="h4" sx={borrowstyle.h3}>
                    {readerName}
                  </Typography>
                  <Button
                    sx={borrowstyle.button}
                    onClick={() => {
                      setReaderName(null)
                    }}
                  >
                    Change
                  </Button>
                </Grid>
              </>
            )}
            <Box sx={{ display: 'flex' }}>
              <FormControl sx={borrowstyle.widthform}>
                <Autocomplete
                  sx={borrowstyle.button}
                  disabled={readerName === null}
                  options={filteredBooks}
                  getOptionLabel={(option) =>
                    `(${option.id})   ${option.bookCode.name} - ${option.bookCode.author} `
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="book" />
                  )}
                  value={null}
                  onChange={(_, value) => setSelectedBook(value?.id || null)}
                />
              </FormControl>

              <Button
                variant="contained"
                sx={borrowstyle.button}
                onClick={addToSelectedItems}
                disabled={readerName === null}
              >
                Borrow
              </Button>
            </Box>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleBorrow}
              sx={borrowstyle.h3}
              disabled={readerName === null || selectedItems.length == 0}
            >
              Complete Borrow
            </Button>
          </Box>

          <Box sx={borrowstyle.box}>
            {selectedItems.length > 0 && (
              <SelectedItemsTable
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
              />
            )}
          </Box>
        </Box>
      )}
    </Container>
  )
}

export default Borrow
