$(function(){
	$.ajax({
		url: '/totalToken',
		type: 'GET',
		success: function(data) {
			var data = JSON.parse(data)
			$("#tokens").empty();
			$("#tokens").append('<h2>'+data.token+'</h2>')
			if(data.history.length){
				var historyArray = data.history
				var domStr = ""
				for(var each in historyArray){
					var data = historyArray[each]
					domStr = domStr + '<tr><td>'+ new Date(data.date)+'</td><td>'+data.etvolume+'</td><td>'+data.tokenvolume+'</td></tr>'
				}
				$("#tradeHistory").empty();
				$("#tradeHistory").append(domStr)
			} else {
				$("#tradeHistory").empty();
				$("#tradeHistory").append('<tr><td>No Trade Histroy Found</td></tr>')
			} 
		},
		error: function(xhr, status, error) {
			console.log('Error: ' + error);
		}
	});

	$("#ethereum").change(function(event,a,b){
		var value = event.target.value;
		$("#lalaTokens").val(value*2000)
	})

	$("#lalaTokens").change(function(event,a,b){
		var value = event.target.value;
		$("#ethereum").val(value/2000)
	})

	$("#tradeRequest").click(function(event){
		var laToken = $("#lalaTokens").val();
		var ethereum = $("#ethereum").val();

		if(ethereum && laToken){
			var data = {
				"etvolume":ethereum,
				"tokenvolume": laToken
			}
			$.ajax({
				url: '/tradeToken',
				data:data,
				type: 'POST',
				success: function(data) {
					$.ajax({
						url: '/totalToken',
						type: 'GET',
						success: function(data) {
							var data = JSON.parse(data)
							$("#tokens").empty();
							$("#tokens").append('<h2>'+data.token+'</h2>')
							if(data.history.length){
								var historyArray = data.history
								var domStr = ""
								for(var each in historyArray){
									var data = historyArray[each]
									domStr = domStr + '<tr><td>'+ new Date(data.date)+'</td><td>'+data.etvolume+'</td><td>'+data.tokenvolume+'</td></tr>'
								}
								$("#tradeHistory").empty();
								$("#tradeHistory").append(domStr)
								$("#lalaTokens").val("");
								$("#ethereum").val("");
							}
						},
						error: function(xhr, status, error) {
							console.log('Error: ' + error);
						}
					});
				},
				error: function(xhr, status, error) {
					console.log('Error: ' + error);
				}
			});
		} else {
			alert("Unable to Trade,values not defined")
		}

	})
})
