
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

/* TODO: Sólo el usuario ADMIN puede hacer operaciones con roles */
router.get('/all', RoleController.getRoles);
router.get('/get/:id', RoleController.getRole);
router.get('/get-by-name/:name', RoleController.getRoleByName);
router.post('/create', RoleController.postRole);
router.patch('/assign-permission', RoleController.assignPermissionToRoleUsingIds);
router.patch('/assign-permissions', RoleController.assignPermissionsToRoleUsingIds);
router.put('/update/:id', RoleController.putRole);
router.delete('/delete/:id', RoleController.deleteRole);

export default router;
