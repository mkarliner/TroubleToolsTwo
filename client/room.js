Template.Room.helpers({
	currentSection: function() {
		cat = Categories.findOne(this.currentSection);
		console.log("CSR ", this, cat);
		return cat;
	},
	beforeRemove: function() {
		return function(collection, id) {
			var doc = Rooms.findOne(id);
			if (confirm('Really delete "' + doc.name + '"?')) {
				this.remove();
			}
		};
	}
});


Template.userPill.labelClass = function() {

  // if (this.status.idle)
  //   return "label-warning"
	if(this.status && this.status.online) {
		return "label-success"
	} else {
		return "label-default"
	}

    
};
