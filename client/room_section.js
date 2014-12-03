Template.roomSection.helpers({
	// currentRoomSection: function(){
	// 	console.log("RS: ", this);
	// 	rs = this;
	// 	if(rs != undefined) {
	// 		console.log("RoomSection ", rs);
	// 		return Categories.findOne({_id: rs});
	// 	} else {
	// 		return null;
	// 	}
	// },
	section: function() {
		//console.log("SEC",this);
		return this;
	},
	messages: function() {
		messages = Messages.find({room: Session.get("currentRoom")});
		console.log("MSGS ", messages);
		return messages;
	}
});