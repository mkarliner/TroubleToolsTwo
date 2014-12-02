Messages = new Mongo.Collection("messages");

Schemas = {};

Schemas.Message = new SimpleSchema({
	who: {
		type: String,
	},
	body: {
		type: String,
		label: function() {
			return " ";
		},
		optional: true,
	},
	room: {
		type: String,
		optional: true
	}
});

Messages.attachSchema(Schemas.Message);