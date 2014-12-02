Template.SectionEdit.helpers({
	
	beforeRemove: function() {
		return function(collection, id) {
			var doc = Categories.findOne(id);
			if (confirm('Really delete "' + doc.name + '"?')) {
				this.remove();
			}
		};
	}
});

Template.SectionEdit.events({
  'click .camera': function (ev) {
	  console.log("PIC ", ev.currentTarget.id);
	  var cameraOptions = {
	          width: 800,
	          height: 600
	        };
	  MeteorCamera.getPicture( pictureTaken);
	  
	  Session.set("currentSectionEditId", ev.currentTarget.id )
  }
});


function pictureTaken(error, data) {
	
	console.log("Picture ", error, data);
	if(error) {
		console.log(error);
	} else {
		Categories.update({_id: Session.get("currentSectionEditId")}, {$set: {image: data}} );
		console.log("Set image data");
	}
}