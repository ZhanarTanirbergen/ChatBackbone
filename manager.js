var memory = {
	get: function(key){
		return JSON.parse(localStorage.getItem(key));
	},

	set: function(key, val){
		var tmp = JSON.stringify(val);
		localStorage.setItem(key, tmp);
	},

	remove: function(key){
		localStorage.removeItem(key);
	},

	clear: function(){
		localStorage.clear();
	}
};

var userManager = {
	addNewUser: function(userModel){
		usersCollection = userManager.getUsersCollection();
		usersCollection.push(userModel);
		userManager.setUsersCollection(usersCollection);
	},

	changeUserModel: function(userModel){
		usersCollection = userManager.getUsersCollection();
		for (var i = 0; i < usersCollection.length; i++){
			if(usersCollection[i].id === userModel.get('id')){
				usersCollection[i].name = userModel.get('name');
				usersCollection[i].status = userModel.get('status');
				usersCollection[i].lastActiveDate = userModel.get('lastActiveDate');
				break;
			}
		}
		userManager.setUsersCollection(usersCollection);

	}, 

	setUsersCollection: function(list){
		memory.set('users', list);
	},

	getUsersCollection: function(){
		return memory.get('users') || [];
	}
};

var messageManager = {
	  addNewMessage: function(messageModel){
	    messagesCollection = messageManager.getMessagesCollection();
	    messagesCollection.push(messageModel);
	    messageManager.setMessagesCollection(messagesCollection);
	  },

	  changeMessageModel: function(messageModel){
		messagesCollection = messageManager.getMessagesCollection();
		for (var i = 0; i < messagesCollection.length; i++){
			if(messagesCollection[i].id === messageModel.get('id')){
				messagesCollection[i].authorName = messageModel.get('authorName');
				messagesCollection[i].text = messageModel.get('text');
				messagesCollection[i].color = messageModel.get('color');
				break;
			}
		}
		messageManager.setMessagesCollection(messagesCollection);
	 }, 

	  setMessagesCollection: function(list){
	    memory.set('messages', list);
	  },

	  getMessagesCollection: function(){
	    return memory.get('messages') || [];
	  }
};

var idManager = {
	  setId: function(id){
	    memory.set('id', id);
	  },

	  getId: function(){
	    return memory.get('id') || 0;
	  }
};

var idMessageManager = {
	setId: function(id){
	   memory.set('messageId', id);
	},

	getId: function(){
	  return memory.get('messageId') || 0;
	}
}