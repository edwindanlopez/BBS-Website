import React, { useState, useRef } from "react";
import axios from "axios";
import { StaticImage } from "gatsby-plugin-image";

import "twin.macro";
import { Formik, Form } from "formik";

import Layout from "../components/layoutWrappers/Layout";
import PageLayoutWrapper from "../components/layoutWrappers/PageLayoutWrapper";
import Button from "../components/lib/Button";
import ParseAttachmentAsBase64 from "../components/lib/ParseAttachmentAsBase64";
import {
  TextInput,
  ImageFileUploadInput,
  Dropdown,
  TextArea,
  DisplayFormErrors,
  RadioGroup,
} from "../components/lib/FormFieldComponents";
import { contactPageValidationSchema } from "../components/lib/validationSchema";
import Modal from "../components/lib/Modal";
import PulseLoader from "react-spinners/PulseLoader";

const ContactForm = () => {
  const [modalStatus, setModalStatus] = useState({
    isOpen: false,
    success: null,
    failed: null,
    err: null,
  });

  const fileUploadComponentRef = useRef();

  const handleSubmit = async (values, resetForm) => {
    const formValues = await ParseAttachmentAsBase64(values);
    console.log("new form data: ", formValues);

    await new Promise(async (resolve, reject) => {
      const fileUpload = fileUploadComponentRef.current;
      setTimeout(() => {
        axios({
          method: "post",
          url: `${process.env.GATSBY_CONTACT_FORM_SUBMISSION_URL}`,
          data: formValues,
        })
          .then((res) => {
            console.log("Resolved: ", res);
            fileUpload.value = "";
            resolve(
              setModalStatus({
                isOpen: true,
                success: true,
                failed: false,
                err: null,
              })
            );
            resetForm();
          })
          .catch((error) => {
            console.log("There was an error: ", error);
            // remove dom node file input value
            fileUpload.value = "";
            reject(
              setModalStatus({
                isOpen: true,
                success: false,
                failed: false,
                err: error.message,
              })
            );
            resetForm();
          });
      }, 500);
    }).catch((err) => {
      console.log("Logging the parent promise error: ", err);
    });
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    contactMethod: "",
    subject: "",
    phone: "",
    email: "",
    message: "",
    city: "",
    file: "",
  };

  return (
    <Layout seoTitle={"Contact"}>
      <div className='contact-page-container' tw='mb-20'>
        <Modal modalStatus={modalStatus} setModalStatus={setModalStatus} />
        <div id='top-hero' tw='flex items-center h-96' style={{ zIndex: "-1" }}>
          <div
            id='hero-img'
            tw='w-full h-full overflow-hidden'
            style={{ zIndex: "-1" }}
          >
            <StaticImage
              alt='BBS Hero image of beautiful refurnished white kitchen cabinet'
              src='../images/bbs-top-hero-image.jpg'
              tw='w-full h-full object-cover object-center transform scale-150'
            />
          </div>
        </div>
        <PageLayoutWrapper>
          <div tw='mt-8 w-full 2xl:(w-3/4 mx-auto)'>
            <div>
              <h1 tw='text-dark mb-6 lg:(mt-14 fontSize[2.15rem] lineHeight[3.15rem])'>
                Whether you’re looking for a secondary reference, or want to
                level up your space, we guarantee transparency.
              </h1>
              <h2 tw='mb-8 lg:(fontSize[1.75rem] lineHeight[2rem] mt-14 mb-14)'>
                Fill out the form below and we’ll get back to you within 24
                hours
              </h2>
            </div>
            <div>
              <Formik
                initialValues={initialValues}
                validationSchema={contactPageValidationSchema}
                onSubmit={(values, { resetForm }) =>
                  handleSubmit(values, resetForm)
                }
              >
                {(formProps) => (
                  <Form acceptCharset='UTF-8' tw='grid grid-cols-2 gap-7 mt-12'>
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
                    <RadioGroup
                      label='Prefered contact method'
                      name='contactMethod'
                    />
                    <Dropdown
                      label='Subject Inquiry'
                      name='subject'
                      aria-label='Inquiry select option'
                    >
                      <option value='' label='' aria-label='Select a subject' />
                      <option
                        value='General Contact'
                        aria-label='General contact select option'
                      >
                        General Contact
                      </option>
                      <option
                        value='Estimate'
                        aria-label='Estimate select option'
                      >
                        Estimate
                      </option>
                      <option
                        value='Question/Other'
                        aria-label='Question or other, select option'
                      >
                        Question/Other
                      </option>
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
                      name='message'
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
                    <ImageFileUploadInput
                      ref={fileUploadComponentRef}
                      colSpan='2'
                      label='Attach Photo'
                      id='file'
                      name='file'
                      type='file'
                      capture='environment'
                      accept='image/*'
                      values={formProps.values}
                      setFieldValue={formProps.setFieldValue}
                    />
                    <input type='hidden' name='you_shall_not_pass_bot' />
                    <Button type='submit' variant='primary' tw='col-span-2'>
                      {formProps.isSubmitting ? (
                        <div tw='flex w-full justify-center'>
                          <div tw='mr-2 md:mr-6'>
                            <PulseLoader color='#215130' size={10} />
                          </div>
                          {formProps.values.file &&
                            "Uploading your attachment..."}
                        </div>
                      ) : (
                        "Submit"
                      )}
                    </Button>
                    <DisplayFormErrors
                      errors={formProps.errors}
                      touched={formProps.touched}
                    />
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </PageLayoutWrapper>
      </div>
    </Layout>
  );
};

export default ContactForm;
