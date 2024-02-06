import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { FC } from "react";
import { selectedItemsProp } from "../utils/types";

const SelectedItemsTable: FC<selectedItemsProp> = ({ selectedItems, setSelectedItems }) => {

    const removeFromSelectedItems = (bookId: number) => {
        setSelectedItems((prevItems) => prevItems.filter((item) => item.book_id !== bookId));
    };

    return (
        <>
            <Typography variant="h5">Selected Items:</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Book Name</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>Book ID</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {selectedItems.map((item) => (
                            <TableRow key={item.book_id}>
                                <TableCell>{item.book_code.book_name}</TableCell>
                                <TableCell>{item.book_code.author}</TableCell>
                                <TableCell>{item.book_id}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => removeFromSelectedItems(item.book_id)}
                                    > x
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
export default SelectedItemsTable