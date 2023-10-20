const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes")




// express app
const app = express();
// connect to mongodb 
const dbURI = 'mongodb+srv://doo:Godisgood21@nodetuts.a3tfdfi.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result => app.listen(3000))
.catch(err => console.log(err));
// register view engine
app.set("view engine", "ejs");

// Listen for requests
// app.listen(3000)

// Middleware functions
// app.use((req, res, next) => {
//   console.log('new request made:');
//   console.log('host: ', req.hostname);
//   console.log('path: ', req.path);
//   console.log('method: ', req.method);
//   next();
// });

// app.use((req, res, next) => {
//   console.log('in the next middleware');
//   next();
// });

// middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'));  // third party middleware

// // mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//   const blog = new Blog({
//     title: 'new blog 2',
//     snippet: 'about my new blog',
//     body: 'more about my new blog'
//   })

//   blog.save()
//     .then(result => {
//       res.send(result);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// app.get('/all-blogs', (req, res) => {
//   Blog.find()
//   .then((result) => {
//     res.send(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
// });

// app.get('/single-blog', (req, res) => {
//   Blog.findById('653283af7c3cd821c87773e1')
//   .then((result) => {
//     res.send(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
// })

// routes
app.get("/", (req, res) => {
  //res.send('<h3>home page</h3>')
  // const blogs = [
  //   {title: 'Sammii finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  //   {title: 'Jonni finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  //   {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  // ];
  // res.render("index", {title: "Home", blogs});
  res.redirect('/blogs')
});

app.get("/about", (req, res) => {
  //res.send('<h3>about page</h3>')
  // res.sendFile('./views/about.html', { root: __dirname});
  res.render("about", {title: "About"});
});

// // redirects
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// })


// blog routes
app.use('/blogs', blogRoutes)
// app.get('/blogs', (req, res)=> {
//   Blog.find().sort({createdAt: -1})
//   .then((result) => {
// res.render('index', {title: 'All Blogs', blogs: result});
//   })
//   .catch((err) => {
//     console.log(err);
//   })
// })

// app.post('/blogs', (req, res) => {
// const blog = new Blog(req.body)

// blog.save()
// .then((result) => {
//   res.redirect('/blogs')
// })
// .catch((err) => {
//   console.log(err);
// })
// })

// app.get('/blogs/:id', (req, res) => {
//   const id = req.params.id;
//   Blog.findById(id)
//   .then((result) => {
//     res.render('details', {blog: result, title: 'Blog Details'})
//   })
//   .catch((err) => {
//     console.log(err);
//   })
// })

// app.delete('/blogs/:id', (req, res) => {
// const id = req.params.id;

// Blog.findByIdAndDelete(id)
// .then((result) => {
//   res.json({redirect: '/blogs'});
// })
// .catch((err) => {
//   console.log(err);
// })
// })

// app.get("/blogs/create", (req, res) => {
//   res.render("create", {title: "Create a new Blog"});
// });

// 404 Page Not Found use are used to fire middleware function in express
app.use((req, res) => {
  // res.status(404).sendFile('./views/404.html', { root: __dirname});
  res.status(404).render("404", {title: "404"});
});
