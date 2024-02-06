import  { useState } from "react";
import Readers from "../comps/readers";
import AddReader from "../comps/addReader";
import { Button } from "@mui/material";
import { readerstyle } from "../styles/readers.style";
import Header from "../comps/header";

const ReadersPage = () => {
  const [isAddReaderOpen, setAddReaderOpen] = useState(false);

  return (
    <>
    <Header title="Readers" />
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
