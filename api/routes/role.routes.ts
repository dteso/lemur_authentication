
/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       properties:
 *         name:
 *            type: string
 *            description: The role name property.
 *         description:
 *            type: string
 *            description: The role description property.
 *     RolePermissionUpdate:
 *       type: object
 *       properties:
 *         roleId:
 *            type: number
 *            description: The role id property.
 *         permissionId:
 *            type: string
 *            description: The permission id property.
 * 
 *     RolePermissionsUpdate:
 *       type: object
 *       properties:
 *         roleId:
 *            type: number
 *            description: The role id property.
 *         permissionIds:
 *            type: array
 *            items:
 *              type: number
 *            description: An array of permission id properties.
 */

import { Router } from 'express';
import RoleController from '../controllers/role.controller';
import AuthValidator from '../middlewares/auth-validator';
import AuthService from '../../services/auth.service';

const router = Router();

/**
* @swagger
* tags:
*   name: Role
*   description: The Role managing API
* 
* /api/roles/all:
*   get:
*     summary: Retreives all roles in database
*     tags: [Role]
*     responses:
*       200:
*         description: The retreived Role
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Role'
*       500:
*         description: Some server error
* 
* /api/roles/get/{id}:
*   get:
*     summary: Retreives an role by Id
*     tags: [Role]
*     parameters:
*        - in: path
*          name: id
*          required: true
*          type: string 
*     responses:
*       200:
*         description: The retreived Role
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Role'
*       500:
*         description: Some server error
* 
* /api/roles/get-by-name/{name}:
*   get:
*     summary: Retreives an role by Name
*     tags: [Role]
*     parameters:
*        - in: path
*          name: name
*          required: true
*          type: string 
*     responses:
*       200:
*         description: The retreived Role
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Role'
*       500:
*         description: Some server error
*  
* /api/roles/create:
*   post:
*     summary: Create a new role
*     tags: [Role]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Role'
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
* /api/roles/assign-permission:
*   patch:
*     summary: Adds a new permission to an role
*     tags: [Role]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/RolePermissionUpdate'
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
* /api/roles/assign-permissions:
*   patch:
*     summary: Assing a list of permission to a role clearing previous ones
*     tags: [Role]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/RolePermissionsUpdate'
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
* /api/roles/update/{id}:
*   put:
*     summary: Update an existing role
*     tags: [Role]
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
*             $ref: '#/components/schemas/Role'
*     responses:
*       200:
*         description: The updated Role.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Role'
*       500:
*         description: Some server error
*  
* /api/roles/delete/{id}:
*   delete:
*     summary: Deletes a role by its id
*     tags: [Role]
*     parameters:
*        - in: path
*          name: id
*          required: true
*          type: string 
*     responses:
*       200:
*         description: The retreived Role
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Role'
*       500:
*         description: Some server error
*
* 
* 
*/

const authService = new AuthService();

router.get('/all', [
    authService.validateJWT,
    AuthValidator.checkPermission('ROLE_LIST')
], RoleController.getRoles);

router.get('/get/:id', [
    authService.validateJWT,
    AuthValidator.checkPermission('ROLE_VIEW')
], RoleController.getRole);

router.get('/get-by-name/:name', [
    authService.validateJWT,
    AuthValidator.checkPermission('ROLE_VIEW')
], RoleController.getRoleByName);

router.post('/create', [
    authService.validateJWT,
    AuthValidator.checkPermission('ROLE_CREATE')
], RoleController.postRole);

router.patch('/assign-permission', [
    authService.validateJWT,
    AuthValidator.checkPermission('ROLE_EDITION')
], RoleController.assignPermissionToRoleUsingIds);

router.patch('/assign-permissions', [
    authService.validateJWT,
    AuthValidator.checkPermission('ROLE_EDITION')
], RoleController.assignPermissionsToRoleUsingIds);

router.put('/update/:id', [
    authService.validateJWT,
    AuthValidator.checkPermission('ROLE_EDITION')
], RoleController.putRole);

router.delete('/delete/:id', [
    authService.validateJWT,
    AuthValidator.checkPermission('ROLE_DELETE')
], RoleController.deleteRole);


export default router;
