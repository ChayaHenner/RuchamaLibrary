import { Reader, ReaderForm, ReaderInfo } from "../utils/types";
import axios from 'axios';


export const addReader = async (reader: ReaderForm) => {
    console.log(reader);

    try {
        const response = await axios.post('http://localhost:5000/readers', reader);
        alert("user added")
        return response.data

    } catch (err) {
        console.error(err);

    }
};

export const getReaders = async (search:string|undefined): Promise<Reader[]> => {

    try {
        const response = await axios.get(`http://localhost:5000/readers`, {
            params: { search: search },
          });        return response.data
    } catch (error) {
        throw error;
    }
};
export const getReaderProfile = async (id:string | undefined): Promise<ReaderInfo> => {

    try {
        const response = await axios.get(`http://localhost:5000/borrowing/reader/${id}`);
        console.log( response.data);
        return response.data
    } catch (error) {
        throw error;
    }
};
