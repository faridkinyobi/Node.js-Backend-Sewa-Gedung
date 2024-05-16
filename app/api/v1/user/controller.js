const { StatusCodes } = require("http-status-codes");
const {
  CreatUser,
  getAllUser,
  getOneUser,
  deletUser,
  createUsers,
  getAllPelanggan,
} = require("../../../services/mongose/user");

const signupAdmin = async (req, res, next) => {
  try {
    const result = await createUsers(req);
    res.status(StatusCodes.CREATED).json({
      data: result,
      msg: "successfully",
    });
  } catch (err) {
    next(err);
  }
};

// const update = async (req,res,next) =>{
//     try {

//         const result = await updatePenyewa(req);
//         res.status(StatusCodes.OK).json({
//             data: result,
//             msg:"successfully"
//         });
//     } catch (err) {
//         next(err)
//     }
// }
const getAllPel = async (req, res, next) => {
  try {
    const result = await getAllPelanggan(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const getAll = async (req, res, next) => {
  try {
    const result = await getAllUser(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const result = await getOneUser(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const delet = async (req, res, next) => {
  try {
    const result = await deletUser(req);
    res.status(StatusCodes.OK).json({
      data: result,
      msg: "successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signupAdmin,
  getAll,
  getAllPel,
  delet,
};
