Meteor.methods({
	incrementRank: function() {
		rank = incrementCounter("SectionRank");
		console.log("RANK: ", rank);
		return rank;
	}
});