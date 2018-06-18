var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Comment = mongoose.model('Comment'),
   List = mongoose.model('List'),
     Item = mongoose.model('Item');
var comment =[];
////////////////////////////////////////////AUTHENTICATION////////////////////////////////////////

/*homepage that will display a link to register or to login   */
router.get('/', function(req, res) {
  res.redirect(301,'/login');
});

/* login page that will allow you to login or if u do not
have a password you can go to the register page*/
router.get('/login', function(req, res) {
  res.render('login',{register:'/register'});
});

router.post('/login', function(req,res,next) {
  // NOTE: use the custom version of authenticate so that we can
  // react to the authentication result... and so that we can
  // propagate an error back to the frontend without using flash
  // messages
  passport.authenticate('local', function(err,user) {
    if(user) {
      // NOTE: using this version of authenticate requires us to
      // call login manually
      req.logIn(user, function(err) {
          res.redirect('/home');
      });
    } else {
      res.render('login', {message:'Your login or password is incorrect.'});
    }
  })(req, res, next);
  // NOTE: notice that this form of authenticate returns a function that
  // we call immediately! See custom callback section of docs:
  // http://passportjs.org/guide/authenticate/
});

/*this page allows you to register then you can go back to the login page to login*/
router.get('/register', function(req, res) {
  res.render('register', {backToLogin:'/login'});
});

router.post('/register', function(req, res) {
  User.register(new User({username:req.body.username}),
      req.body.password, function(err, user){
    if (err) {
      console.log(err);
      // NOTE: error? send message back to registration...
      res.render('register',{message:'Error: Your registration information is not valid'});
    } else {
      // NOTE: once you've registered, you should be logged in automatically
      // ...so call authenticate if there's no error
      passport.authenticate('local')(req, res, function() {
        res.redirect('/home');
      });
    }
  });
});

router.get('/home', function(req, res) {
      res.render('home', {galleryPage: '/book', typeOfArt: '/type', bid:'/bid' });
  });

//////////////////logging out/////////////
router.get('/logout', function(req, res) {
  res.render('logout',{login:'/login'});
});

router.post('/logout', function(req, res){
  console.log("we are logging outttttttttttttttttttttttt");
  req.logOut();
  req.session.destroy();
  res.redirect("/logout");
});

///////////////////////////////////////////////////Gallery stuff////////////////////////////////////////////////

// router.get('/book', function(req, res) {
//   //console.log("in the function");
//   Art.find({title: "Starry Night"}, function(err, art, count) {
//     console.log("in the actaul find function, Art db is next\n");
//     console.log(err);
//     console.log(count);
//    console.log(art);
//    res.render( 'book', { art: art, homePage:'/home'});
//  });
// });

router.get('/type', function(req, res) {
  res.render('type', {homePage:'/home', landscape: '/landscapes', portrait:'/portraits', abstract: '/abstract', stillLife:'/stillLife'});
});

router.get('/bid', function(req, res) {
  res.render('bid',{homePage:'/home', link:'/puzzle'});
});

// router.get('/puzzle', function(req, res) {
//   res.render('puzzle',{bidPage:'/bid'});
// });


router.get('/puzzle', function(req, res) {
  Comment.find({},function(err, list, count) {
    console.log("the list is", list);
    res.render( 'puzzle', { list: list, bidPage:'/bid'});
  });
});

router.post('/puzzle', function(req, res, next) {
  //create a new list instance
   var commentDb = new Comment({
     name: req.body.comment
    });
  commentDb.save(function(err, m, count) {
    console.log("SAVEDDDDDDDDDDDDDDDDDDD");
    if (err) {
     res.render('puzzle', { err: err });
   } else {
     res.redirect(303, '/puzzle');
   }

   });
  });

router.get('/landscapes', function(req, res) {
  res.render('landscapes', {typePage:'/type'});
});

router.get('/portraits', function(req, res) {
  res.render('portraits', {typePage:'/type'});
});

router.get('/abstract', function(req, res) {
  res.render('abstract', {typePage:'/type'});
});

router.get('/stillLife', function(req, res) {
  res.render('stillLife', {typePage:'/type'});
});

////////////////////////////////////////////////////////booking exhibition///////////////////////////////////////////
router.get('/book/create', function(req, res){
 res.render( 'create', {allListUrl:'/book'});
});

//all list page which displays all the list and a link to the create list page
router.get('/book', function(req, res) {
   List.find({},function(err, list, count) {
     console.log(list);
     res.render( 'book', { list: list, homePage:'/home', createNewListUrl:'/book/create',	listPage:'/book/:slug', slug: req.params.slug});
   });
});

router.get('/book/create', function(req, res){
 res.render( 'create', {allListUrl:'/book'});
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//this will get the page with the specific exhibition details
router.get('/book/:slug', function(req, res){
	List.findOne({slug: req.params.slug },function(err, list, count) {
    console.log("this is a specific list", list);
        res.render('name-createdBy',{ info:list, bookingPage:'/book', slug:req.params.slug});
    });
});

/////////////////////////////////////////////////COMMENTS///////////////////////////////////////////////////////
//used for booking a new exhibition
router.post('/book/create', function(req, res) {
	//create a new list instance
	 var list1 = new List({
		 name: req.body.nameOfShow,
		 createdBy: req.body.nameOfPerson,
     contact: req.body.contactNumber,
     date: req.body.dateOfShow,
     email: req.body.emails
		});
	list1.save(function(err, m, count) {
    console.log("SAVEDDDDDDDDDDDDDDDDDDD");
    if (err) {
     res.render('create', { list1:list1, err: err });
   } else {
     res.redirect(303, '/book');
   }

	 });
});

//this is for commenting on an exhibition
router.post('/book/:slug', function(req, res) {
	//create a new comment instance
	 var item1 = new Item({
		 name: req.body.comment
		});


		//find the list to add this item to.
		List.findOne({slug: req.body.slug}, function(err, list, count) {
      console.log(req.body.slug);
      console.log("next line is list");
      console.log(list);

			var items = list.items;
			items.push(item1);
			list.markModified('items');
			list.save(function(err, modifiedList, count) {
        if (err) {
         res.redirect(303, '/book/' + req.body.slug);
       } else {
         res.redirect(303, '/book/' + req.body.slug);
       }

			});
		});
});

module.exports = router;
