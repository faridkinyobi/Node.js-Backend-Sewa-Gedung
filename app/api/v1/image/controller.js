// import services images
const { createImages,delet } = require('../../../services/mongose/image');

const { StatusCodes } = require('http-status-codes');

const create = async (req, res) => {
    try {
        const result = await createImages(req);
        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};
const destroy = async ( req, res, next) => {
    try {
      const result = await delet(req);
      res.status(StatusCodes.OK).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

module.exports = { create,destroy };