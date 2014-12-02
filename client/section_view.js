Template.SectionView.helpers({
	currentCategory: function() {
		category = Categories.findOne(Session.get("currentCategory"));
		if (category) {
			return category;
		} else {
			return {
				name: "Sections",
				_id: null
			};
		}
	},
	sections: function() {
		console.log("Section View ", this);
		sections = Categories.find({
			parent: this._id
		});

		console.log("Found ", sections.fetch());
		return sections;
	}
});

// Template.SectionView.rendered = function() {
// 	console.log("RENDERED ", this);
// 	first = Categories.findOne({parent: this.data._id});
// 	console.log("First ", first);
// 	$('#'+first._id).addClass("active");
// }
