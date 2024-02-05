import  { useState } from "react";
import Readers from "../comps/readers";
import AddReader from "../comps/addReader";
import { Button } from "@mui/material";
import { readerstyle } from "../styles/readers.style";

const ReadersPage = () => {
  const [isAddReaderOpen, setAddReaderOpen] = useState(false);

  return (
    <>
      <Readers />
      <Button
        sx={readerstyle.button}
        onClick={() => {setAddReaderOpen(true)}}>
        Add Reader
      </Button>
      {isAddReaderOpen && <AddReader onClose={() => setAddReaderOpen(false)} />}
    </>
  );
};

export default ReadersPage;
