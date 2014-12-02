Rooms = new Mongo.Collection("rooms");

Schemas = {};

Schemas.Room = new SimpleSchema({
	name: {
		type: String,
		label: "Name",
		max: 200
	},
	comments: {
		type: String,
		label: "Comments",
		optional: true,
		autoform: {
			rows: 5
		}
	},
	members: {
		type: [String],
		optional: true
	},
	currentSection: {
		type: String,
		optional: true
	}
});

Rooms.attachSchema(Schemas.Room);