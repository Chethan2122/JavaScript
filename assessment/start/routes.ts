

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})
Route.group(() => {
Route.post('create', 'CustomersController.create')
Route.get('read', 'CustomersController.read')
Route.patch('update', 'CustomersController.update')
Route.delete('delete/:id', 'CustomersController.delete')
Route.post('search', 'CustomersController.search')
Route.get('idasc', 'CustomersController.idAsc')
Route.get('iddesc', 'CustomersController.idDesc')
Route.get('nameasc', 'CustomersController.nameAsc')
Route.get('namedesc', 'CustomersController.nameDesc')
Route.post('sortBy', 'CustomersController.sortBy')
Route.get('count', 'CustomersController.count')
}).prefix('customer').middleware('middleware')


Route.group(() => {
Route.post('create', 'HotelsController.create')
Route.get('read', 'HotelsController.read')
Route.patch('update', 'HotelsController.update')
Route.delete('delete/:id', 'HotelsController.delete')
Route.post('search', 'HotelsController.search')
Route.get('address', 'HotelsController.address')
Route.post('sortBy', 'HotelsController.sortBy')
Route.get('join', 'HotelsController.join')
}).prefix('hotel').middleware('middleware')