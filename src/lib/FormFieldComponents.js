import React, { useEffect, useState, useRef } from "react";
import tw, { styled } from "twin.macro";
import { useField } from "formik";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const characterLimit = 220;

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

const TextInput = ({ label, colSpan, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div css={[colSpan == 1 ? tw`col-span-1` : tw`col-span-2`]}>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <input
        className='text-input'
        tw='w-full text-lg text-mildgray border-b border-gray-300 focus-visible:outline-none'
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </div>
  );
};

const FileUploadInput = ({
  label,
  setFieldValue,
  values,
  setFieldError,
  ...props
}) => {
  const [thumb, setThumb] = useState(values.file);
  const imgInput = useRef();
  const [field, meta, helpers] = useField(props);

  const { setTouched } = helpers;

  useEffect(() => {
    if (values.file !== null) {
      let reader = new FileReader();
      reader.onload = () => {
        setThumb(reader.result);
      };
      reader.readAsDataURL(values.file);
    }
  }, [values.file]);

  const removeUpload = (evt) => {
    // remove both the dom node and formik's fieldValue instance
    const imgUpload = imgInput.current;
    imgUpload.value = "";
    setFieldValue("file", null);
  };

  return (
    <div tw='col-span-2 items-center justify-center'>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <input
        {...props}
        ref={imgInput}
        onChange={(evt) => {
          setTouched(true);
          setFieldValue("file", evt.target.files[0]);
        }}
        tw='text-mildgray w-full mt-2'
      />
      {values.file !== null && (
        <div>
          <div
            id='previewArea'
            tw='rounded-md w-full backgroundColor[#eef0f5] mt-4 p-5'
          >
            <div
              className='upload-container'
              tw='w-9/12 flex flex-wrap justify-center items-center mr-auto ml-auto'
            >
              <div className='img-wrapper' tw='relative w-full'>
                <button
                  tw='absolute top-5 right-5 rounded-full shadow-md'
                  type='button'
                  onClick={(event) => removeUpload(event)}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='28'
                    height='28'
                  >
                    <g fill='#fcfcfc'>
                      <path d='M14.001 27a12.916 12.916 0 0 1-9.193-3.807A12.915 12.915 0 0 1 1 14c0-3.472 1.352-6.737 3.808-9.192A12.915 12.915 0 0 1 14 1c3.473 0 6.737 1.352 9.193 3.808A12.915 12.915 0 0 1 27 14c0 3.472-1.352 6.737-3.807 9.192A12.914 12.914 0 0 1 14 27Z' />
                      <path
                        d='M14 2a11.962 11.962 0 0 0-8.485 3.515c-4.686 4.686-4.686 12.284 0 16.97 4.686 4.687 12.284 4.687 16.97 0 4.687-4.686 4.687-12.284 0-16.97A11.963 11.963 0 0 0 14 2m4.242 16.993a.748.748 0 0 1-.53-.22l-3.713-3.712-3.712 3.712a.75.75 0 1 1-1.06-1.06L12.939 14l-3.712-3.712a.75.75 0 0 1 1.06-1.06L14 12.939l3.712-3.712a.75.75 0 1 1 1.06 1.061L15.06 14l3.712 3.713a.75.75 0 0 1-.53 1.28M14 0c3.74 0 7.256 1.456 9.9 4.1A13.909 13.909 0 0 1 28 14c0 3.74-1.456 7.255-4.1 9.9A13.908 13.908 0 0 1 14 28c-3.74 0-7.255-1.456-9.9-4.1A13.908 13.908 0 0 1 0 14c0-3.74 1.456-7.255 4.1-9.9A13.908 13.908 0 0 1 14 0Z'
                        fill='#818389'
                      />
                    </g>
                  </svg>
                </button>
                <img
                  src={thumb}
                  tw='w-full rounded-md ml-auto mr-auto shadow-lg'
                />
              </div>
              <div
                className='img-details'
                tw='w-full flex flex-wrap mt-2 mb-2 ml-auto mr-auto'
              >
                <p tw='fontSize[.85rem] text-mildgray w-full'>{`Name: ${values.file.name}`}</p>
                <p tw='fontSize[.85rem] text-mildgray w-full'>{`Type: ${values.file.type}`}</p>
                <p tw='fontSize[.85rem] text-mildgray w-full'>{`Size: ${formatBytes(
                  values.file.size,
                  2
                )}`}</p>
              </div>
              {meta.touched && meta.error ? (
                <StyledErrorMessage>{`${meta.error}. File size must be under 5 MB`}</StyledErrorMessage>
              ) : null}
            </div>
          </div>
        </div>
      )}
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
          tw='w-full h-32 border text-lg text-mildgray rounded-md border-gray-300 p-4 mt-4'
          {...field}
          {...props}
        />
        <span tw='absolute right-0 bottom-0 mb-4 mr-4 text-mildgray font-semibold fontSize[.75rem]'>
          {`${characterLimit - meta.value.length} / ${characterLimit} left`}
        </span>
      </div>
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </div>
  );
};

const DisplayFormErrors = ({ errors, touched }) => {
  return (
    // if errors is not an empty object
    errors &&
    Object.keys(errors).length !== 0 &&
    (() => {
      const errs = [];

      for (const [key, value] of Object.entries(errors)) {
        // only push errors if they were touched
        for (const prop in touched) {
          if (prop === key) {
            errs.push([key, value]);
          }
        }
      }

      return (
        <div className='pending-errors' tw='w-full col-span-2 flex flex-wrap'>
          {errs.map((err, i) => {
            return (
              <span key={i} tw='w-full mb-2'>
                <p tw='text-sm text-mildgray inline'>{`Error for ${err[0]} input...`}</p>
                <p tw='text-sm font-semibold text-orangeAmber inline ml-2'>
                  {err[1]}
                </p>
              </span>
            );
          })}
        </div>
      );
    })()
  );
};

// Styled components ....
const StyledSelect = styled.select(() => [
  tw`w-full text-lg text-mildgray border-b border-gray-300 mt-1`,
]);

const StyledErrorMessage = styled.div({
  ...tw`w-full mt-2 text-red-800 fontSize[0.75rem]`,
  "&:before": {
    content: '"🤚🏼  "',
    fontSize: "15px",
  },
});

const StyledLabel = styled.label(() => [
  tw`w-full text-ltgray fontSize[.75rem]`,
]);

export {
  TextInput,
  FileUploadInput,
  Dropdown,
  TextArea,
  DisplayFormErrors,
  phoneRegExp,
  characterLimit,
};
