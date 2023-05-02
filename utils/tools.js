export const toDataUrl = (file) => {
  var reader = new FileReader();
  return new Promise(function (resolve, reject) {
    reader.onload = function (e) {
      resolve(e.target.result);
    };
    reader.readAsDataURL(file);
  });
};
