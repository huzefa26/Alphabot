$(function(){
	var id = 4;
	var optionsId = 2;
	var receiveId = 3;
	var greetings = '';
	var dateTime = new Date($.now());
	if(dateTime.getHours() >= 0 && dateTime.getHours() < 12 && dateTime.getMinutes() >= 0 && dateTime.getSeconds() >= 0){
		greetings = 'Good Morning';
	}
	else if(dateTime.getHours() >= 12  && dateTime.getHours() < 18 && dateTime.getMinutes() >= 0 && dateTime.getSeconds() >= 0){
		greetings = 'Good Afternoon';
	}
	else if(dateTime.getHours() >= 18 && dateTime.getMinutes() >= 0 && dateTime.getSeconds() >= 0){
		greetings = 'Good Evening';
	}
    var	tag	= "<div class='main_box'>"+
        			"<div class='box_head'>"+
          				"<span id='toggleEffect'><h2>AlphaBot</h2><img src='https://maxcdn.icons8.com/windows10/PNG/16/Arrows/angle_down-16.png' title='Expand Arrow' width='16'></span>"+
        			"</div>"+
        			"<div class='box_body'>"+
            			"<div class='msg-insert'>"+
                  			//"<div class='msg-send'> Send message </div>"+
                  			"<div class='msg-receive' id='receive-1'>"+greetings+", Please let me know if you need any help.</div>"+
                  			"<div class='msg-receive' id='receive-2'>Kindly choose from one of the following categories to get started.</div>"+
                  			"<div class='options' id='options-1'>"+
                  				"<div class='option' id='ans-1'>About Charusat University</div>"+
                  				"<div class='option' id='ans-2'>Show all Institute</div>"+
                  				"<div class='option' id='ans-3'>Charusat Address</div>"+
               				"</div>"+
            			"</div>"+
                  		"<div class='chat-text'>"+
                      		"<input type='text' id='query' placeholder='Write message...'></input>"+
                      		"<i class='material-icons' id='mic'>mic</i>"+
                  		"</div>"+
        			"</div>"+
      			"</div>";
	$('body').append(tag);

	$.ajax({
		url : 'http://ip-api.com/json?fields=258047',
      	success : function(response) {
          	var ip=response.query;
          	var city=response.city;
          	var state=response.regionName;
          	var zip=response.zip;
          	var country=response.country;
          	var device="";
          	var proxy_bool=response.proxy;
          	var latitude=response.lat;
          	var longitude=response.lon;          
          	if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
            	device="Cellphone";
          	} 
          	else {
          		device="Computer";
          	}
          	$.ajax({
				url: 'http://localhost/Chatbot/add_ip.php',
				type: 'POST',
				data: {'ip':ip, 'city':city, 'state':state, 'zip':zip, 'country':country, 'device':device, 'proxy':proxy_bool, 'latitude':latitude, 'longitude':longitude},
				success: function(response){

				}
			});
      	}
  	});


	$('#toggleEffect').on('click', function(){
		var src = $('.box_head img').attr('src');
		$('.box_body').slideToggle('fast');
		if(src == 'https://maxcdn.icons8.com/windows10/PNG/16/Arrows/angle_down-16.png'){
			$('.box_head img').attr('src', 'https://maxcdn.icons8.com/windows10/PNG/16/Arrows/angle_up-16.png');
		}
		else{
			$('.box_head img').attr('src', 'https://maxcdn.icons8.com/windows10/PNG/16/Arrows/angle_down-16.png');
		}
	});

	$('.chat-text input').keypress(function(event) {
		if(event.keyCode == 13){
			var msg = $(this).val();
			$(this).val('');
			$('.msg-insert').append("<div class='msg-send'>"+msg+"</div>");
			$.ajax({
				url: 'http://127.0.0.1:5000/process_query',
				type: 'POST',
				data: {'data': msg},
				success: function(response){
					$('.msg-insert').append("<div class='msg-receive' id='receive-"+receiveId+"'>"+response+"</div>");
					$('.box_body').animate({
				        scrollTop: $('.box_body')[0].scrollHeight
				    }, 10);
				    speak(receiveId);
				    receiveId++;
				}
			});
			$('.box_body').animate({
		        scrollTop: $('.box_body')[0].scrollHeight
		    }, 10);
		}
	});

	$(document).on('click',"div[id^='ans-']", function(){
		var flag = true;
		var selectOption = $(this).attr('id');
		var optionData = $("div[id='"+selectOption+"']").text();
		$('.msg-insert').append("<div class='msg-send'>"+optionData+"</div>");
		$.ajax({
			url: 'http://127.0.0.1:5000/process_options',
			type: 'POST',
			data: {'data': optionData},
			success: function(response){
				var result = $.parseJSON(response);
				if(result[0] != -1){
					$('.msg-insert').append("<div class='msg-receive' id='receive-"+receiveId+"'>Choose from below options</div>");
					$('.msg-insert').append("<div class='options' id='options-"+optionsId+"'></div>");
					$.each(result, function(key,value){
						$('#options-'+optionsId).append("<div class='option' id='ans-"+id+"'>"+value+"</div>");
						id++;
					});
				}
				else{
					$.each(result, function(key,value){
						if(value != -1){
							$('.msg-insert').append("<div class='msg-receive' id='receive-"+receiveId+"'>"+value+"</div>");
						}
					});
				}
				if(result[0] != -1){
					optionsId++;
				}
				speak(receiveId);
				receiveId++;
				$('.box_body').animate({
				    scrollTop: $('.box_body')[0].scrollHeight
				}, 10);
			}
		});
		$('.box_body').animate({
		    scrollTop: $('.box_body')[0].scrollHeight
		}, 10);
	});

	$('#mic').click(function(){
    	$('.chat-text input').val('');
    	var recognition = new webkitSpeechRecognition();
	    recognition.continuous = true;
		recognition.interimResults = true; 
		recognition.onresult = function(e) {
			var input = document.getElementById('query');
			for (var i = e.resultIndex; i < e.results.length; ++i) {
			    if (e.results[i].isFinal) {
			        input.value += e.results[i][0].transcript;
			    }
			}
		}
		recognition.start();
		window.setTimeout(function(){
		   	recognition.stop();
		}, 8000);
   	});

   	function speak(receiveId){
   		speechSynthesis.cancel()
		var u = new SpeechSynthesisUtterance();
    	u.text = $('#receive-'+receiveId).text();
    	speechSynthesis.speak(u);
   	}
});