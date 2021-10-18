import React, { useEffect, useState } from "react";
import cloudUploadIcon from "../images/cloud-upload-icon-light.svg";
import tw from "twin.macro";

const CloudinaryUpload = ({ type, colSpan, uploads, setUploads }) => {
  const [uploadWidget, setUploadWidget] = useState(null);

  useEffect(() => {
    const getUploadWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "bldrscove",
        uploadPreset: "BBS-Unsigned",
        sources: ["local", "camera"],
        multiple: true,
        defaultSource: "local",
        maxFiles: 3,
        folder: "user-uploads",
        context: { alt: "my_alt", caption: "my_caption" },
        clientAllowedFormats: ["image", "video"],
        maxImageFileSize: 9000000, //9mb
        maxVideoFileSize: 60000000, //60mb
        maxChunkSize: 5000000, //5mb
        form: "#image-upload-section",
        // thumbnails: ".title-section .cloudinary-thumbnail-container",
        styles: {
          palette: {
            window: "#FFFFFF",
            sourceBg: "#F3F2F2",
            windowBorder: "#B5B1AF",
            tabIcon: "#739B7E",
            inactiveTabIcon: "#505050",
            menuIcons: "#739B7E",
            link: "#739B7E",
            action: "#B85F53",
            inProgress: "#B85F53",
            complete: "#739B7E",
            error: "#c43737",
            textDark: "#505050",
            textLight: "#FFFFFF",
          },
        },
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);

          setUploads((prevState) => {
            return [...prevState, result.info];
          });
        }
      }
    );

    setUploadWidget(getUploadWidget);

    // clean up state
    return () => setUploadWidget(null);
  }, [setUploads]);

  // Render the image in a React component.
  return (
    <div css={[colSpan === "1" ? tw`col-span-1` : tw`col-span-2`]}>
      <div tw='w-full flex justify-center items-center'>
        <button
          type={type}
          key='notsubmit'
          disabled={uploads.length >= 3 ? true : false}
          onClick={() => uploadWidget.open()}
        >
          <img
            src={cloudUploadIcon}
            alt='Upload files icon'
            css={[
              tw`w-24 p-3 mx-auto mt-4 bg-mossGreen bg-opacity-20 rounded-md hover:(bg-beige bg-opacity-20 rounded-md)`,
              uploads.length >= 3 &&
                tw`opacity-20 hover:(bg-none bg-opacity-0 rounded-md)`,
            ]}
          />
        </button>
      </div>
    </div>
  );
};

export default CloudinaryUpload;
