import * as Yup from 'yup';

const URL = 'http://localhost:8080';

const schema = Yup.object().shape({
   name: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .matches(/^[a-zA-Z0-9\s.,]+$/, "Must be english leter")
     .required('Required'),
   description: Yup.string()
     .min(2, 'Too Short!')
     .max(200, 'Too Long!')
     .matches(/^[a-zA-Z0-9\s.,/]+$/, "Must be english leter")
     .required('Required'),
   price: Yup.string()
     .min(1, 'Too Short!')
     .max(4, 'Too Long!')
     .matches(/^[0-9]+$/, "Must be only numbers")
     .required('Required'),
 })
 export {URL, schema}