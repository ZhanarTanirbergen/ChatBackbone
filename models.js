var UserModel = Backbone.Model.extend({
	defaults: {
		id: "",
		name: "",
		status: "", 
		lastActiveDate: Date
	}
});

var Users = Backbone.Collection.extend({
	model: UserModel,
	comparator: function(item) {
    	return -Date.parse(item.get('lastActiveDate'));
	}
});

var MessageModel = Backbone.Model.extend({
	defaults: {
		id: "",
		authorId: "",
		receiverId: "",
		authorName: "",
		text: "",
		date: "",
		deleted: "",
		color: "",
		selected: ""
	}
});

var Messages = Backbone.Collection.extend({
	model: MessageModel
});
