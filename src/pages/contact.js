import React, { useState } from "react";
import axios from "axios";
import { StaticImage } from "gatsby-plugin-image";

import tw, { theme, styled } from "twin.macro";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

import Layout from "../components/Layout";
import HomePageWrapper from "../components/layoutWrappers/HomePageWrapper";
import Button from "../lib/Button";

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

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const characterLimit = 220;

  const TextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div tw='col-span-1'>
        <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
        <input
          className='text-input'
          tw='w-full text-lg text-orangeAmber border-b border-gray-300'
          {...field}
          {...props}
        />
        {meta.touched && meta.error ? (
          <StyledErrorMessage>{meta.error}</StyledErrorMessage>
        ) : null}
      </div>
    );
  };

  const Dropdown = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div tw='col-span-2'>
        <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
        <StyledSelect {...field} {...props} />
        {meta.touched && meta.error ? (
          <StyledErrorMessage>{meta.error}</StyledErrorMessage>
        ) : null}
      </div>
    );
  };

  const TextArea = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div tw='col-span-2'>
        <div tw='relative'>
          <textarea
            className='text-area'
            tw='w-full h-32 border rounded-md border-gray-300 p-4 mt-4'
            {...field}
            {...props}
          />
          <span tw='absolute right-0 bottom-0 mb-4 mr-4 text-tan font-semibold fontSize[.75rem]'>
            {`${characterLimit - meta.value.length} / ${characterLimit} left`}
          </span>
        </div>
        {meta.touched && meta.error ? (
          <StyledErrorMessage>{meta.error}</StyledErrorMessage>
        ) : null}
      </div>
    );
  };

  // Styled components ....
  const StyledSelect = styled.select(() => [
    tw`w-full text-lg text-orangeAmber border-b border-gray-300 mt-1`,
  ]);

  const StyledErrorMessage = styled.div({
    ...tw`w-full mt-2 text-red-800 fontSize[0.75rem]`,
    "&:before": {
      content: '"❌  "',
      fontSize: "10px",
    },
  });

  const StyledLabel = styled.label(() => [
    tw`w-full text-ltgray fontSize[.75rem]`,
  ]);

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
              media: "",
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
            })}
            onSubmit={async (values, { setSubmitting }) => {
              await new Promise((r) => setTimeout(r, 500));
              setSubmitting(false);
            }}
          >
            <Form tw='grid grid-cols-2 gap-10 mt-12'>
              <TextInput
                label='First Name'
                name='firstName'
                type='text'
                placeholder=''
              />
              <TextInput
                label='Last Name'
                name='lastName'
                type='text'
                placeholder=''
              />
              <Dropdown label='Prefered method of Contact' name='contactMethod'>
                <option value=''>What's the best way to reach you?</option>
                <option value='email'>Email</option>
                <option value='phone'>Phone</option>
              </Dropdown>
              <TextInput
                label='Phone'
                name='phone'
                type='phone'
                placeholder=''
              />
              <TextInput
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
              <TextInput label='City' name='city' type='text' placeholder='' />

              <Button type='submit' variant='primary'>
                Submit
              </Button>
            </Form>
          </Formik>
        </div>
      </HomePageWrapper>
    </Layout>
  );
};

export default ContactForm;
