import tw, { styled } from "twin.macro";

const StyledButton = styled.button(({ variant }) => [
  tw`
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
    w-4/5
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
    w-3/5
    bg-white
    border-mildgray
    text-mildgray
    hover:text-gray-50
    focus:ring-gray-500
  `,
]);

export default StyledButton;
// export const StyledButton = styled.button(({ isSecondary }) => [
//   // updated
//   tw`py-3 px-8 uppercase rounded border border-primary hover:bg-primary duration-200`,

//   css`
//     & {
//       background-color: ${theme`colors.whiteAlt`};
//     }

//     &:hover {
//       font-size: 2rem;
//     }
//   `,

//   isSecondary && tw`border-secondary hover:bg-secondary hover:text-white`, // new
// ]);
