
/**
 * @swagger
 * components:
 *   schemas:
 *     Permission:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - status
 *       properties:
 *         name:
 *            type: string
 *            description: The permission name property.
 *         description:
 *            type: string
 *            description: The permission name property.
 */

import { Router } from 'express';
import PermissionController from '../controllers/permission.controller';

const router = Router();

/**
* @swagger
* tags:
*   name: Permission
*   description: The Permission managing API
* 
* /api/permissions/all:
*   get:
*     summary: Retreives an permission by Id
*     tags: [Permission]
*     responses:
*       200:
*         description: The retreived Permission
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Permission'
*       500:
*         description: Some server error
* 
* /api/permissions/get/{id}:
*   get:
*     summary: Retreives an permission by Id
*     tags: [Permission]
*     parameters:
*        - in: path
*          name: id
*          required: true
*          type: string 
*     responses:
*       200:
*         description: The retreived Permission
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Permission'
*       500:
*         description: Some server error
*  
* /api/permissions/create:
*   post:
*     summary: Create a new permission
*     tags: [Permission]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Permission'
*     responses:
*       200:
*         description: The created Permission.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Permission'
*       500:
*         description: Some server error
*  
* /api/permissions/update/{id}:
*   put:
*     summary: Update an existing permission
*     tags: [Permission]
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
*             $ref: '#/components/schemas/Permission'
*     responses:
*       200:
*         description: The updated Permission.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Permission'
*       500:
*         description: Some server error
*  
* /api/permissions/delete/{id}:
*   delete:
*     summary: Retreives an permission by Id
*     tags: [Permission]
*     parameters:
*        - in: path
*          name: id
*          required: true
*          type: string 
*     responses:
*       200:
*         description: The retreived Permission
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Permission'
*       500:
*         description: Some server error
*  
*/

/* TODO: Sólo el usuario ADMIN puede hacer operaciones con permisos */
router.get('/all', PermissionController.getPermissions);
router.get('/get/:id', PermissionController.getPermission);
router.post('/create', PermissionController.postPermission);
router.put('/update/:id', PermissionController.putPermission);
router.delete('/delete/:id', PermissionController.deletePermission);

export default router;
