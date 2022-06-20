const router = require('express').Router();

const UserController = require('./controllers/UserController');

router.get('/', (req, res) => res.json({ success: 'Foiiiiiiiiiiiiiii' }));

router.post('/login', UserController.login);
router.post('/createUser', UserController.createUser);

module.exports = router;
