AutoForm.hooks({
	insertCategoryForm: {
		before: {
			insert: function(doc, template) {
				doc.parent = Session.get("currentCategory");
				Meteor.call("incrementRank", function(error, result){
					console.log("Rank returned ", result);
					doc.rank = result;
				});
				console.log("Cat insert", doc);
				return doc;
			}
		},

	},
	updateCategoryForm: {
		onSuccess: function(op, res, template) {
			console.log("After update", op, template.data.doc.parent, template);
			Session.set("currentCategory", template.data.doc._id);
			Router.go("/sections");
		}
	},
	insertMessageForm: {
		before: {
			insert: function(doc, template) {
				doc.room = Session.get("currentRoom");
				doc.who = Meteor.userId();
				console.log("Msg insert", doc);
				return doc;
			}
		},
	}
});



$('#insertMessageForm input').keydown(function(e) {
    if (e.keyCode == 13) {
        $('#form').submit();
    }
});