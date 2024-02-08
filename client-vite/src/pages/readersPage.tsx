import { useState } from 'react'
import Readers from '../comps/readers/Readers'
import AddReader from '../comps/readers/AddReader'
import { Button } from '@mui/material'
import { readerstyle } from '../comps/readers/readers.style'
import Header from '../comps/general/Header'

const ReadersPage = () => {
  const [isAddReaderOpen, setAddReaderOpen] = useState(false)

  return (
    <>
      <Header title="Readers" />
      <Readers />
      <Button
        sx={readerstyle.button}
        onClick={() => {
          setAddReaderOpen(true)
        }}
      >
        Add Reader
      </Button>
      {isAddReaderOpen && <AddReader onClose={() => setAddReaderOpen(false)} />}
    </>
  )
}

export default ReadersPage
