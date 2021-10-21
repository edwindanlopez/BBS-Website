import React, { useState, useRef } from "react";
import axios from "axios";
import { StaticImage } from "gatsby-plugin-image";
import tw from "twin.macro";
import { Formik, Form } from "formik";

import Layout from "../components/layoutWrappers/Layout";
import PageLayoutWrapper from "../components/layoutWrappers/PageLayoutWrapper";
import Button from "../components/lib/Button";
import CloudinaryUpload from "../components/CloudinaryUploadButton";
import {
  TextInput,
  Dropdown,
  TextArea,
  DisplayFormErrors,
  RadioGroup,
} from "../components/lib/FormFieldComponents";
import { contactPageValidationSchema } from "../components/lib/validationSchema";
import Modal from "../components/lib/Modal";
import closeRemoveIcon from "../images/close-remove-icon.svg";
import PulseLoader from "react-spinners/PulseLoader";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const ContactForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
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

  const handleSubmit = async (values, resetForm) => {
    // Check if the captcha was skipped or not
    if (!executeRecaptcha) {
      return;
    }

    const recaptchaRes = await executeRecaptcha("homepage");
    const getAttachmentData = await getAttachments();
    const fieldValues = {
      ...values,
      files: getAttachmentData,
      token: recaptchaRes,
    };
    console.log("Field Values: ", fieldValues);

    await axios({
      method: "post",
      url: `${process.env.GATSBY_CONTACT_FORM_SUBMISSION_URL}`,
      data: fieldValues,
    })
      .then((res) => {
        console.log("Resolved: ", res);
        setUploads([]); //needs to come first
        setModalStatus({
          isOpen: true,
          success: true,
          failed: false,
          err: null,
        });
        resetForm();
      })
      .catch((error) => {
        console.log("There was an error: ", error);
        setUploads([]); //needs to come first
        setModalStatus({
          isOpen: true,
          success: false,
          failed: false,
          err: error.message,
        });
        resetForm();
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
          <div tw='mt-8 w-full xl:(w-3/4 mx-auto)'>
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
                      label='First Name *'
                      name='firstName'
                      type='text'
                      placeholder=''
                    />
                    <TextInput
                      colSpan='1'
                      label='Last Name *'
                      name='lastName'
                      type='text'
                      placeholder=''
                    />
                    <RadioGroup
                      label='Prefered contact method *'
                      name='contactMethod'
                    />
                    <Dropdown
                      label='Subject Inquiry *'
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
                      label='Phone *'
                      name='phone'
                      type='phone'
                      placeholder=''
                    />
                    <TextInput
                      colSpan='1'
                      label='Email *'
                      name='email'
                      type='email'
                      placeholder=''
                    />
                    <TextArea
                      label='Description *'
                      name='message'
                      type='textArea'
                      placeholder='Tell us about your project...'
                    />
                    <TextInput
                      colSpan='2'
                      label='City *'
                      name='city'
                      type='text'
                      placeholder=''
                    />
                    {uploads && (
                      <div tw='col-span-2 mx-auto'>
                        <CloudinaryUpload
                          type='button'
                          colSpan='2'
                          uploads={uploads}
                          setUploads={setUploads}
                          variant={"standard"}
                        />
                        <p tw='fontSize[0.75rem] mx-auto text-lightGray mt-3'>
                          (Optional file upload)
                        </p>
                      </div>
                    )}
                    <div
                      className='content-wrapper'
                      css={[
                        tw`hidden`,
                        uploads.length > 0 &&
                          tw`col-span-2 flex justify-center items-center sm:h-auto`,
                      ]}
                    >
                      <div
                        className='cloudinary-thumbnail-container'
                        tw='grid content-center gap-6 p-6 rounded-md grid-cols-2 backgroundColor[#eef0f5] sm:(grid-cols-3 gap-4) xl:my-4'
                      >
                        {uploads.map((thumb, i, arr) => {
                          return (
                            <div
                              tw='relative'
                              className='thumbnail-wrapper'
                              key={thumb.asset_id}
                            >
                              <button
                                className='remove-image-upload'
                                data-delete-token={thumb.delete_token}
                                tw='absolute top-0 right-0 rounded-full shadow-md'
                                type='button'
                                onClick={(e) => removeUpload(e)}
                              >
                                <img
                                  src={closeRemoveIcon}
                                  alt='close-remove-icon'
                                />
                              </button>
                              {thumb.resource_type === "video" ? (
                                <img
                                  src={thumb.thumbnail_url}
                                  tw='w-full rounded-md mx-auto shadow-lg'
                                  alt='attached-project-visual'
                                />
                              ) : (
                                <img
                                  src={thumb.secure_url}
                                  tw='w-full rounded-md mx-auto shadow-lg'
                                  alt='attached-project-visual'
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <Button type='submit' variant='primary' tw='col-span-2'>
                      {formProps.isSubmitting ? (
                        <div tw='flex w-full justify-center'>
                          <div tw='mr-2 md:mr-6'>
                            <PulseLoader color='#215130' size={10} />
                          </div>
                          Sending details...
                        </div>
                      ) : (
                        "Submit"
                      )}
                    </Button>
                    <div tw='w-full flex col-span-2'>
                      <p tw='fontSize[0.65rem] text-lightGray'>
                        This site is protected by reCAPTCHA and the Google
                        <a
                          tw='underline'
                          href='https://policies.google.com/privacy'
                        >
                          Privacy Policy
                        </a>{" "}
                        and
                        <a
                          tw='underline'
                          href='https://policies.google.com/terms'
                        >
                          Terms of Service
                        </a>{" "}
                        apply.
                      </p>
                    </div>
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
