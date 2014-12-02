
  Meteor.startup(function () {
	  Meteor.publish("userStatus", function() {
	    return Meteor.users.find({ });
	  });
  });
