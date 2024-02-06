import axios from 'axios';
import { BookInstance, BookLibrary } from '../utils/types';


export const getBookInstances = async (): Promise<BookInstance[]> => {

    try {
        const response = await axios.get('http://localhost:5000/booksinstance');
        return response.data
    } catch (error) {
        throw error;
    }
};
export const getBooksLibrary = async (): Promise<BookLibrary[]> => {

    try {
        const response = await axios.get('http://localhost:5000/booksinstance/library');
        return response.data
    } catch (error) {
        throw error;
    }
};

