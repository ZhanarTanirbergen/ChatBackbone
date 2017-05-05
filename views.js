/*---------------------------messages---------------------------------*/
var MessageView = Marionette.View.extend({
	template: '#messageView',
	ui: {
		text: '#messageText',
		select: '#select',
		edit: '#edit',
		paint: '#dropper'
	}, 
	events: {
		'click @ui.select': function(){
			this.model.set({selected: "yes"});
			for(var i = 0; i < m.length; i++){
	    		if (m.models[i].get('id') === this.model.get('id')) {
					m.models[i].set({selected: "yes"});
	    		}
	    	}  
		},
		'click @ui.edit': function(){
			if(this.model.get('authorId') === user.get('id')){
				var newText = prompt('Edit your message', this.model.get('text'));
				newText = newText.concat(" (edited)");
				for(var i = 0; i < m.length; i++){
		    		if (m.models[i].get('id') === this.model.get('id')) {
						m.models[i].set({text: newText});
						messageManager.changeMessageModel(m.models[i]);
		    		}
		    	}  
		    }
		},
		'click @ui.paint': function(){
			if(this.model.get('authorId') === user.get('id')){
				var newColor = prompt('Edit your message color', this.model.get('color'));
				this.ui.text.css('color', newColor);
		    }
		}
	},
			
});

var MessagesView = Marionette.CollectionView.extend({
	tagName: 'div',
	childView: MessageView
});

/*---------------------------contacts---------------------------------*/

var ContactView = Marionette.View.extend({
	template: '#contactView',
	ui: {
		div: '.conversation',
		contact: '.single',
		delete: '#cross'
	},
	events: {
		'click @ui.div': function(){
			items = document.querySelectorAll('.single.active');
			if (items.length) {
	        	items[0].className = 'single';
	    	}
			this.ui.contact.addClass('active');
			var receiverId = this.model.get('id');
			window.receiverId = receiverId;
			
			$('div').remove('.msg');

	    	var k = new Messages();

	    	for(var i = 0; i < m.length; i++){
	    		if ((m.models[i].get('authorId') === user.get('id') && m.models[i].get('receiverId') === receiverId) || (m.models[i].get('authorId') === receiverId && m.models[i].get('receiverId') === user.get('id'))) {
	    				if(m.models[i].get('deleted') !== 'yes') {
	    					k.add(m.models[i]);   	
	    				}
	    		}
	    	} 
			new MessagesView({
				el: '#chat',
				collection: k
			}).render();	
		},
		'click @ui.delete': function(){
			if(confirm("Are you sure you want to delete conversation?")) {
				this.ui.div.addClass('deleted');
				$('div').remove('#chat');
				$('div').remove('.conversation.deleted');
		  	}
		}
	}
});

var ContactsView = Marionette.CollectionView.extend({
	tagName: 'div',
	childView: ContactView

});
				