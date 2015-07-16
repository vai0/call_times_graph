$(document).ready(function() {
	$('#container').css('height', $(window).height()); 

	$('.date').on('click', function() {
		var filename = $(this).attr('id');

		$.getJSON('./js/json/' + filename + '.json', function(calls) {
			var formatted_calls = calls.map(function(call) {
				return [call['Date'] + ' ' + call['Start Time'], call['Date'] + ' ' + call['End Time']];
			}).map(function(call) {
				var startTime = Date.parse(call[0]) - 3600000 * 7;
				var endTime = Date.parse(call[1]) - 3600000 * 7;
				return [startTime, endTime];
			});

			console.log(formatted_calls);
			console.log(formatted_calls[0][0]);
			var date_title = new Date(formatted_calls[0][0]);

			$(function() {

				$('#container').highcharts({

					chart: {
						type: 'columnrange',
						inverted: true,
						zoomType: 'y'
					},

					data: {

					},

					title: {
						text: 'All Phone Calls on'	
					},

					subtitle: {
						text: date_title.toDateString()
					},

					xAxis: {
						title: {
							text: 'Calls'
						}
					},

					yAxis: {
						title: {
							text: 'Time'
						},
						type: 'datetime',
						dateTimeLabelFormats: {
							hour: '%I %p',
							minute: '%I:%M %p'
						}
					},

					plotOptions: {
						columnrange: {
							dataLabels: {
								enabled: true,
								formatter: function() {
									var UTC_date = new Date(this.y);
									var hour = UTC_date.getUTCHours();
									if (hour > 12) {
										hour = hour - 12;
									}
									var minutes = UTC_date.getUTCMinutes();
									if (minutes < 10) {
										minutes = '0' + minutes;
									}
									var formatted_label = hour + ':' + minutes;
									return formatted_label;
								}
							}
						}
					},

					legend: {
						enabled: false
					},

					series: [{
						name: 'Time',
						data: formatted_calls
					}]
				});
			});
		});
	});

	$('#june_12').click();
});

	
