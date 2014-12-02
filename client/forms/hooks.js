AutoForm.hooks({
	insertCategoryForm: {
		before: {
			insert: function(doc, template) {
				doc.parent = Session.get("currentCategory");
				doc.rank = Meteor.call("incrementRank");
				console.log("Cat insert", doc);
				return doc;
			}
		},

	},
	updateCategoryForm: {
		onSuccess: function(op, res, template) {
			console.log("After update", op, template.data.doc.parent, template);
			Session.set("currentCategory", template.data.doc.parent);
			Router.go("/sections/" + template.data.doc._id);
		}
	},
	insertMessageForm: {
		before: {
			insert: function(doc, template) {
				doc.room = Session.get("currentRoom");
				doc.who = Meteor.userId();
				console.log("Cat insert", doc);
				return doc;
			}
		},
	}
});
