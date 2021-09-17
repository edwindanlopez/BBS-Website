import tw, { styled } from "twin.macro";

const StyledButton = styled.button(({ variant }) => [
  tw`
    w-full
    rounded-md
    border
    p-3
    inline-flex
    items-center
    justify-center
    focus:outline-none
    focus:ring-2
    focus:ring-inset
  `,
  variant === "primary" &&
    tw`
    max-w-md
    max-h-14
    bg-white
    border-softGreen
    text-softGreen
    hover:text-mossGreen
    focus:ring-mossGreen
  `,
  variant === "secondary" &&
    tw`
    bg-white
    border-mildgray
    text-mildgray
    hover:text-gray-50
    focus:ring-gray-500
  `,
]);

export default StyledButton;
