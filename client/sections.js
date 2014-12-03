Template.Sections.helpers({
	currentCategory: function() {
		//console.log("SECS: ", this);
		if(this.data) {
			this.data.inRoom = true;
			// console.log(" AFTER: ", this);
			return this.data;
		} else {
			category = Categories.findOne(Session.get("currentCategory"));
			// console.log("currcat ", category);
			if (category) {
				return category;
			} else {
				return {
					name: "Sections",
					_id: null
				};
			}
		}

	},
	breadcrumbs: function() {
		startCat = this;
		breadcrumbs = [startCat];
		currCat = startCat;
		while (currCat) {
			parent = Categories.findOne({
				_id: currCat.parent
			});
			if(parent) {
				breadcrumbs.push(parent);
			}
			currCat = parent;
		}
		return breadcrumbs.reverse();
	},
	notInRoom: function(){
		//console.log("INROOM ", this);
		if(this.inRoom){
			return false;
		} else {
			return true;
		}
	},
	empty: function(){
		if(this.body == undefined || Session.get("currentSection") == undefined) {
			return true;
		} else {
			return false;
		}
		
	},
	sections: function() {
		category = Categories.findOne(Session.get("currentCategory"));
		
		// console.log("Categddory ", category);
		if (!$.isEmptyObject(category)) {
			sections = Categories.find({
				parent: category._id
			}, {
				sort: {
					rank: 1
				}
			});
			console.log("Level ", sections.fetch());
		} else {
			console.log("at top level");
			sections = Categories.find({
				parent: null
			});
		}

		// console.log("Found ", sections);
		return sections;
	},
	next: function() {
		category = this;
		nxt =  Categories.find({parent: category.parent, rank: {$gt: category.rank}}, {sort: {rank: 1}}).fetch()[0];
		// console.log("NXT", nxt);
		return nxt;
	},
	previous: function() {
		category = this;
		prev =  Categories.find({parent: category.parent, rank: {$lt: category.rank}}, {sort: {rank: -1}}).fetch()[0];
		//console.log("PREV", prev);
		return prev;
	}
});

Template.Sections.events({
	'click .section-title': function(ev, temp) {
		console.log("Section click", ev, temp);
		Session.set("currentCategory", ev.currentTarget.id);
		console.log("CJL: ", this);
		if(temp.data) {
			setRoomSection(Session.get("currentRoom"), this._id);
		}
		//Router.go("/sections/" + ev.currentTarget.id);
	},
	'click .up': function(ev, temp) {
		if(temp.data) {
			setRoomSection(Session.get("currentRoom"), this._id);
		}
		Session.set("currentCategory", ev.currentTarget.id);
	},
	'click .home': function(ev) {
		Session.set("currentCategory", null);
	},
	'click #send-to-room': function(ev) {
		Session.set("currentSection", this._id);
		Rooms.update(this._id, {$set: {currentSection: this._id}})
		console.log("Sent to room ", this.name);
	},
	// 'click .up': function(ev) {
	// 	  console.log("I clicked! ", ev.currentTarget.id);
	// 	  Session.set("currentCategory", ev.currentTarget.id);
	// },
	'click .forward-arrow-btn': function(ev, temp) {
		curr = Categories.findOne(ev.currentTarget.id);
		console.log("curr", curr, ev.currentTarget.id);
		// next = Categories.findOne({
		// 	parent: curr.parent,
		// 	rank: {
		// 		$gt: curr.rank
		// 	}
		// });
		next = Categories.findOne(ev.currentTarget.id);
		console.log("Next ", next);
		if(temp.data) {
			setRoomSection(Session.get("currentRoom"), next._id);
		}
		if (next) {
			Session.set("currentCategory", next._id);
		}
	},
	'click .backward-arrow-btn': function(ev, temp) {
		curr = Categories.findOne(ev.currentTarget.id);
		console.log("curr", curr, ev.currentTarget.id);
		// previous = Categories.findOne({
		// 	parent: curr.parent,
		// 	rank: {
		// 		$lt: curr.rank
		// 	}
		// });
		previous = Categories.findOne(ev.currentTarget.id);
		console.log("Prev ", previous);
		if(temp.data) {
			setRoomSection(Session.get("currentRoom"), previous._id);
		}
		if (previous) {
			Session.set("currentCategory", previous._id);
		}
	}
});

Template.Sections.rendered = function() {
	this.$('#steplist').sortable({
		handle: '.handle',
		delay: 1000,
		stop: function(e, ui) {
			// get the dragged html element and the one before
			//   and after it
			console.log("STOPPED EVENT");
			el = ui.item.get(0)
			before = ui.item.prev().get(0)
			after = ui.item.next().get(0)

			// Here is the part that blew my mind!
			//  Blaze.getData takes as a parameter an html element
			//    and will return the data context that was bound when
			//    that html element was rendered!
			if (!before) {
				//if it was dragged into the first position grab the
				// next element's data context and subtract one from the rank
				newRank = Blaze.getData(after).rank - 1
			} else if (!after) {
				//if it was dragged into the last position grab the
				//  previous element's data context and add one to the rank
				newRank = Blaze.getData(before).rank + 1
			} else
			//else take the average of the two ranks of the previous
			// and next elements
				newRank = (Blaze.getData(after).rank + Blaze.getData(before).rank) / 2;
			if (isNaN(newRank)) {
				newRank = 99;
			}
			//update the dragged Item's rank
			console.log("new rank ", newRank);
			Categories.update({
				_id: Blaze.getData(el)._id
			}, {
				$set: {
					rank: newRank
				}
			})
		}
	})
}

function setRoomSection(room, section) {
	console.log("SETRS: ", room, section);
	Rooms.update(room, {$set: {currentSection: section}})
}
