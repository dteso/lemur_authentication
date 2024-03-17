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
 * /api/users/get-self:
 *   get:
 *     summary: Retreives logged user
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
  * /api/users/update-self:
 *   put:
 *     summary: Update logged user
 *     tags: [User]
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
 *     summary: Deletes user by id
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
  * /api/users/delete-self:
 *   delete:
 *     summary: Deletes logged user
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
 */
router.get('/all', [
    authService.validateJWT,
    AuthValidator.checkPermission('USER_LIST')
], UserController.getUsers);

router.get('/get/:id', [
    authService.validateJWT,
    AuthValidator.checkPermission('USER_VIEW')
], UserController.getUser);

router.get('/get-self', [
    authService.validateJWT,
    AuthValidator.checkPermission('USER_VIEW_SELF')
], UserController.getSelfUser);

router.post('/create', [
    authService.validateJWT,
    authService.validateUser,
    AuthValidator.checkPermission('USER_CREATE')
], UserController.postUser);

router.put('/update/:id', [
    authService.validateJWT,
    authService.validateUpdateUser,
    AuthValidator.checkPermission('USER_EDITION')
], UserController.putUser);

router.put('/update-self', [
    authService.validateJWT,
    authService.validateUpdateUser,
    AuthValidator.checkPermission('USER_EDITION_SELF')
], UserController.putSelfUser);

router.delete('/delete/:id', [
    authService.validateJWT,
    AuthValidator.checkPermission('USER_DELETE')
], UserController.deleteUser);

router.delete('/delete-self', [
    authService.validateJWT,
    AuthValidator.checkPermission('USER_DELETE_SELF')
], UserController.deleteSelfUser);

router.patch('/assign-role', [
    authService.validateJWT,
    AuthValidator.checkPermission('USER_EDITION')
], UserController.assignRoleToUserByIds);

export default router;