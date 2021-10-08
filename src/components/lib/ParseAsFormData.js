const ParseAsFormData = (vals) => {
  let formData = new FormData();

  if (vals.file) {
    // store all field values in formData
    for (const [key, value] of Object.entries(vals)) {
      formData.append(key, value);
    }
  }

  // // log form data
  // for (var pair of formData.entries()) {
  //   console.log(pair[0] + ", " + pair[1]);
  // }

  return formData;
};

export default ParseAsFormData;
