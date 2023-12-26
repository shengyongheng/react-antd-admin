/**
 * @desc 图片压缩
 * @param file 图片文件
 * 先进行图片上传前的验证；接着再对图片实现压缩的操作；最后就可以把文件流提交给后台。
 * 具体的思路是：通过FormData构造函数创建一个空对象，将图片绘制到canvas画布上，然后再进行压缩。
 * 用户上传的文件超过一定的大小后就可以执行压缩的操作，当然如果图片太小的话，我们就没必要再压了。
 * 建议采用宽高等比例的方式来压缩，不然可能会出现图片变形的情况。
 */
export const compressImg = (file: File) => {
    let that = this;
    // ?通过FormData构造函数创建一个空对象
    let formData = new FormData();
    let reader = new FileReader();
    // ?将读取到的文件编码成DataURL
    reader.readAsDataURL(file);
    // ?压缩图片
    // reader.onload = function (ev) {
    //     try {
    //         // ?读取图片来获得上传图片的宽高
    //         let img = new Image();
    //         img.src = ev?.target?.result || '';
    //         img.onload = function (ev) {
    //             // ?将图片绘制到canvas画布上进行压缩
    //             let canvas = document.createElement("canvas");
    //             let context = canvas.getContext("2d");
    //             let imgWidth = img.width;
    //             let imgHeight = img.height;
    //             // ?按比例缩放后图片宽高;
    //             let targetWidth = imgWidth;
    //             let targetHeight = imgHeight;
    //             // ?/如果原图宽大于最大宽度
    //             if (targetWidth > targetHeight) {
    //                 // ?原图宽高比例
    //                 let scale = targetHeight / 1280;
    //                 targetHeight = 1280;
    //                 targetWidth = targetWidth / scale;
    //             } else {
    //                 // ?原图宽高比例
    //                 let scale = targetWidth / 1280;
    //                 targetWidth = 1280;
    //                 targetHeight = targetHeight / scale;
    //             }
    //             // ?缩放后高度仍然大于最大高度继续按比例缩小
    //             canvas.width = targetWidth; //canvas的宽=图片的宽
    //             canvas.height = targetHeight; //canvas的高=图片的高
    //             context?.clearRect(0, 0, canvas.width, canvas.height);
    //             context?.drawImage(this, 0, 0, canvas.width, canvas.height);
    //             let data = "";
    //             // ?如果图片小于0.6Mb，不进行压缩，并返回二进制流
    //             if (file.size <= 628288) {
    //                 data = canvas.toDataURL("image/jpeg");
    //                 formData.append("file", file);
    //                 that.handleChange(file);
    //             }
    //             // ?如果图片大于e.6Mb，进行压缩，并返回二进制流
    //             else {
    //                 // todo 压缩文件大小比例
    //                 data = canvas.toDataURL("image/jpeg", 0.4);
    //                 let paper = that.GLOBAL.dataURLtoFile(data, file.name);
    //                 formData.append("file", paper);
    //                 handleChange(paper);
    //             }
    //         };
    //     } catch (error) {
    //         console.log("出现错误", error);
    //     }
    // };
};

// todo 调用上传接口 文件提交给后台
// const handleChange = (file: File) => {
//     let formData = new FormData();
//     formData.append("file", file.raw || file);
//     console.log(formData);
//     brandServices.uploadFile(formData).then((res: any) => {
//         if (res.data.errno === 0) {
//             this.imgUrl = res.data.data;
//             this.dialogImageUrl = URL.createObjectURL(file);
//             this.GLOBAL.messageEvent("success", res.data.message);
//         } else {
//             this.GLOBAL.messageEvent("error", res.data.message);
//         }
//     })
// }

