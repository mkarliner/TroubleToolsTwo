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
	fileId: {
		type: String,
		label: "Image",
		optional: true,
		autoform: {
			type: "cfs-file",
			collection: "images"
		}
	},
	rank: {
		type: Number,
		optional: true,
		decimal: true
	},
	parent: {
		type: String,
		optional: true
	}
});

Categories.attachSchema(Schemas.Category);
