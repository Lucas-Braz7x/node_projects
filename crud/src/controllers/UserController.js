const connection = require('../database/connection');

const responseModel = {
  success: false,
  data: [],
  error: [],
};

module.exports = {

  async createUser(req, res) {
    const response = { ...responseModel };

    const { userName, password } = req.body;

    const [, affectRows] = await connection.query(`
      INSERT INTO userClient VALUES ( DEFAULT, '${userName}', '${password}');
    `);

    response.success = affectRows > 0;

    return res.json(response);
  },

  async login(req, res) {
    const response = { ...responseModel };

    const { userName, password } = req.body;

    const [, data] = await connection.query(`
      SELECT * FROM userClient WHERE userName='${userName}' AND password='${password}';
    `);

    response.success = data.length > 0;

    return res.json(response);
  },
};
