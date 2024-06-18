const Images = require("../../api/v1/image/model");
const fs = require("fs");
const path = require("path");
const { NotFoundError404, BadRequestError400 } = require("../../error");

const createImages = async (req) => {
  const result = await Images.create({
    name: req.file ? `upload/${req.file.filename}` : "upload/avatar/user.png",
  });
  return result;
};

// const getOneImage = async (id) => {
//   const result = await Images.findOne({ _id: id });
//   if (!result)
//     throw new NotFoundError404(`Tidak ada Gambar dengan id :  ${id}`);
//   return result;
// };
const checkingImage = async (id) => {
  const result = await Images.findOne({ _id: id });
  
  if (!result)
    throw new NotFoundError404(`Tidak ada Gambar dengan id :  ${id}`);

  return result;
};
const DeletImage = async (result) => {

  const id = result.image;
  const resultImas = await Images.findOne({ _id: id });
  // console.log(resultImas)
  if (!resultImas) throw new NotFoundError404(`Tidak ada id image :  ${id}`);

  const imagePath = path.join("public", resultImas.name);
  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  } else {
    throw new BadRequestError400(
      `File gambar tidak ditemukan :  ${imagePath.name}`
    );
  }

  await Images.findByIdAndDelete(id);
};

const delet = async (req) => {
  const { image } = req.params;

  const result = await Images.findOne({ _id: image });

  if (!result) throw new NotFoundError404(`Tidak ada id image :  ${image}`);

  const filePath = path.join("public", result.name);
  const updatedPath = filePath.replace(/\\/g, "/");

  if (fs.existsSync(updatedPath)) {
    fs.unlinkSync(updatedPath);
  } else {
    throw new BadRequestError400(
      `File gambar tidak ditemukan :  ${updatedPath}`
    );
  }

  const del = await Images.findByIdAndDelete(image);
  return del;
};

// export function checkingImage
module.exports = {
  createImages,
  // getOneImage,
  checkingImage,
  DeletImage,
   delet,
};
