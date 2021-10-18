import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  Fragment,
} from "react";
import tw, { css, styled } from "twin.macro";
import * as Yup from "yup";
import { useField } from "formik";

import PulseLoader from "react-spinners/PulseLoader";
import closeRemoveIcon from "../../images/close-remove-icon.svg";
import cloudUploadIconLight from "../../images/cloud-upload-icon-light.svg";
import cloudUploadIconDark from "../../images/cloud-upload-icon-dark.svg";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const characterLimit = 220;

const TextInput = ({ label, colSpan, labelColor, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div css={[colSpan === "1" ? tw`col-span-1` : tw`col-span-2`]}>
      {label && (
        <StyledLabel htmlFor={props.id || props.name} {...{ labelColor }}>
          {label}
        </StyledLabel>
      )}
      <input
        className='text-input'
        css={[
          tw`w-full text-lg text-mildGray border-b border-gray-300 bg-transparent focus-visible:outline-none`,
          labelColor === "light" &&
            css`
              color: white;
              ::placeholder {
                color: white;
              }
            `,
        ]}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </div>
  );
};

const ImageFileUploadInput = forwardRef(
  ({ label, labelColor, values, setFieldValue, ...props }, ref) => {
    const [thumb, setThumb] = useState("");
    const [updatingThumbnail, setUpdatingThumbnail] = useState(false);
    const [field, meta, helpers] = useField(props); //destructured argument order matters
    const { error } = meta;
    const { setValue } = helpers;
    const removeUpload = () => {
      setValue("file", "");
    };
    const imageDetails = {
      name: values.file.name,
      type: values.file.type,
      size: values.file.size,
    };

    useEffect(() => {
      console.log("Field Values: ", values);
      if (values.file.size > 1) {
        setUpdatingThumbnail(true);
        let reader = new FileReader();
        reader.onload = () => {
          // convert to base64 data url
          setTimeout(() => {
            setThumb(reader.result);
            setUpdatingThumbnail(false);
          }, 1500);
        };
        reader.readAsDataURL(values.file);
      }
    }, [values.file]);

    return (
      <div tw='col-span-2 items-center justify-center'>
        <StyledLabel htmlFor={props.id} {...{ labelColor }}>
          <div tw='flex flex-wrap justify-center items-center'>
            <span tw='flex items-center p-6 rounded-md hover:backgroundColor[#f3f3f5] cursor-pointer'>
              <img
                src={cloudUploadIconDark}
                alt='Image upload icon'
                tw='w-12 mr-2'
              />
              {label}
            </span>
          </div>
        </StyledLabel>
        <input
          ref={ref} // passed to parent to clear values after form submission
          className='visually-hidden'
          tw='text-mildGray w-full mt-2'
          {...field}
          {...props}
          value='' // override value from ...field in order to setFieldValue onChange
          onChange={(event) => {
            setFieldValue("file", event.currentTarget.files[0]);
          }}
        />
        {values.file.size > 1 && (
          <ImageUploadPreviewArea
            thumb={thumb}
            updatingThumbnail={updatingThumbnail}
            meta={meta}
            imageDetails={imageDetails}
            removeUpload={removeUpload}
          />
        )}
        {meta.touched && meta.error ? (
          <StyledErrorMessage>{error}</StyledErrorMessage>
        ) : null}
      </div>
    );
  }
);

