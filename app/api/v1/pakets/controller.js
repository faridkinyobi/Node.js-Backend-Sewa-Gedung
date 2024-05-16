
const { StatusCodes } = require('http-status-codes');
const {CreatPaket,getAllPaket,getOnePaket,updatePaket, deletPaket}= require("../../../services/mongose/pakets")

const Creat= async (req,res,next) =>{
    try {
        const result = await CreatPaket(req)
        res.status(StatusCodes.CREATED).json({
            data: result,
            msg:"successfully"
        });
    } catch (err) {
        next(err)
    }
}
const update = async (req,res,next) =>{
    try {

        const result = await updatePaket(req);
        res.status(StatusCodes.OK).json({
            data: result,
            msg:"successfully"
        });
    } catch (err) {
        next(err)
    }
}
const getAll = async (req,res,next)=>{
    try {
        const result = await getAllPaket(req)
        res.status(StatusCodes.OK).json({
            data:result
        });
    } catch (err) {
        next(err)
    }
}

const getOne = async (req,res,next)=>{
    try {
        const result = await getOnePaket(req)
        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err)
    }
}


const delet = async (req, res, next) => {
    try {
        const result = await deletPaket(req);
        res.status(StatusCodes.OK).json({ 
            data:result,
            msg: 'successfully' 
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
}