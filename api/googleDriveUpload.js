const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");
let multiparty = require("multiparty");
let http = require("http");
let util = require("util");
const { request } = require("gaxios");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_OAUTH_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_UIR
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});
// instantiate client
google.options({
  auth: oauth2Client,
});

const drive = google.drive({
  version: "v3",
});

let vidUploadsFolderId = "1hD8mU3SUPpRzjdtP8Rp90yeZRk2X_MVH";

const googleDriveUpload = (req, res) => {
  //parse form-data with multiparty
  if (req.method === "POST") {
    let form = new multiparty.Form();
    form.parse(req, async (err, fields, files) => {
      console.log("Files: ", files);
      // console.log("file headers: ", JSON.stringify(files.file[0].headers));

      const accessToken = await oauth2Client.getAccessToken();
      const fileUploadHeaders = files.file[0].headers;
      const fileName = files.file[0].originalFilename;
      const fileSize = Math.round(files.file[0].size / 10);
      const step = 0;
      let chunk = 256 * 1024;
      chunk = chunk > fileSize ? fileSize - 1 : chunk;
      let resumableError = null;
      let newHeaders = { "Content-Range": `bytes 0-${chunk}/${fileSize}` };

      const reqBody = {
        name: fileName,
        mimeType: fileUploadHeaders["content-type"],
      };

      // first request to get resumable uri
      const resumableRequest = await request({
        method: "POST",
        url: "https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable",
        data: reqBody,
        headers: {
          Authorization: `Bearer ${accessToken.token}`,
          "X-Upload-Content-Type": fileUploadHeaders["content-type"],
          "X-Upload-Content-Length": fileSize,
          "Content-Type": "application/json; charset=UTF-8",
          "Content-Length": Buffer.byteLength(JSON.stringify(reqBody)),
        },
      });

      const resumableSessionURI = resumableRequest.headers.location;

      const upload = async (offset, chunkBlk, contentRangeHeader) => {
        const fileContent = fs.readFileSync(
          files.file[0].path,
          "base64",
          (err, data) => data
        );

        const fileContentByteLength = Buffer.byteLength(
          fs.readFileSync(files.file[0].path)
        );

        console.log("File Content Byte Length: ", fileContentByteLength);
        // console.log("Parsed File content: ", fileContent);

        const reqBod = {
          name: fileName,
          parents: [vidUploadsFolderId],
          mimeType: fileUploadHeaders["content-type"],
          body: fileContent.substring(offset, chunkBlk + 1),
        };

        // TODO: getting vercel serverless function error 501 Not Implemented
        // resumable upload function basically complete
        await drive.files
          .create({
            method: "PUT",
            url: resumableSessionURI,
            requestBody: reqBod,
            headers: {
              ...contentRangeHeader,
              // number of bytes in the current chunk
              "Content-Length": chunkBlk,
            },
          })
          .then((result) => {
            console.log("Upload request result: ", result);
            if (result.status === 200) {
              res.json({
                success: true,
                data: result,
                message: "Successful uploaded video",
              });
            } else if (result.status === 308) {
              // continue with next chunk
              let newOffset =
                parseInt(result.headers.get("Range").split("-")[1]) + 1;
              console.log("New Offset: ", newOffset);

              let newChunkBlk = newOffset + 256 * 1024;
              newChunkBlk = newChunkBlk > fileSize ? fileSize - 1 : newChunkBlk;
              console.log("New Chunk Block: ", newChunkBlk);

              let newContentRangeHeader = {
                "Content-Range": `bytes ${newOffset}-${newChunkBlk}/${fileSize}`,
              };
              console.log("New content range header: ", newContentRangeHeader);
              res.json({
                success: false,
                error: result.status,
                message: "Failing",
              });
              // upload(newOffset, newChunkBlk, newContentRangeHeader);
            } else if (result.status === 400) {
              // encountered interruption
              res.json({
                success: false,
                error: result,
                message: "Encountered error",
              });
            }
          });
      };

      upload(step, chunk, newHeaders);

      // res.json({
      //   success: true,
      //   data: response.data,
      //   message: "Successful uploaded video",
      // });

      // console.log(error.message);
      // res.json({
      //   success: false,
      //   error: error,
      //   message: "Encountered error",
      // });

      // multiparty
      // res.writeHead(200, { "content-type": "text/plain" });
      // res.write("received upload: \n\n");
      // res.end(util.inspect({ fields: fields, files: files }));
    });
  } else {
    res.end("Send a POST request.");
    return;
  }
};

module.exports = googleDriveUpload;
