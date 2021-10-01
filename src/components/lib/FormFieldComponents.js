import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  Fragment,
} from "react";
import tw, { css, styled } from "twin.macro";
import { useField } from "formik";
import PulseLoader from "react-spinners/PulseLoader";
import closeRemoveIcon from "../../images/close-remove-icon.svg";

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
  (
    { label, setFieldValue, values, setFieldError, labelColor, ...props },
    ref
  ) => {
    const [thumb, setThumb] = useState(null);
    const [field, meta, helpers] = useField(props); //destructured placeholder important
    const { setTouched } = helpers;

    useEffect(() => {
      if (values.file && values.file !== null) {
        let reader = new FileReader();
        reader.onload = () => {
          setThumb(reader.result);
        };
        reader.readAsDataURL(values.file);
      }
    }, [values.file]);

    const handleChange = (evt) => {
      setTouched(true);
      setFieldValue("file", evt.target.files[0]);
    };

    const removeUpload = (evt) => {
      // remove formik's fieldValue instance
      setFieldValue("file", null);
    };

    return (
      <div tw='col-span-2 items-center justify-center'>
        <StyledLabel htmlFor={props.id || props.name} {...{ labelColor }}>
          {label}
        </StyledLabel>
        <input
          {...field}
          {...props}
          value={""} // overwrite value being spread in by ...field
          ref={ref}
          onChange={(evt) => handleChange(evt)}
          tw='text-mildGray w-full mt-2'
        />
        {values.file !== null && (
          <ImageUploadPreviewArea
            thumb={thumb}
            values={values}
            meta={meta}
            removeUpload={removeUpload}
          />
        )}
      </div>
    );
  }
);

const ImageUploadPreviewArea = ({ thumb, values, meta, removeUpload }) => {
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1000;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

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
            <button
              className='remove-image-upload'
              tw='absolute top-5 right-5 rounded-full shadow-md'
              type='button'
              onClick={(event) => removeUpload(event)}
            >
              <img src={closeRemoveIcon} alt='close-remove-icon' />
            </button>
            {thumb === null ? (
              <div tw='flex w-full justify-center'>
                <PulseLoader color='#215130' size={10} />
              </div>
            ) : (
              <img
                src={thumb}
                tw='w-full rounded-md ml-auto mr-auto shadow-lg'
                alt='attached-project-visual'
              />
            )}
          </div>
          <div
            className='img-details'
            tw='w-full flex flex-wrap mt-2 mb-2 ml-auto mr-auto'
          >
            <p tw='fontSize[.85rem] text-mildGray w-full'>{`Name: ${
              values.file && values.file.name
            }`}</p>
            <p tw='fontSize[.85rem] text-mildGray w-full'>{`Type: ${
              values.file && values.file.type
            }`}</p>
            <p tw='fontSize[.85rem] text-mildGray w-full'>{`Size: ${formatBytes(
              values.file && values.file.size,
              2
            )}`}</p>
          </div>
          {meta.touched && meta.error ? (
            <StyledErrorMessage>{`${meta.error}. File size must be under 5 MB`}</StyledErrorMessage>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const VideoFileUploadInput = forwardRef(
  (
    { setFieldValue, values, setFieldError, label, labelColor, ...props },
    ref
  ) => {
    const [field, meta, helpers] = useField(props); //order important
    const { setTouched } = helpers;
    const handleChange = (evt) => {
      console.log("Video file: ", evt.target.files[0]);
      setTouched(true);
      setFieldValue("file", evt.target.files[0]);
    };
    // TODO: complete video submission - wire with sendgrid
    return (
      <div tw='col-span-2 items-center justify-center'>
        <StyledLabel htmlFor={field.id || field.name} {...{ labelColor }}>
          {label}
        </StyledLabel>
        <input
          name={field.name}
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
    radioKey: "Text Message",
    radioValue: "text-message",
  },
];

const RadioGroup = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div tw='col-span-1'>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <div name={field.name} {...props}>
        {radioOptions.map((el, i) => {
          return (
            <Fragment key={el.radioKey}>
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
          tw='w-full h-32 border text-lg text-mildGray rounded-md border-gray-300 p-4 mt-4'
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
  VideoFileUploadInput,
  Dropdown,
  TextArea,
  DisplayFormErrors,
  phoneRegExp,
  characterLimit,
};
