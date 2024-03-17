/**
 * @swagger
* components:
*   schemas:
*     UserReqDto:
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
*         password:
*           type: string
*           description: The user's password
*         status:
*           type: boolean
*           description: Indicates if user is active
*         roleId:
*           type: string
*           description: Indicates if role id
*
*     UserResDto:
*       type: object
*       required:
*         - name
*         - email
*         - status
*       properties:
*         id:
*           type: integer
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
* 
*     AuthResponseDto:
*       type: object
*       properties:
*         user:
*           $ref: '#/components/schemas/UserResDto'
*         token:
*           type: string
*           description: The last generated token for request user
*
*     AuthRequestDto:
*       type: object
*       required:
*         - name
*         - email
*         - password
*       properties:
*         name:
*           type: string
*           description: The user's name
*         email:
*           type: string
*           description: The user's email
*         password:
*           type: string
*           description: A valid already registered user's password
*
*     TokenRequestDto:
*       type: object
*       required:
*         - token
*       properties:
*         token:
*           type: string
*           description: The obtained token after login
* 
*     ChangePasswordDto:
*       type: object
*       required:
*         - userId
*         - currentPassword
*         - newPassword
*         - newPasswordConfirmed
*       properties:
*         userId:
*           type: string
*           description: The current pass
*         currentPassword:
*           type: string
*           description: The new password
*         newPassword:
*           type: string
*           description: The new password
*         newPasswordConfirmed:
*           type: string
*           description: Security confirmation for change
*/

import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import AuthService from '../../services/auth.service';

const router = Router();


const authService = new AuthService();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The User managing API
 * 
 * /api/auth/register:
 *   post:
 *     summary: Create a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserReqDto'
 *     responses:
 *       200:
 *         description: The created User.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponseDto'
 *       500:
 *         description: Some server error
 * 
 * /api/auth/login:
 *   post:
 *     summary: Attemps to login requested user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthRequestDto'
 *     responses:
 *       200:
 *         description: The logged User.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponseDto'
 *       500:
 *         description: Some server error
 * 
 * /api/auth/token:
 *   post:
 *     summary: Attemps to login requested user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TokenRequestDto'
 *     responses:
 *       200:
 *         description: The logged User.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponseDto'
 *       500:
 *         description: Some server error
 *  
 * /api/auth/change-password:
 *   post:
 *     summary: Attemps to login requested user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePasswordDto'
 *     responses:
 *       200:
 *         description: The logged User.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponseDto'
 *       500:
 *         description: Some server error
 * 
 */
router.post('/register', [authService.validateUser], AuthController.register);

router.post('/login', [authService.validateLogin], AuthController.login);

router.post('/token', [authService.validateRequiredToken], AuthController.validateToken);

router.post('/change-password', [], AuthController.changePassword);

export default router;