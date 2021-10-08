const ParseAttachmentAsBase64 = (vals) => {
  // create copy
  let newValues = JSON.parse(JSON.stringify(vals));

  //remove data-url declaration from base64 string
  const stripBase64Str = (str) => {
    let base64str = str.replace(
      /(data:image\/)(gif|jpe?g|png)(;base64,)/gm,
      ""
    );
    return base64str;
  };

  // parse file to dataUrl if user attaches file
  if (vals.file) {
    let reader = new FileReader();
    reader.onload = () => {
      newValues.file = {
        base64Url: stripBase64Str(reader.result),
        filename: vals.file.name,
        type: vals.file.type,
        size: vals.file.size,
        lastModifiedDate: vals.file.lastModifiedDate,
        lastModified: vals.file.lastModified,
      };
    };
    reader.readAsDataURL(vals.file);
  }
  return newValues;
};

export default ParseAttachmentAsBase64;
