import * as Yup from 'yup';

export const ValidationSchema=Yup.object({
    title:Yup.string().required('title is required'),
    author_name:Yup.string().required('author name is required'),
   excerpt:Yup.string().required('excerpt is required'), 
    thumbnail_url:Yup.mixed().required('Image is required')
});