const express = require('express');
const {getAllUsers, getAllContacts, deleteUserById, updateUserById, getUserById, deleteContactById} = require('../controllers/admin-controller');
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');
const router = express.Router();

router.route('/users').get(authMiddleware, adminMiddleware, getAllUsers);
router.route("/users/:id").get(authMiddleware, adminMiddleware, getUserById);
router.route('/users/delete/:id').delete(authMiddleware, adminMiddleware, deleteUserById);
router.route('/users/update/:id').patch(authMiddleware, adminMiddleware, updateUserById);
router.route('/contacts').get(authMiddleware, adminMiddleware, getAllContacts);
router.route('/contacts/delete/:id').delete(authMiddleware, adminMiddleware, deleteContactById);

module.exports = router;