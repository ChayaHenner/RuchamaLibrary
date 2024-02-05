import * as yup from 'yup';
export const publisherSchema = yup.object({
    publisher_name: yup.string().required(),
    country: yup.string().required()
});