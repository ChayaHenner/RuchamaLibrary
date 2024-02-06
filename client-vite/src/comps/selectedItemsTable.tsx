import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { FC } from "react";
import { selectedItemsProp } from "../utils/types";

const SelectedItemsTable: FC<selectedItemsProp> = ({ selectedItems, setSelectedItems }) => {

    const removeFromSelectedItems = (bookId: number) => {
        setSelectedItems((prevItems) => prevItems.filter((item) => item.id !== bookId));
    };

    return (
        <>
            <Typography variant="h5">Selected Books:</Typography>
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
                            <TableRow key={item.id}>
                                <TableCell>{item.bookCode.name}</TableCell>
                                <TableCell>{item.bookCode.author}</TableCell>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => removeFromSelectedItems(item.id)}
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