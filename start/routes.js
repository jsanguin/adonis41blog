'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('home')

Route.get('/posts', 'PostsController.index')

Route.get('/posts/add', 'PostsController.add')

Route.get('/posts/edit/:id', 'PostsController.edit')

Route.get('/posts/:id', 'PostsController.details')

Route.post('/posts', 'PostsController.store')

Route.put('/posts/:id', 'PostsController.update')

Route.delete('/posts/:id', 'PostsController.destroy')
