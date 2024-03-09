const express = require('express');
const ProfileController = require('../controllers/ProfileController');
const AuthVerifyMiddleware = require('../middleware/AuthVerifyMiddleware');
const TodoListController = require('../controllers/TodoListController')
const router = express.Router();

router.post('/CreateProfile',ProfileController.CreateProfile);
router.post('/UserLogin',ProfileController.UserLogin);

router.post('/SelectProfile',AuthVerifyMiddleware,ProfileController.SelectProfile);
router.post('/UpdateProfile',AuthVerifyMiddleware,ProfileController.UpdateProfile);

router.post('/CreateTodo',AuthVerifyMiddleware,TodoListController.CreateTodo);
router.post('/SelectTodo',AuthVerifyMiddleware,TodoListController.SelectTodo);
router.post('/UpdateTodo',AuthVerifyMiddleware,TodoListController.UpdateTodo);
router.post('/UpdateStatusTodo',AuthVerifyMiddleware,TodoListController.UpdateStatusTodo);
router.post('/RemoveTodo',AuthVerifyMiddleware,TodoListController.RemoveTodo);


module.exports = router;