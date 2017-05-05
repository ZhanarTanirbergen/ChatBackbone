	var u = new Users(userManager.getUsersCollection());
	var m = new Messages(messageManager.getMessagesCollection());
	var user = new UserModel;

	window.u = u;
	window.m = m;