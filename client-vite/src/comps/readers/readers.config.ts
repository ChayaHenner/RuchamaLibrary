import { ObjectSchema, string, object, date, number } from 'yup'
import { ReaderForm } from '../../utils/types'
import * as yup from 'yup'

export const formSchema: ObjectSchema<ReaderForm> = object({
    name: string().required('Name is required'),
    email: string().email('Enter a valid email').required('Email is required'),
    dob: date().required('Date of Birth is required'),
  })