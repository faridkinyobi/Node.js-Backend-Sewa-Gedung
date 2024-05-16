
const { StatusCodes } = require('http-status-codes');
const {CreatJadwal,getAllJadwal,getOneJadwal,updateJadwal, deletJadwal,updateStatus}= require("../../../services/mongose/jadwal")

const Creat= async (req,res,next) =>{
    try {
        const result = await CreatJadwal(req)
        res.status(StatusCodes.CREATED).json({
            data: result,
            msg:"success"
        });
    } catch (err) {
        next(err)
    }
}
const update = async (req,res,next) =>{
    try {
        const result = await updateJadwal(req);
        res.status(StatusCodes.OK).json({
            data: result,
            msg:"success"
        });
    } catch (err) {
        next(err)
    }
}
const updateJadwalStatus = async (req,res,next) =>{
    try {

        const result = await updateStatus(req);
        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err)
    }
}
const getAll = async (req,res,next)=>{
    try {
        const result = await getAllJadwal(req)
        res.status(StatusCodes.OK).json({
            data:result
        });
    } catch (err) {
        next(err)
    }
}

const getOne = async (req,res,next)=>{
    try {
        const result = await getOneJadwal(req)
        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err)
    }
}
const delet = async (req, res, next) => {
    try {
        const result = await deletJadwal(req);
        res.status(StatusCodes.OK).json({ 
            data:result,
            msg: 'success' 
        });
    } catch (err) {
        next(err)
    }
};

module.exports={
    Creat,
    getOne,
    getAll,
    update,
    delet,
    updateJadwalStatus
}