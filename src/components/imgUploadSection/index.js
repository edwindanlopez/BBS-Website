import React, { useState } from "react";
import tw from "twin.macro";
import { StaticImage } from "gatsby-plugin-image";
import { Formik, Form } from "formik";
import axios from "axios";

import PulseLoader from "react-spinners/PulseLoader";
import closeRemoveIcon from "../../images/close-remove-icon.svg";
import Button from "../shared/Button";
import PageLayoutWrapper from "../layoutWrappers/PageLayoutWrapper";
import questionMarkTransparent from "../../images/question-mark-transparent.svg";
import { homePageFormSchema } from "../shared/validationSchema";
import Modal from "../shared/Modal";
import { TextInput, TextArea } from "../shared/FormFieldComponents";
import CloudinaryUpload from "../CloudinaryUploadButton";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const ImageUploadSection = () => {
  const [modalStatus, setModalStatus] = useState({
    isOpen: false,
    success: null,
    failed: null,
    err: null,
  });

  const [uploads, setUploads] = useState([]);

  const removeUpload = (e) => {
    const deleteToken = e.currentTarget.getAttribute("data-delete-token");
    axios({
      method: "post",
      url: `${process.env.GATSBY_CLOUDINARY_DELETE_URL}`,
      headers: { "Content-Type": "application/json" },
      data: {
        token: `${deleteToken}`,
      },
    })
      .then((res) => {
        if (res.data.result === "ok") {
          uploads.map((el, i, arr) => {
            if (el.delete_token === deleteToken) {
              let currentState = Array.from(uploads);
              currentState.splice(i, 1);
              setUploads(currentState);
            }
            return "";
          });
        }
      })
      .catch((err) => {
        console.log("Error encountered: ", err);
        setModalStatus((prevModalStatus) => {
          return {
            ...prevModalStatus,
            isOpen: true,
            success: false,
            failed: true,
            err: null,
          };
        });
      });
  };

  const getAttachments = async () => {
    const files = [];
    uploads.map((el, e, arr) => {
      const pathName = el.path;
      const filename = pathName.substring(pathName.lastIndexOf("/") + 1);
      return files.push({
        publicUrl: el.secure_url,
        fileName: filename,
        fileType: el.resource_type,
      });
    });
    return files;
  };

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (values, resetForm) => {
    const recaptchaRes = await executeRecaptcha("homepage");
    const getAttachmentData = await getAttachments();
    const fieldValues = {
      ...values,
      files: getAttachmentData,
      token: recaptchaRes,
    };

    // console.log("fieldValues with recaptcha token: ", fieldValues);

    await axios({
      method: "post",
      url: `${process.env.GATSBY_HOME_FORM_SUBMISSION_URL}`,
      data: fieldValues,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // console.log("Resolved drive upload: ", res);
        setUploads([]); //needs to come first
        setModalStatus({
          isOpen: true,
          success: true,
          failed: false,
          err: null,
        });
        resetForm();
      })
      .catch((err) => {
        // console.log("Error in submitting form: ", err);
        setUploads([]); //needs to come first
        setModalStatus({
          isOpen: true,
          success: false,
          failed: true,
          err: err.message,
        });
        resetForm();
      });
  };

  const initialValues = {
    fullName: "",
    email: "",
    message: "",
  };

  return (
    <PageLayoutWrapper tw='md:w-full md:max-w-full 2xl:(w-11/12 max-w-screen-2xl)'>
      <Modal modalStatus={modalStatus} setModalStatus={setModalStatus} />
      <div className='section-container' tw='flex flex-wrap md:height[30rem]'>
        <div className='image-wrapper' tw='w-full md:w-2/4'>
          <div tw='w-full relative flex bg-dark flex-wrap justify-center items-center rounded-t-md md:rounded-none 2xl:(rounded-tl-md rounded-bl-md)'>
            <div
              className='form-wrapper'
              tw='absolute z-20 w-full rounded-b-md flex flex-wrap justify-center items-center p-6 md:rounded-none 2xl:rounded-br-md'
            >
              <Formik
                initialValues={initialValues}
                validationSchema={homePageFormSchema}
                onSubmit={(values, { resetForm }) =>
                  handleSubmit(values, resetForm)
                }
              >
                {(formProps) => (
                  <Form
                    id='image-upload-section'
                    acceptCharset='UTF-8'
                    tw='grid grid-cols-2 gap-5'
                  >
                    {uploads && (
                      <CloudinaryUpload
                        type='button'
                        colSpan='2'
                        uploads={uploads}
                        setUploads={setUploads}
                        variant={"featured"}
                      />
                    )}
                    <TextInput
                      colSpan='1'
                      labelColor='light'
                      name='fullName'
                      type='text'
                      placeholder='Enter full name *'
                    />
                    <TextInput
                      colSpan='1'
                      labelColor='light'
                      name='email'
                      type='email'
                      placeholder='Enter Email *'
                    />
                    <TextArea
                      name='message'
                      type='textArea'
                      placeholder='Tell us about your project... *'
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
              tw='w-full height[35rem] md:height[30rem] overflow-hidden opacity-60 rounded-t-md md:rounded-none'
              alt='wooden-floor-in-need-of-repair'
              src='../../images/feat-snap-vid-image.jpg'
            />
          </div>
        </div>
        <div
          className='content-wrapper'
          tw='relative w-full flex flex-wrap justify-center items-center rounded-b-md backgroundColor[#3c3b3b] p-6 height[35rem] sm:height[30rem] md:(rounded-none w-2/4 ) 2xl:(rounded-tr-md)'
        >
          <div
            className='title-section'
            tw='w-full flex flex-wrap justify-center items-center mb-14 md:mb-0 z-10'
          >
            <div
              className='cloudinary-thumbnail-container'
              css={[
                tw`hidden`,
                uploads.length > 0 &&
                  tw`block absolute bottom-0 w-full h-full bg-dark bg-opacity-90 grid grid-cols-1 content-center gap-6 p-6 rounded-b-md shadow-2xl sm:grid-cols-3 md:(rounded-none grid-cols-1) lg:grid-cols-2 xl:(grid-cols-3 gap-4)`,
              ]}
            >
              {uploads.map((thumb, i, arr) => {
                return (
                  <div
                    className='thumbnail-wrapper'
                    tw='relative col-span-1 w-8/12 mx-auto xs:w-2/4 sm:w-5/6 md:w-2/4 lg:w-11/12'
                    key={thumb.asset_id}
                  >
                    <button
                      className='remove-image-upload'
                      data-delete-token={thumb.delete_token}
                      tw='absolute top-0 right-0 rounded-full shadow-md'
                      type='button'
                      onClick={(e) => removeUpload(e)}
                    >
                      <img src={closeRemoveIcon} alt='close-remove-icon' />
                    </button>
                    {thumb.resource_type === "video" ? (
                      <img
                        src={thumb.thumbnail_url}
                        tw='w-full rounded-md ml-auto mr-auto shadow-lg'
                        alt='attached-project-visual'
                      />
                    ) : (
                      <img
                        src={thumb.secure_url}
                        tw='w-full rounded-md ml-auto mr-auto shadow-lg'
                        alt='attached-project-visual'
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <div>
              <img
                tw='mb-8 mx-auto'
                src={questionMarkTransparent}
                alt='question-mark-transparent-icon'
              />
              <h2 tw='w-[85%] mx-auto lg:w-[65%] mb-4 text-center text-white mb-6'>
                Know the problem, but not sure of the fix?
              </h2>

              <p tw='w-11/12 mx-auto lg:w-full text-white max-w-sm text-center leading-6'>
                Send us a couple photos showing us a close-up and full-frame
                view. We'll identifiying possible solutions that will help you
                level up your space.
              </p>
            </div>
          </div>
          <div tw='absolute bottom-2 mt-8'>
            <p tw='fontSize[12px] text-beige font-bold text-center pl-4 pr-4 pb-2'>
              * Max 3 files allowed. Each file cannot be larger than 8mb.
            </p>
          </div>
        </div>
      </div>
      <div tw='w-full flex justify-center items-center mt-4'>
        <p tw='fontSize[0.65rem] text-lightGray'>
          This site is protected by reCAPTCHA and the Google
          <a tw='underline' href='https://policies.google.com/privacy'>
            Privacy Policy
          </a>{" "}
          and
          <a tw='underline' href='https://policies.google.com/terms'>
            Terms of Service
          </a>{" "}
          apply.
        </p>
      </div>
    </PageLayoutWrapper>
  );
};

export default ImageUploadSection;