const ImageUploadPreviewArea = ({
  thumb,
  updatingThumbnail,
  meta,
  imageDetails,
  removeUpload,
}) => {
  const [bytes, setBytes] = useState(0);

  console.log("Incoming bytes: ", imageDetails.size);

  useEffect(() => {
    const decimals = 2;
    const k = 1000;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(imageDetails.size) / Math.log(k));
    const formatedBytes =
      parseFloat((imageDetails.size / Math.pow(k, i)).toFixed(dm)) +
      " " +
      sizes[i];
    setBytes(formatedBytes);
  }, [imageDetails.size]);

  return (
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
            {thumb === "" ? (
              <div tw='flex w-full justify-center'>
                <PulseLoader color='#215130' size={10} />
              </div>
            ) : (
              <div tw='relative flex flex-wrap'>
                <div tw='relative flex flex-wrap justify-center items-center'>
                  <div tw='relative flex flex-wrap justify-center items-center'>
                    {!updatingThumbnail && (
                      <button
                        className='remove-image-upload'
                        tw='absolute z-10 top-5 right-5 rounded-full shadow-md'
                        type='button'
                        onClick={(event) => removeUpload(event)}
                      >
                        <img src={closeRemoveIcon} alt='close-remove-icon' />
                      </button>
                    )}
                    {updatingThumbnail && (
                      <div tw='absolute'>
                        <PulseLoader color='#fefefe' size={10} />
                      </div>
                    )}
                    <img
                      src={thumb}
                      tw='w-full rounded-md ml-auto mr-auto shadow-lg'
                      alt='attached-project-visual'
                    />
                  </div>
                  {!updatingThumbnail && (
                    <div
                      className='img-details'
                      tw='w-full flex flex-wrap mt-2 mb-2 ml-auto mr-auto'
                    >
                      <p tw='fontSize[.85rem] text-mildGray w-full'>{`Name: ${imageDetails.name}`}</p>
                      <p tw='fontSize[.85rem] text-mildGray w-full'>{`Type: ${imageDetails.type}`}</p>
                      <p tw='fontSize[.85rem] text-mildGray w-full'>{`Size: ${bytes}`}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          {meta.touched && meta.error ? (
            <StyledErrorMessage>{`${meta.error}. File size must be under 6 MB`}</StyledErrorMessage>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const MultipleFileUploadInput = forwardRef(
  (
    { setFieldValue, values, setFieldError, label, labelColor, ...props },
    ref
  ) => {
    const [field, meta, helpers] = useField(props); //order important
    const { setTouched } = helpers;
    const handleChange = (evt) => {
      // console.log("Video file: ", evt.target.files[0]);
      setTouched(true);
      setFieldValue("file", evt.target.files[0]);
    };
    return (
      <div tw='col-span-2 items-center justify-center'>
        <label htmlFor='uploadAttachments' tw='w-4 h-4'>
          {/* {label} */}
          <img
            src={cloudUploadIconLight}
            alt='Attach file'
            tw='w-24 p-3 mx-auto mt-4 bg-mossGreen bg-opacity-20 rounded-md hover:(bg-beige bg-opacity-20 rounded-md)'
          />
        </label>
        <input
          multiple
          {...props}
          ref={ref}
          onChange={(evt) => handleChange(evt)}
          tw='w-full text-beige'
        />
        {meta.touched && meta.error ? (
          <StyledErrorMessage>{`${meta.error}. File size must be under 40 MB`}</StyledErrorMessage>
        ) : null}
      </div>
    );
  }
);

const radioOptions = [
  {
    radioKey: "Phone",
    radioValue: "phone",
  },
  {
    radioKey: "Email",
    radioValue: "email",
  },
  {
    radioKey: "Text SMS",
    radioValue: "text-message",
  },
];

const RadioGroup = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div tw='col-span-1'>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <div name={field.name} {...props} tw='flex flex-wrap'>
        {radioOptions.map((el, i) => {
          return (
            <Fragment key={el.radioKey}>
              <div>
                <input
                  type='radio'
                  id={el.radioValue}
                  {...field}
                  // override the value property from ...field, since this is the individual
                  // radio btn value, and not the value of the entire field
                  value={el.radioValue}
                  checked={field.value === el.radioValue}
                ></input>
                <label htmlFor={el.radioValue} tw='ml-1 mr-6'>
                  {el.radioKey}
                </label>
              </div>
            </Fragment>
          );
        })}
      </div>
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </div>
  );
};

const Dropdown = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div tw='col-span-1'>
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
          tw='w-full h-32 border text-lg text-mildGray rounded-md border-gray-300 p-4 mt-4 resize-none'
          {...field}
          {...props}
        />
        <span tw='absolute right-0 bottom-0 mb-4 mr-4 text-mildGray font-semibold fontSize[.75rem]'>
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
                <p tw='text-sm text-mildGray inline'>{`Error for ${err[0]} input...`}</p>
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
  tw`w-full text-lg text-mildGray border-b border-gray-300 mt-1`,
]);

const StyledErrorMessage = styled.div({
  ...tw`w-full mt-2 text-red-800 fontSize[0.75rem]`,
  "&:before": {
    content: '"🤚🏼  "',
    fontSize: "15px",
  },
});

const StyledLabel = styled.label(({ labelColor }) => [
  tw`w-full text-lightGray fontSize[.75rem]`,
  labelColor === "light" && tw`text-beige`,
]);

export {
  TextInput,
  RadioGroup,
  ImageFileUploadInput,
  // MultipleFileUploadInput,
  Dropdown,
  TextArea,
  DisplayFormErrors,
  phoneRegExp,
  characterLimit,
};
