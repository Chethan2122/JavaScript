/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.post('all', 'ProjectsController.all')//.middleware('Project')
Route.post('create', 'EmployeeTablesController.create').middleware('EmployeeTable')
Route.get('read', 'EmployeeTablesController.read').middleware('EmployeeTable')
Route.patch('update', 'EmployeeTablesController.update').middleware('EmployeeTable')
Route.post('delete', 'EmployeeTablesController.delete').middleware('EmployeeTable')
Route.post('readbyid', 'EmployeeTablesController.readbyid').middleware('EmployeeTable')
Route.get('join','EmployeeTablesController.join').middleware('EmployeeTable')
Route.post('add', 'EmpaddressesController.add').middleware('EmpAddress')
Route.get('know', 'EmpaddressesController.know').middleware('EmpAddress')
Route.patch('upgrade', 'EmpaddressesController.upgrade').middleware('EmpAddress')
Route.post('remove', 'EmpaddressesController.remove').middleware('EmpAddress')
Route.get('combine','EmpaddressesController.combine').middleware('EmpAddress')