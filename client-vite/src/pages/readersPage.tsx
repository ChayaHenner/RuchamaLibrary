import React, { useState } from "react";
import Readers from "../comps/readers";
import AddReader from "../comps/addReader";
import { Button } from "@mui/material";

const ReadersPage = () => {
  const [isAddReaderOpen, setAddReaderOpen] = useState(false);

  return (
    <>
      <Readers />
      <Button
        style={{
          position: "fixed",
          top: "100px",
          right: "100px",
          zIndex: 1000,
        }}
        onClick={() => {setAddReaderOpen(true)}}
      >
        Add Reader
      </Button>
      {isAddReaderOpen && <AddReader onClose={() => setAddReaderOpen(false)} />}
    </>
  );
};

export default ReadersPage;
