import React, { useState, useRef } from "react";
import "twin.macro";
import { StaticImage } from "gatsby-plugin-image";
import { Formik, Form } from "formik";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";

import Button from "../lib/Button";
import PageLayoutWrapper from "../layoutWrappers/PageLayoutWrapper";
import questionMarkTransparent from "../../images/question-mark-transparent.svg";
import videoIcon from "../../images/video-icon.svg";
import { multipleAttachmentFormSchema } from "../lib/validationSchema";
import Modal from "../lib/Modal";
import ParseAttachmentAsBase64 from "../lib/ParseAttachmentAsBase64";
import {
  TextInput,
  MultipleFileUploadInput,
  TextArea,
} from "../lib/FormFieldComponents";

export default function ImageUploadSection() {
  const [modalStatus, setModalStatus] = useState({
    isOpen: false,
    success: null,
    failed: null,
    err: null,
  });
  const [fieldValues, setFieldValues] = useState("");

  const fileUploadComponentRef = useRef();

  const handleSubmit = async (values, resetForm) => {
    const fileUpload = fileUploadComponentRef.current;
    const fileData = await ParseAttachmentAsBase64(values);
    let formData = new FormData();

    const uploadToDrive = new Promise(async (resolve, reject) => {
      console.log("Logging available values: ", values);
      formData.append("file", values.file);

      axios({
        method: "post",
        url: "/api/googleDriveUpload",
        data: formData,
        headers: {
          "content-type": "multipart/form-data",
        },
      })
        .then((res) => {
          resolve(console.log("Resolved drive upload: ", res));
        })
        .catch((error) => {
          reject(console.log("Error in uploading to drive: ", error));
        });

      resolve();
    });

    //TODO:create thumbnail of video attachment

    // use sendGrid for email confirmation
    const handleResolved = async (value) => {
      console.log("Resolved");
      // setTimeout(() => {
      //   axios({
      //     method: "post",
      //     url: "/api/vercelDevSendgrid",
      //     data: base64Values,
      //   }).then((res) => {
      //     console.log("Sendgrid Resolved: ", res);
      //     fileUpload.value = "";
      //     setModalStatus({
      //       isOpen: true,
      //       success: true,
      //       failed: false,
      //       err: null,
      //     });
      //     resetForm();
      //   });
      // }, 500);
    };

    const handleRejected = (error) => {
      console.log("Handle rejected, error encountered: ", error);
      // if (error.response) {
      //   const { message, code, response } = error;
      //   const { headers, body } = response;
      //   console.error(body);
      // }
      // // remove dom node file input value
      // fileUpload.value = "";
      // setModalStatus({
      //   isOpen: true,
      //   success: false,
      //   failed: false,
      //   err: error.message,
      // });
      // resetForm();
    };

    uploadToDrive.then(handleResolved, handleRejected);
  };

  const initialValues = {
    fullName: "",
    email: "",
    file: null,
    message: "",
  };

  return (
    <PageLayoutWrapper tw='md:w-full md:max-w-full 2xl:(w-11/12 max-w-screen-2xl)'>
      <div className='section-container' tw='flex flex-wrap md:height[30rem]'>
        <div className='image-wrapper' tw='w-full md:w-2/4'>
          <div tw='w-full relative flex bg-dark flex-wrap justify-center items-center rounded-t-md md:rounded-none 2xl:(rounded-tl-md rounded-bl-md)'>
            <div
              className='form-wrapper'
              tw='absolute z-20 w-full rounded-b-md flex flex-wrap justify-center items-center p-6 md:rounded-none 2xl:rounded-br-md'
            >
              <Formik
                initialValues={initialValues}
                validationSchema={multipleAttachmentFormSchema}
                onSubmit={(values, { resetForm }) =>
                  handleSubmit(values, resetForm)
                }
              >
                {(formProps) => (
                  <Form acceptCharset='UTF-8' tw='grid grid-cols-2 gap-5'>
                    <TextInput
                      colSpan='1'
                      labelColor='light'
                      name='fullName'
                      type='text'
                      placeholder='Enter full name'
                    />
                    <TextInput
                      colSpan='1'
                      labelColor='light'
                      name='email'
                      type='email'
                      placeholder='Enter Email'
                    />
                    <MultipleFileUploadInput
                      className='visually-hidden'
                      ref={fileUploadComponentRef}
                      colSpan='2'
                      label='Click to Attach'
                      name='file'
                      id='uploadAttachment'
                      type='file'
                      capture='environment'
                      // accept='video/quicktime, video/mp4, video/x-m4v, video/mov'
                      accept='image/*'
                      setFieldValue={formProps.setFieldValue}
                      setFieldError={formProps.setFieldError}
                      values={formProps.values}
                    />
                    <TextArea
                      label='Description'
                      name='message'
                      type='textArea'
                      placeholder='Tell us about your project...'
                    />
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
                  </Form>
                )}
              </Formik>
            </div>
            <div
              className='img-color-overlay'
              tw='absolute z-10 w-full h-full opacity-60 bg-softGreen rounded-t-md mix-blend-color md:rounded-none'
            />
            <StaticImage
              tw='w-full height[30rem] overflow-hidden opacity-60 rounded-t-md md:rounded-none'
              alt='wooden-floor-in-need-of-repair'
              src='../../images/feat-snap-vid-image.jpg'
            />
          </div>
        </div>
        <div
          className='content-wrapper'
          tw='relative w-full flex flex-wrap justify-center items-center rounded-b-md backgroundColor[#3c3b3b] p-6 md:(rounded-none w-2/4 height[30rem]) 2xl:(rounded-tr-md)'
        >
          <div
            className='title-section'
            tw='w-full flex justify-center items-center mb-14 md:mb-0'
          >
            <div>
              <img
                tw='mb-8 mx-auto'
                src={questionMarkTransparent}
                alt='question-mark-transparent-icon'
              />
              <h2 tw='w-3/4 mx-auto lg:w-full mb-4 text-center text-white mb-6'>
                Know the problem, but not sure of the fix?
              </h2>
              <p tw='w-11/12 mx-auto lg:w-full text-white max-w-sm text-center leading-6'>
                Send us a couple photos showing us a close-up and full-frame
                view. We'll identifiying possible solutions that will help you
                level up your space!
              </p>
            </div>
          </div>
          <div tw='absolute bottom-2 mt-8'>
            <p tw='fontSize[12px] text-beige font-bold text-center pl-4 pr-4 pb-2'>
              * 3 files max allowed. Each file cannot be larger than 7mb.
            </p>
          </div>
        </div>
      </div>
    </PageLayoutWrapper>
  );
}
