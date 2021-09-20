import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { StaticImage } from "gatsby-plugin-image";

import "twin.macro";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

import Layout from "../components/Layout";
import HomePageWrapper from "../components/layoutWrappers/HomePageWrapper";
import Button from "../lib/Button";
import {
  TextInput,
  FileUploadInput,
  Dropdown,
  TextArea,
  DisplayFormErrors,
  phoneRegExp,
  characterLimit,
} from "../lib/FormFieldComponents";

const ContactForm = () => {
  // const [serverState, setServerState] = useState({
  //   submitting: false,
  //   status: null,
  // });

  // const handleServerResponse = (ok, msg, form) => {
  //   setServerState({
  //     submitting: false,
  //     status: { ok, msg },
  //   });
  //   if (ok) {
  //     form.reset();
  //   }
  // };

  // const handleOnSubmit = (e) => {
  //   e.preventDefault();
  //   const form = e.target;
  //   setServerState({ submitting: true });
  //   axios({
  //     method: "post",
  //     url: "https://getform.io/f/https://getform.io/f/b5b5bd86-b676-4cfc-b177-32da9e151421",
  //     data: new FormData(form),
  //   })
  //     .then((res) => {
  //       console.log("getForm response: ", res);
  //       handleServerResponse(true, "Thanks!", form);
  //     })
  //     .catch((error) => {
  //       handleServerResponse(false, error.response.data.error, form);
  //     });
  // };

  const supportedFormats = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];

  const maxFileSize = 5000000;

  return (
    <Layout seoTitle={"About"}>
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
          {/* getForm requires each input to have a name attribute */}
          {/* <form onSubmit={handleOnSubmit}>
            <input type='email' name='email' placeholder='Your Email' />
            <input type='text' name='name' placeholder='Your Name' />
            <input type='text' name='message' placeholder='Your Message' />
            <button type='submit'>Send</button>
          </form> */}
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              contactMethod: "",
              phone: "",
              email: "",
              textArea: "",
              city: "",
              file: null,
            }}
            validationSchema={Yup.object({
              firstName: Yup.string()
                .max(15, "Must be 15 characters or less")
                .required("Required"),
              lastName: Yup.string()
                .max(20, "Must be 20 characters or less")
                .required("Required"),
              contactMethod: Yup.string()
                // specify the set of valid values for job type
                // @see http://bit.ly/yup-mixed-oneOf
                .oneOf(["email", "phone"], "Invalid Job Type")
                .required("Required"),
              phone: Yup.string()
                .matches(phoneRegExp, "Invalid phone number")
                .required("Required"),
              email: Yup.string()
                .email("Invalid email addresss`")
                .required("Required"),
              textArea: Yup.string()
                .max(
                  characterLimit,
                  `Must be ${characterLimit} characters or less`
                )
                .required("Required"),
              city: Yup.string()
                .max(20, "Must be 20 characters or less")
                .required("Required"),
              file: Yup.mixed()
                .test(
                  "fileFormat",
                  "Unsupported file type",
                  (value) =>
                    value === null ||
                    (value && supportedFormats.includes(value.type))
                )
                .test(
                  "fileSize",
                  "File too large",
                  (value) =>
                    value === null || (value && value.size <= maxFileSize)
                ),
            })}
            onSubmit={async (values) => {
              await new Promise((r) => setTimeout(r, 500));
              alert(JSON.stringify(values, null, 2));
            }}
          >
            {(formProps) => (
              <Form tw='grid grid-cols-2 gap-10 mt-12'>
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
                <Dropdown
                  label='Prefered method of Contact'
                  name='contactMethod'
                >
                  <option value=''>What's the best way to reach you?</option>
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
