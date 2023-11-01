const { getAllUsers, createUser, updateUser } = require("../services/index");

const get = async (req, res, next) => {
  try {
    const results = await getAllUsers();
    res.json({
      status: "Success",
      code: 200,
      data: results,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      code: 404,
    });
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { nume, varsta, anNastere, oras, cetatenie, major } = req.body;
    const result = await createUser({
      nume,
      varsta,
      anNastere,
      oras,
      cetatenie,
      major,
    });

    res.status(201).json({
      status: "succes",
      code: 201,
      data: result,
    });
  } catch (error) {}
};

const update = async (req, res, next) => {
  const { userId } = req.params;
  const { major } = req.body;
  try {
    const result = await updateUser(userId, { major });
    console.log(result);
    if (result) {
      res.status(200).json({
        status: "updated",
        code: 200,
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "error",
    });
  }
};

module.exports = {
  get,
  create,
  update,
};
