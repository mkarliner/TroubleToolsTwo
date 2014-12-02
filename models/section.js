Categories = new Mongo.Collection("categories");

Schemas = {};

Schemas.Category = new SimpleSchema({
	name: {
		type: String,
		label: "Name",
		max: 200
	},
	body: {
		type: String,
		label: "Instructions",
		optional: true,
		autoform: {
			rows: 5
		}
	},
	image: {
		type: String,
		optional: true
	},
	rank: {
		type: Number,
		optional: true,
		decimal: true,
		defaultValue: 99
	},
	parent: {
		type: String,
		optional: true
	}
});

Categories.attachSchema(Schemas.Category);
