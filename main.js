function getCurrentTime(){
	var date = new Date();
	var day = date.toJSON().slice(0,10).replace(/-/g,'/');
	var time = date.getHours() + ':' + date.getMinutes() + ":" + date.getSeconds();
	var cur = day.concat(" " + time);

	return cur;
}

function getTime(){
	var date = new Date();
	var time = date.getHours() + ':' + date.getMinutes();
	
	return time;
}

$(document).ready(function(){
	// memory.clear();	
	var userName = prompt('What is your name?', 'name');
	var name = document.getElementById('userName');
	name.innerHTML = userName;

	var userStatus = prompt('Enter your status (active, passive, bored etc)', 'mood');
	var status = document.getElementById('userStatus');
	status.innerHTML = userStatus;

	var time = getCurrentTime();
	
	var id = idManager.getId();
	id++;
	idManager.setId(id);

	user.set({id: id, name: userName, status: userStatus, lastActiveDate: time});
	userManager.addNewUser(user);
 
	var p = new Messages();
	var receiver = $('.single.active').text();
	if (receiver) {
		for(var i = 0; i < m.length; i++){
			if ((m.models[i].get('authorId') === id && m.models[i].get('receiverId') === receiverId) || (m.models[i].get('authorId') === receiverId && m.models[i].get('receiverId') === id)) {
				p.add(m.models[i]);
			}
		}
	}   

	var timerAddNewUsers = setInterval(function(){
		list = userManager.getUsersCollection();
	    if(list.length !== u.length){
	    	for(var i = u.length; i < list.length; i++){
	    		u.add(list[i]);
	    		u.sort();
	    		$('div').remove('.msg');
	    	}
	    }
	    for(var i = 0; i < list.length; i++){
			for (var j = 0; j < u.length; j++) {
				if (list[i].id === u.models[j].get('id')) {
					if (list[i].name !== u.models[j].get('name')) {
							var time = getCurrentTime();
							var model = new UserModel();
							model.set({id: list[i].id, name: list[i].name, status: list[i].status, lastActiveDate: time});
							u.remove(u.models[j]);
							u.add(model, {at: j});
					}
					if (list[i].status !== u.models[j].get('status')) {
							var time = getCurrentTime();
							var model = new UserModel();
							model.set({id: list[i].id, name: list[i].name, status: list[i].status, lastActiveDate: time});
							u.remove(u.models[j]);
							u.add(model, {at: j});
					}
					if (list[i].lastActiveDate !== u.models[j].get('lastActiveDate')) {
							var model = new UserModel();
							model.set({id: list[i].id, name: list[i].name, status: list[i].status, lastActiveDate: list[i].lastActiveDate});
							u.remove(u.models[j]);
							u.add(model, {at: j});
					}
				}
			}
		}
	}, 300);

	var timerAddNewMessages = setInterval(function(){
		listM = messageManager.getMessagesCollection();
	    if(listM.length !== m.length){
	    	for(var i = m.length; i < listM.length; i++){
	    		m.add(listM[i]);
		    		if ((listM[i].authorId === receiverId && listM[i].receiverId === id) || (listM[i].authorId === id && listM[i].receiverId === receiverId)){
							p.add(listM[i]);
					}
	    	}	
	    }
	    for(var i = 0; i < listM.length; i++){
			for (var j = 0; j < m.length; j++) {
				if (listM[i].id === m.models[j].get('id')) {
					if (listM[i].text !== m.models[j].get('text')) {
						m.models[j].set({text: listM[i].text});
					} else if (listM[i].authorName !== m.models[j].get('authorName')){
						m.models[j].set({authorName: listM[i].authorName});
					} else if (listM[i].color !== m.models[j].get('color')){
						m.models[j].set({color: listM[i].color});

					}
				}
			}
		}
	}, 300);


	var timerChangeMessages = setInterval(function(){
		for(var i = 0; i < m.length; i++){
	    	for(var j = 0; j < p.length; j++){
	    		if(m.models[i].get('id') === p.models[j].get('id') && m.models[i].get('text') !== p.models[j].get('text') && m.models[i].get('deleted') !== "yes"){
	    			//p.models[j].set({text:  m.models[i].get('text')});
	    			var model = new MessageModel();
					model.set({id: p.models[j].get('id'), authorId: p.models[j].get('authorId'), receiverId: p.models[j].get('receiverId'), authorName: p.models[j].get('authorName'), text: m.models[i].get('text'),  date: p.models[j].get('date'), deleted: p.models[j].get('deleted'), color: p.models[j].get('color'), selected: p.models[j].get('selected') });
					p.remove(p.models[j]);
					p.add(model, {at: j, merge: true});
					// p.reset(p);
	    		} else if (m.models[i].get('id') === p.models[j].get('id') && m.models[i].get('authorName') !== p.models[j].get('authorName') && m.models[i].get('deleted') !== "yes") {
	    			//p.models[j].set({authorName:  m.models[i].get('authorName')});
	    			var model = new MessageModel();
					model.set({id: p.models[j].get('id'), authorId: p.models[j].get('authorId'), receiverId: p.models[j].get('receiverId'), authorName: m.models[i].get('authorName'), text: p.models[j].get('text'),  date: p.models[j].get('date'), deleted: p.models[j].get('deleted'), color: p.models[j].get('color'), selected: p.models[j].get('selected') });
					p.remove(p.models[j]);
					p.add(model, {at: j, merge: true});
					// p.reset(p);
	    		}
	    		else if (m.models[i].get('id') === p.models[j].get('id') && m.models[i].get('color') !== p.models[j].get('color') && m.models[i].get('deleted') !== "yes") {
	    			//p.models[j].set({color:  m.models[i].get('color')});
	    			var model = new MessageModel();
					model.set({id: p.models[j].get('id'), authorId: p.models[j].get('authorId'), receiverId: p.models[j].get('receiverId'), authorName: m.models[i].get('authorName'), text: p.models[j].get('text'),  date: p.models[j].get('date'), deleted: p.models[j].get('deleted'), color: m.models[i].get('color'), selected: p.models[j].get('selected') });
					p.remove(p.models[j]);
					p.add(model, {at: j, merge: true});
					// p.reset(p);
	    		}
	    	}
	    }
	}, 300);

	new ContactsView({
		el: '#chatslist',
		collection: u
	}).render();

	new MessagesView({
		el: '#chat',
		collection: p
	}).render();

	$("#sendMessage").click(function(){
		var receiver = $('.single.active').text();
		if (receiver) {
			var time = getTime();
			var text = $('#messageInput').val();
			var message = new MessageModel;
			var messageId = idMessageManager.getId();
			messageId++;
			idMessageManager.setId(messageId);
			if (text.indexOf("http") != -1) {
				text = "<a id = 'link' class='btn send-btn' href = '" + text + "'>" + text + "</a>";
			}
			message.set({id: messageId, authorId: id,  receiverId: receiverId, authorName: user.get('name'), text: text, date: time, deleted: "no", color: "black", selected: "no"});
			messageManager.addNewMessage(message);
			$('#messageInput').val('');
			for(var i = 0; i < u.length; i++){
				if(u.models[i].get('id') === receiverId) {
					var model = u.models[i];
					u.remove(u.models[i]);
					u.add(model, {at: 0});
				}
			}
			var receiver = document.querySelector('.single');
			receiver.className = 'single active';
		} else {
			alert("Please choose a chat");
		}
	});
	$(".send-smiley img").click(function(){
		var receiver = $('.single.active').text();
		var image = $(this).attr("src").replace("image","")
		if(receiver) {
			var time = getTime();
			var text = "<img src='" + image + "'>";
			var message = new MessageModel;
			var messageId = idMessageManager.getId();
			messageId++;
			idMessageManager.setId(messageId);
			message.set({id: messageId, authorId: id,  receiverId: receiverId, authorName: userName, text: text, date: time, deleted: "no", color: "black", selected: "no"});
			messageManager.addNewMessage(message);
			for(var i = 0; i < u.length; i++){
				if(u.models[i].get('id') === receiverId) {
					var model = u.models[i];
					u.remove(u.models[i]);
					u.add(model, {at: 0});
				}
			}
			var receiver = document.querySelector('.single');
			receiver.className = 'single active';
		} else {
			alert("Please choose a chat");
		}
	});
	$("#changeModel").click(function(){
		if(confirm("Are you sure you want to change your profile")){
			var time = getCurrentTime();
			var newUserName = $("#changeName").val();
			var newUserStatus = $("#changeStatus").val();
			user.set({name: newUserName, status: newUserStatus, lastActiveDate: time});
			userManager.changeUserModel(user);
			for(var i = 0; i < m.length; i++){
				if(m.models[i].get('authorId') === user.get('id')){
					m.models[i].set({authorName: user.get('name')});
					messageManager.changeMessageModel(m.models[i]);
				}
			}
			name.innerHTML = newUserName;
			status.innerHTML = newUserStatus;
		}
	});
	$("#deleteChat").click(function(){
		var receiver = $('.single.active').text();
		if(receiver){
			if(confirm("Are you sure you want to delete message history?")) {
				for(var i = 0; i < m.length; i++){
					if((m.models[i].get('authorId') === receiverId && m.models[i].get('receiverId') === id) || (m.models[i].get('receiverId') === receiverId && m.models[i].get('authorId') === id)) {
						m.models[i].set('deleted', 'yes');
					}
				}
				$('div').remove('.msg');
		  	}
		} else {
			alert("Please chose a chat");
		}
	});	
	$("#deleteSelected").click(function(){
		var receiver = $('.single.active').text();
		if(receiver){
			if(confirm("Are you sure you want to delete selected messages?")) {
				for(var i = 0; i < m.length; i++){
					if(m.models[i].get('selected') === "yes"){
						if(m.models[i].get('receiverId') === receiverId && m.models[i].get('authorId') === id) {
							m.models[i].set({text: "This message was deleted"});
							messageManager.changeMessageModel(m.models[i]);
						}
						m.models[i].set({selected: "no"});
					}
		  		}
		  	}
		} else {
			alert("Please chose a chat");
		}
	});
	$("#paintSelected").click(function(){
		var receiver = $('.single.active').text();
		if(receiver){
			if(confirm("Are you sure you want to paint selected messages?")) {
				var color = prompt('Enter color...', 'black');
				for(var i = 0; i < m.length; i++){
					if(m.models[i].get('selected') === "yes"){
						if(m.models[i].get('receiverId') === receiverId && m.models[i].get('authorId') === id) {
							m.models[i].set({color: color});
							messageManager.changeMessageModel(m.models[i]);
						}
						m.models[i].set({selected: "no"});
					}
		  		}
		  	}
		} else {
			alert("Please chose a chat");
		}
	});
	$("#search").click(function(){
		var receiver = $('.single.active').text();
		if(receiver){
			var searchedMessage = prompt('Enter the message you search.', 'message');
			var cnt = 0;
			for(var i = 0; i < m.length; i++){
				if((m.models[i].get('authorId') === receiverId && m.models[i].get('receiverId') === id) || (m.models[i].get('receiverId') === receiverId && m.models[i].get('authorId') === id)) {
					if(m.models[i].get('text') === searchedMessage){
						cnt++;
					}
				}
			}
			alert("There is " + cnt + " messages matched your search.");
		} else {
			alert("Please chose a chat");
		}
	});
})
