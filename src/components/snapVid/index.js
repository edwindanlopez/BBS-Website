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
import { snapValidationSchema } from "../lib/validationSchema";
import Modal from "../../components/lib/Modal";
import ParseAttachmentAsBase64 from "../lib/ParseAttachmentAsBase64";
import {
  TextInput,
  VideoFileUploadInput,
} from "../../components/lib/FormFieldComponents";

export default function Snapavid() {
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
  };

  return (
    <PageLayoutWrapper tw='md:w-full md:max-w-full 2xl:(w-11/12 max-w-screen-2xl)'>
      <div tw='grid grid-cols-1 gap-0 md:grid-cols-2 md:height[26rem]'>
        <div className='image-wrapper' tw='hidden md:block'>
          <div
            className='top-section'
            tw='relative h-full flex bg-dark flex-wrap justify-center items-center overflow-hidden 2xl:(rounded-tl-md rounded-bl-md)'
          >
            <img
              tw='absolute z-10'
              src={questionMarkTransparent}
              alt='question-mark-transparent-icon'
            />
            <div
              className='img-color-overlay'
              tw='absolute z-10 h-full w-full opacity-80 backgroundColor[#d4cdc8] mix-blend-soft-light'
            />
            <StaticImage
              tw='w-full h-full opacity-80 object-cover object-center hidden md:block md:height[29rem]'
              alt='wooden-floor-in-need-of-repair'
              src='../../images/feat-snap-vid-image.jpg'
            />
          </div>
        </div>
        <PageLayoutWrapper tw='md:w-full md:max-w-full'>
          <div className='snap-video-wrapper' tw='relative h-full'>
            <div
              className='top-section'
              tw='backgroundColor[#3c3b3b] rounded-t-md flex flex-wrap justify-center items-center p-6 sm:p-8 md:rounded-none 2xl:rounded-tr-md'
            >
              <h2 tw='mb-4 text-center text-white w-full'>Snap a Video</h2>
              <p tw='text-white max-w-sm text-center leading-6'>
                Know the problem, but not sure of the fix? Shoot us a video
                showing us the space and we’ll help identify a couple options.
              </p>
            </div>
            <div
              className='btm-section'
              tw='height[calc(24rem*.75)] bg-softGreen rounded-b-md flex flex-wrap justify-center items-center md:rounded-none p-4 sm:p-6 2xl:rounded-br-md'
            >
              <Formik
                initialValues={initialValues}
                validationSchema={snapValidationSchema}
                onSubmit={(values, { resetForm }) =>
                  handleSubmit(values, resetForm)
                }
              >
                {(formProps) => (
                  <Form acceptCharset='UTF-8' tw='grid grid-cols-2 gap-5'>
                    <VideoFileUploadInput
                      ref={fileUploadComponentRef}
                      colSpan='2'
                      label='Attach Video'
                      labelColor='light'
                      name='file'
                      type='file'
                      capture='environment'
                      accept='accept="video/quicktime, video/mp4,video/x-m4v,video/mov"'
                      setFieldValue={formProps.setFieldValue}
                      setFieldError={formProps.setFieldError}
                      values={formProps.values}
                    />
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
          </div>
        </PageLayoutWrapper>
      </div>
    </PageLayoutWrapper>
  );
}
