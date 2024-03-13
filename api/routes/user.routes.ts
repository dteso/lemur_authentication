/**
 * @swagger
 * components:
 *   schemas:
 *     UserRequestDto:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - status
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name
 *         password:
 *           type: string
 *           description: The user's id
 *         email:
 *           type: string
 *           description: The user's email
 *         status:
 *           type: boolean
 *           description: Indicates if user is active
 *         roleId:
 *           type: number
 *           description: The assigned role
 *
 *     UserResponseDto:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - status
 *       properties:
 *         id:
 *           type: number
 *           description: The user's id
 *         name:
 *           type: string
 *           description: The user's name
 *         email:
 *           type: string
 *           description: The user's email
 *         status:
 *           type: boolean
 *           description: Indicates if user is active
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The update date
 * 
 *     UserUpdateDto:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - status
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name
 *         email:
 *           type: string
 *           description: The user's email
 *         status:
 *           type: boolean
 *           description: Indicates if user is active
 * 
 *     UserRoleUpdate:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - status
 *       properties:
 *         userId:
 *            type: number
 *            description: The userId property.
 *         roleId:
 *            type: number
 *            description: The roleId property.
 *     Role:
 *       type: object
 *       properties:
 *         name:
 *            type: string
 *            description: The role name property.
 */

import { Router } from 'express';
import UserController from '../controllers/user.controller';
import AuthService from '../../services/auth.service';
import AuthValidator from '../middlewares/auth-validator';
import { Permissions } from '../../core/consts/permissions';

const router = Router();

const authService = new AuthService();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The User managing API
 * 
 * /api/users/all:
 *   get:
 *     summary: Retreives an user by Id
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The retreived User
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponseDto'
 *       500:
 *         description: Some server error
 * 
 * /api/users/get/{id}:
 *   get:
 *     summary: Retreives an user by Id
 *     tags: [User]
 *     parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          type: string 
 *     responses:
 *       200:
 *         description: The retreived User
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponseDto'
 *       500:
 *         description: Some server error
 * 
 * /api/users/create:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRequestDto'
 *     responses:
 *       200:
 *         description: The created User.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponseDto'
 *       500:
 *         description: Some server error
 * 
  * /api/users/assign-role:
 *   patch:
 *     summary: Assing a new role to an user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRoleUpdate'
 *     responses:
 *       200:
 *         description: The created Role.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       500:
 *         description: Some server error
 * 
 * /api/users/update/{id}:
 *   put:
 *     summary: Update an existing user
 *     tags: [User]
 *     parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          type: string 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdateDto'
 *     responses:
 *       200:
 *         description: The updated User.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponseDto'
 *       500:
 *         description: Some server error
 * 
 * /api/users/delete/{id}:
 *   delete:
 *     summary: Retreives an user by Id
 *     tags: [User]
 *     parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          type: string 
 *     responses:
 *       200:
 *         description: The retreived User
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponseDto'
 *       500:
 *         description: Some server error
 *  
 */
router.get('/all', [
    authService.validateJWT,
    AuthValidator.checkPermission(Permissions.USER_FULL)
], UserController.getUsers); // Sólo el administrador puede ver todos los usuarios

router.get('/get/:id', UserController.getUser); // Sólo puedes ver tu propio usuario a no ser que seas administrador
router.post('/create', UserController.postUser); // Sólo el administrador puede crear usuarios directamente
router.put('/update/:id', UserController.putUser); // Sólo se puede actualizar tu propio usuario no el de otro si tienes permisos de actualizar usuario, excepto el administrador
router.delete('/delete/:id', UserController.deleteUser); // Para borrar un usuario se debe ser administrador
router.patch('/assign-role', UserController.assignRoleToUserByIds); // Para asignar rol a un usuario se debe ser administrador

export default router;