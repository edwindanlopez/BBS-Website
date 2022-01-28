import React, { useEffect, useState, forwardRef, Fragment } from "react";
import tw, { css, styled } from "twin.macro";
import { useField } from "formik";

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
        <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
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
  Dropdown,
  TextArea,
  DisplayFormErrors,
  phoneRegExp,
  characterLimit,
};
