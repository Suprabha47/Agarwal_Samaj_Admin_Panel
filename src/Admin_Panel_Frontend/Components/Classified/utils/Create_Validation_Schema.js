import * as Yup from 'yup';

export const Create_Validation_Schema=Yup.object({
    name:Yup.string().required('This is required field'),
    firm_name:Yup.string().required('This is required field'),
    firm_address:Yup.string().required('This is required field'),
    phone:Yup.string().required('This is required field').min(10,'Mobile number should be 10 digits').max(10,'Mobile number should be 10 digits'),
    email:Yup.string().required('This is required field').email('Enter a valid email'),   
    business_category:Yup.string().required('This is required field'),
});