import React, { useState } from "react";
import axios from "axios";
import { StaticImage } from "gatsby-plugin-image";

import "twin.macro";
import { Formik, Form } from "formik";

import Layout from "../components/Layout";
import HomePageWrapper from "../components/layoutWrappers/HomePageWrapper";
import Button from "../components/lib/Button";
import {
  TextInput,
  FileUploadInput,
  Dropdown,
  TextArea,
  DisplayFormErrors,
} from "../components/lib/FormFieldComponents";
import validationSchema from "../components/lib/FormValidationSchema";
import Modal from "../components/lib/Modal";

const ContactForm = () => {
  const [modalStatus, setModalStatus] = useState({
    isOpen: false,
    success: null,
    failed: null,
    err: null,
  });

  const handleSubmit = async (values, resetForm) => {
    console.log("Values: ", values);
    let formData = new FormData();
    // store all field values in formData
    for (const [key, value] of Object.entries(values)) {
      if (key === "file") {
        const file = {};
        for (const property in value) {
          file[property] = value;
        }
        formData.append(key, file);
      }
      formData.append(key, value);
    }

    await new Promise(async (resolve, reject) => {
      setTimeout(() => {
        // log form data
        for (var pair of formData.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }

        // axios({
        //   method: "post",
        //   url: "https://usebasin.com/f/691b1e9cedd7.json",
        //   headers: {
        //     accept: "application/json",
        //     "content-type": "multipart/form-data",
        //   },
        //   data: formData,
        // })
        //   .then((res) => {
        //     console.log("Resolved: ", res);
        //     resolve(
        //       setModalStatus({
        //         isOpen: true,
        //         success: true,
        //         failed: false,
        //         err: null,
        //       })
        //     );
        //     resetForm();
        //   })
        //   .catch((error) => {
        //     console.log("There was an error: ", error);
        //     reject(
        //       setModalStatus({
        //         isOpen: true,
        //         success: false,
        //         failed: false,
        //         err: error.message,
        //       })
        //     );
        //     resetForm();
        //   });
      }, 500);
    });
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    select: "",
    phone: "",
    email: "",
    textArea: "",
    city: "",
    file: null,
  };

  return (
    <Layout seoTitle={"Contact"}>
      <Modal modalStatus={modalStatus} setModalStatus={setModalStatus} />
      <div id='top-hero' tw='h-56' style={{ zIndex: "-1" }}>
        <div
          id='hero-img'
          tw='w-full h-full overflow-hidden'
          style={{ zIndex: "-1" }}
        >
          <StaticImage
            alt='BBS Hero image of beautiful refurnished white kitchen cabinet'
            src='../images/BBS-Top-Hero-Image.jpg'
            tw='w-full h-full object-cover object-center transform scale-150'
          />
        </div>
      </div>
      <HomePageWrapper>
        <div tw='mt-8'>
          <h3 tw='text-dark text-xl w-11/12 mb-4'>
            Wether you’re looking for a secondary reference, or want to level up
            your space, we guarantee transparency.
          </h3>
          <p tw='text-mildgray font-semibold w-11/12 mb-4'>
            Fill out the form below and we’ll get back to you within 24 hours
          </p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) =>
              handleSubmit(values, resetForm)
            }
          >
            {(formProps) => (
              <Form
                acceptCharset='UTF-8'
                tw='grid grid-cols-2 gap-7 mt-12'
                encType='multipart/form-data'
              >
                <TextInput
                  colSpan='1'
                  label='First Name'
                  name='firstName'
                  type='text'
                  placeholder=''
                />
                <TextInput
                  colSpan='1'
                  label='Last Name'
                  name='lastName'
                  type='text'
                  placeholder=''
                />
                <Dropdown label='Prefered method of Contact' name='select'>
                  <option value=''></option>
                  <option value='email'>Email</option>
                  <option value='phone'>Phone</option>
                </Dropdown>
                <TextInput
                  colSpan='1'
                  label='Phone'
                  name='phone'
                  type='phone'
                  placeholder=''
                />
                <TextInput
                  colSpan='1'
                  label='Email'
                  name='email'
                  type='email'
                  placeholder=''
                />
                <TextArea
                  label='Description'
                  name='textArea'
                  type='textArea'
                  placeholder='Tell us about your project...'
                />
                <TextInput
                  colSpan='2'
                  label='City'
                  name='city'
                  type='text'
                  placeholder=''
                />
                <FileUploadInput
                  colSpan='2'
                  label='Attach Photo'
                  name='file'
                  type='file'
                  capture='environment'
                  accept='image/*'
                  setFieldValue={formProps.setFieldValue}
                  setFieldError={formProps.setFieldError}
                  values={formProps.values}
                />
                <input type='hidden' name='you_shall_not_pass_bot'></input>
                <Button type='submit' variant='primary' tw='col-span-2'>
                  Submit
                </Button>
                <DisplayFormErrors
                  errors={formProps.errors}
                  touched={formProps.touched}
                />
              </Form>
            )}
          </Formik>
        </div>
      </HomePageWrapper>
    </Layout>
  );
};

export default ContactForm;
