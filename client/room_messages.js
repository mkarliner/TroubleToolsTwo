Template.roomMessages.helpers({
	messages: function() {
		messages = Messages.find({room: this._id}).fetch().reverse();
		console.log("MSGS ", messages);
		return messages;
	},
	currMembers: function(){
		// console.log("asdf", this)
		mems =  Meteor.users.find({_id: {$in:  this.members }});
		// console.log(mems.fetch());
		return mems;
	},
	title: function() {
		return this.name;
	},
	username: function(msg) {
		user = Meteor.users.findOne(this.who);
		return user.username;
	}
});