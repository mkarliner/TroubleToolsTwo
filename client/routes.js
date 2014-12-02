Router.configure({
	layoutTemplate: 'MainLayout'
});


Router.onBeforeAction(function() {
	if (!Meteor.user()) {
		// if the user is not logged in, render the Login template
		// this.layout('LoginLayout');
		this.layout("LoginLayout");
		this.render('Login');
	} else {
		this.next();
	}
});







Router.route('/', function() {
	this.render('Start');
});

Router.route('/logout', function() {
	Meteor.logout();
	Router.go("/");
});

Router.route('/sections/edit/:id', function() {
	this.render('SectionEdit', {
		data: function() {
			return Categories.findOne({
				_id: this.params.id
			});
		}
	});
});

Router.route('/sections', function() {
	this.render('Sections', {
		data: function() {
			sec = Session.get("currentCategory");
			if (sec != undefined ) {
				cat = Categories.findOne({
					_id: sec
				});
				return cat;
			} else {
				return null;
			}		
		}
	});
});

Router.route('/sectionhome', function() {
		this.render('Sections', {
			data: function() {
				return null;
			}
		});
});

Router.route('/rooms/:id', function() {
	this.render('Room', {
		data: function() {
			room = Rooms.findOne({
				_id: this.params.id
			});
			 Session.set("currentRoom", room._id);
			 Session.set("title", "Room: " + room.name);
			 res = Rooms.update({_id: room._id}, {$addToSet: {members: Meteor.userId() }});
			 // console.log("RES", res);
			return room;
		}
	});
});

Router.route('/rooms', function() {
	this.render('Rooms', {
		data: function() {
			return Rooms.find({});
		}
	});
});

