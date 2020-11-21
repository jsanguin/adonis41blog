'use strict'

const Post = use('App/Models/Post')

// Validator provider must be installed npm i @adonisjs/validator
// then reqistered under start/apps.js as another provider
const { validate } = use('Validator')

class PostsController {
  async index({view}) {

    // const posts = [
    //   { title: 'Post one', body: 'This is post one'},
    //   { title: 'Post two', body: 'This is post two'},
    //   { title: 'Post three', body: 'This is post three'},

    // ]
    const posts = await Post.all();

    return view.render('posts.index', {
      title: "Latest Posts",
      posts: posts.toJSON()
    })

  }

  async details({ view, params}) {
    const post = await Post.find(params.id)

    return view.render('posts.details', {
      post: post
    })
  }

  async add({ view }) {
    return view.render('posts/add')
  }

  async store({request, response, session}) {

    // Validate input
    const validation  = await validate(request.all(), {
      title: 'required|min:10|max:255',
      body: 'required|min:20'
    })

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll()
      return response.redirect('back')
    }

    const post = new Post();
    post.title = request.input('title')
    post.body = request.input('body')

    await post.save()

    session.flash({ notification: "Post added. Thanks!"})

    return response.redirect('/posts')
  }

  async edit({params, view}) {

      const post = await Post.find(params.id)
      return view.render('posts/edit', {
        post: post
      })
  }

  async update({params, request, response, session}) {

    // Validate input
    const validation  = await validate(request.all(), {
      title: 'required|min:10|max:255',
      body: 'required|min:20'
    })

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll()
      return response.redirect('back')
    }

    const post = await Post.find(params.id)
    post.title = request.input('title')
    post.body = request.input('body')

    await post.save()

    session.flash({ notification: 'Post updated. Thanks!'})

    return response.redirect('/posts')

  }

  async destroy({params,response,session}) {

    const post = await Post.find(params.id)

    await post.delete()

    session.flash({ notification: 'Post deleted. Thanks!'})

    return response.redirect('/posts')

  }
}

module.exports = PostsController
