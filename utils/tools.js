
export const toDataUrl = (file) => {
    var reader = new FileReader()
    return new Promise(function (resolve, reject) {
        reader.onload = function (e) {
            // console.log(e.target.result);
            resolve(e.target.result)
        }
        reader.readAsDataURL(file)
    })
}