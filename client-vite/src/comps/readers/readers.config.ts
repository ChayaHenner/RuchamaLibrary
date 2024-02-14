import { ObjectSchema, string, object, date, addMethod } from 'yup'
import { ReaderForm } from '../../utils/types'

export const formSchema: ObjectSchema<ReaderForm> = object({
    name: string().required('Name is required').min(2,'too short').max(40,'too long'),
    email: string().email('Enter a valid email').required('Email is required'),
    dob: date().required('Date of birth is invalid'),

})
