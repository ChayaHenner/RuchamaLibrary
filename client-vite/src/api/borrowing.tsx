import { BorrowBooks, ReaderWithUnreturnedBooks } from "../utils/types";
import axios from 'axios';
import Swal from 'sweetalert2'

export const getOverdueReaders = async (): Promise<ReaderWithUnreturnedBooks[]> => {

    try {
        const response = await axios.get('http://localhost:5000/borrowing/twoweeks');
      console.log(response.data);
      
        return response.data
    } catch (error) {
        throw error;
    }
};
export const postBorrow = async (borrow:BorrowBooks) => {
    console.log(borrow);

    try {
        const response = await axios.post('http://localhost:5000/borrowing/borrowmany', borrow);
        console.log(response);
        Swal.fire({
            title: "Borrowed",
            text: "Have a safe journey",
            icon: "success",
            confirmButtonText: "confirm",
            denyButtonText: `Don't save`
          
          })     
            return response.data

    } catch (err: any) {
        console.error(err.response);

    }
};