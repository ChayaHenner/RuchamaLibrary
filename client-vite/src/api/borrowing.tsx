import { BorrowBooks, ReaderWithUnreturnedBooks, TopTenBook } from "../utils/types";
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
export const getTopTen = async (): Promise<TopTenBook[]> => {

    try {
        const response = await axios.get('http://localhost:5000/borrowing/topten');
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
            text: "Have a good read",
            icon: "success",
            confirmButtonText: "confirm",          
          })   
          return response.data  

    } catch (err) {
        console.error(err);

    }
};
export const postReturn = async (selectedRows:number[]) => {

    try {
        const response = await axios.post('http://localhost:5000/borrowing/returnmany',{borrowIds:selectedRows});
        console.log(response);
        if(response.data){
            Swal.fire({
                title: "Returned",
                text: "The books are safely back home",
                icon: "success",
                confirmButtonText: "confirm",
                denyButtonText: `Don't save`
              
              }).then((result)=>{
                if(result.isConfirmed){
                    window. location. reload()
                }   })
        }

    } catch (err) {
        console.error(err);

    }
};