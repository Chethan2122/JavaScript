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

Route.post('all', 'ProjectsController.all').middleware('Project')

Route.group(() => {
Route.post('create', 'EmployeeTablesController.create')
Route.get('read', 'EmployeeTablesController.read')
Route.patch('update', 'EmployeeTablesController.update')
Route.post('delete', 'EmployeeTablesController.delete')
Route.post('readbyid', 'EmployeeTablesController.readbyid')
Route.get('join','EmployeeTablesController.join')
}).middleware('EmployeeTable')


Route.group(() => {
Route.post('add', 'EmpaddressesController.add')
Route.get('know', 'EmpaddressesController.know')
Route.patch('upgrade', 'EmpaddressesController.upgrade')
Route.post('remove', 'EmpaddressesController.remove')
Route.get('combine','EmpaddressesController.combine')
Route.post('searchbyid','EmpaddressesController.searchbyid')
Route.post('searchbyname','EmpaddressesController.searchbyname')
}).middleware('EmpAddress')