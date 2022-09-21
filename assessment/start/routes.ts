

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
Route.get('count', 'CustomersController.count')
}).prefix('customer')


Route.group(() => {
Route.post('create', 'HotelsController.create')
Route.get('read', 'HotelsController.read')
Route.patch('update', 'HotelsController.update')
Route.delete('delete/:id', 'HotelsController.delete')
Route.post('search', 'HotelsController.search')
Route.post('address/:id', 'HotelsController.address')
Route.get('hidasc', 'HotelsController.hIdAsc')
Route.get('hiddesc', 'HotelsController.hIdDesc')
Route.get('cidasc', 'HotelsController.cIdAsc')
Route.get('ciddesc', 'HotelsController.cIdDesc')
Route.get('nameasc', 'HotelsController.nameAsc')
Route.get('namedesc', 'HotelsController.nameDesc')
Route.get('join', 'HotelsController.join')

// Route.get('doornoasc', 'HotelsController.doornoAsc')
// Route.get('doornodesc', 'HotelsController.doornoDesc')
// Route.get('streetasc', 'HotelsController.streetAsc')
// Route.get('streetdesc', 'HotelsController.streetDesc')
// Route.get('landmarkasc', 'HotelsController.landmarkAsc')
// Route.get('landmarkdesc', 'HotelsController.landmarkDesc')
// Route.get('areaasc', 'HotelsController.areaAsc')
// Route.get('areadesc', 'HotelsController.areaDesc')
}).prefix('hotel')