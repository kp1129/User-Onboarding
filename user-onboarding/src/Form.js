import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup'; 
import axios from 'axios';
import './Form.css';

const MyForm = ({values, errors, touched}) => {
    return (
        <div className='my-form'>
        <Form>
            <label htmlFor='name'>Name:</label>
            <Field id='name' name='name' type='text'/>
            {touched.name && errors.name && (<p>This field is required!</p>)}
            
            <label htmlFor='email'>Email:</label>
            <Field id='email' name='email' type='text'/>
            {touched.email && errors.email && (<p>This field is also required!</p>)}

            <label htmlFor='password'>Password:</label>
            <Field id='password' name='password' type='text'/>
            {touched.password && errors.password && (<p>Do you, like, just not want an account here?</p>)}
            <label htmlFor='checkbox'>Agree to ToS?</label>
            <Field id='checkbox' name='checkbox' type='checkbox'/>

            <button type='submit'>Submit!</button>
        </Form>
        </div>
    )
}

const FormikForm = withFormik({
    mapPropsToValues({name, email, password, checkbox}){
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            // checkbox: checkbox || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
        // checkbox: Yup.checkbox().required()
    }),
    handleSubmit(values, { setStatus, resetForm }) {
        console.log("submitting", values);
        axios
          .post("https://reqres.in/api/users/", values)
          .then(res => {
            console.log("success", res);
            // sends a status update through props in AnimalForm with value as res.data content
            setStatus(res.data);
    
            //clears form inputs, from FormikBag
            resetForm();
          })
          .catch(err => console.log(err.response));
      }
})(MyForm);
export default FormikForm;