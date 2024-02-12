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
import NewBorrowConfirm from './BorrowConfirm'
import { getBooksInLibrary } from '../../api/book'
import { getReaders } from '../../api/reader'
import { postBorrow } from '../../api/borrowing'
import { BookType, Reader, ReaderBorrowing } from '../../utils/types'
import { borrowstyle } from './borrow.style'
import SelectedItemsTable from './SelectedItemsTable'
import { useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'

const Borrow: React.FC = () => {
  const [confirm, setConfirm] = useState(false)
  const [books, setBooks] = useState<BookType[]>([])
  const [readers, setReaders] = useState<Reader[]>([])
  const [data, setData] = useState<ReaderBorrowing>()
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null)
  const [selectedReader, setSelectedReader] = useState<number | null>()
  const [readerName, setReaderName] = useState<string | null>(null)
  const [selectedItems, setSelectedItems] = useState<BookType[]>([])
  const [selectedMultiple, setSelectedMultiple] = useState<BookType[]>([])
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
    console.log(location.state)
    if (location.state != null) {
      console.log(location.state)

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
  const handleBorrowMultiple = async () => {
    if (selectedMultiple.length > 0) {
      try {
        const bookIds = selectedMultiple.map((item) => item.id)
        const readerId = selectedReader
        const request = {
          reader: readerId,
          ids: bookIds,
        }
        const data = await postBorrow(request)
        console.log(data)
        Swal.fire({
          title: 'Borrowed',
          text: 'Have a good read',
          icon: 'success',
          confirmButtonText: 'confirm',
        })

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

  const addToSelectedItems = (newItem: any) => {
    console.log('addToSelectedItems')
    console.log(newItem)

    if (newItem !== null) {
      // const isBookAlreadySelected = selectedItems.some(
      //   (item) => item.id === newItem,
      // )
      // if (!isBookAlreadySelected) {
      //   const selectedBookInfo = books.find((book) => book.id === newItem)
      //   if (selectedBookInfo) {
      setSelectedItems((prevItems) => [...prevItems, newItem])
      setSelectedBook(null)
      //     }
      //   } else {
      //     console.log('Book is already selected!')
      //   }
    }
  }

  const filteredBooks = books
  // .filter(
  //   (book) => !selectedItems.some((item) => item.id === book.id),
  // )

  return (
    <Container>
      {confirm ? (
        <NewBorrowConfirm data={data} />
      ) : (
        <Box sx={borrowstyle.flex}>
          <Box>
            {readerName == null ? (
              <FormControl sx={borrowstyle.widthform}>
                <Autocomplete
                  sx={borrowstyle.button}
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
                    Change Reader
                  </Button>
                </Grid>
              </>
            )}
            <Box sx={borrowstyle.flex}>
              {/* <FormControl sx={borrowstyle.widthform}>
              
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
                  value={selectedBook}
                  onChange={(_, value) => {
                    addToSelectedItems(value)
                    setSelectedBook(null)
                  }}
          
                  blurOnSelect={true}
                  disableCloseOnSelect={true}
                />
              </FormControl> */}
              <FormControl sx={borrowstyle.widthform}>
                <Autocomplete
                  multiple
                  sx={borrowstyle.button}
                  disabled={readerName === null}
                  options={filteredBooks}
                  getOptionLabel={(option) =>
                    `(${option.id})   ${option.bookCode.name} - ${option.bookCode.author} `
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="book" />
                  )}
                  onChange={(_, value) => {
                    console.log(value)
                    setSelectedMultiple(value)
                  }}
                  blurOnSelect={true}
                  disableCloseOnSelect={true}
                />
              </FormControl>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleBorrowMultiple}
              sx={borrowstyle.h3}
              disabled={readerName === null || selectedMultiple.length == 0}
            >
              Complete Borrow Multiple
            </Button>
            {/* <Button
              variant="outlined"
              color="primary"
              onClick={handleBorrow}
              sx={borrowstyle.h3}
              disabled={readerName === null || selectedItems.length == 0}
            >
              Complete Borrow
            </Button> */}
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
