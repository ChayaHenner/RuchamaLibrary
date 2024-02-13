import {  string } from 'yup'

import * as yup from 'yup'





export const publisherSchema = yup.object().shape({
  name: string().required('Publisher is required'),
  country: string().required('Country is required'),
})
