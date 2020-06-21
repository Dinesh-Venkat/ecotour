$.fn.calendar = function(options = {}){

	var defaults	          = {
								month: null,
								year: null,
								disabled: null,
								initCallback: function(){},
								onDateClick: function(day, month, year){}
							};
	options = $.extend({}, defaults, options);
	
	options.month = parseInt(options.month);
	options.year = parseInt(options.year);

	var $calendarContainer= $(this),
		cal_days_labels   = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		cal_months_labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
		cal_current_date  = new Date(), 
		month             = (options.month == null || isNaN(options.month)) ? cal_current_date.getMonth() : options.month-1,
		year              = (options.year == null || isNaN(options.year)) ? cal_current_date.getFullYear() : options.year,
		today             = cal_current_date.getDate(),
		html              = '',
		firstDay          = new Date(year, month, 1),
		startingDay       = firstDay.getDay();

		var t= cal_current_date.getMonth(),
		tt = cal_current_date.getFullYear();

		if((month<t && year<=tt) || year<tt)
		today = -1;
        else if(month!=t || year!=tt)
		today = 0;
	var monthLength = cal_days_in_month[month];
	
	// Check for leap year
	if(month == 1){
		if((year % 4 == 0 && year % 100 != 0) || year % 400 == 0){
			monthLength = 29;
		}
	}
	
	// Header
	var monthName = cal_months_labels[month]
	var html = '<table class="calendar-table">';
	html += '<thead><tr><th class="prev-month"><a href="#" data-month="'+(month===0?12:month)+'" data-year="'+(month===0?year-1:year)+'"></a></th><th colspan="5">';
	html += monthName + "&nbsp;" + year;
	html += '</th><th class="next-month"><a href="#" data-month="'+(month===11?1:month+2)+'" data-year="'+(month===11?year+1:year)+'"></a></th></tr></thead>';
	html += '<tr class="calendar-days-header">';
	for(var i = 0; i <= 6; i++ ){
		html += '<td class="day-header '+(i===0?'sunday':'')+'">';
		html += cal_days_labels[i];
		html += '</td>';
	}
	html += '</tr><tr>';

	var day = 1;
	if(options.disabled!==null)
		var dd = options.disabled[''+year];
	if(typeof dd!== 'undefined')
		dd = dd[''+(month+1)];
	for (var i=0; i<9; i++){
		for (var j=0; j<=6; j++){
			html += '<td class="calendar-day';
			if(day<=monthLength && (i>0 || j>=startingDay)){
			    if(today===-1){}
			        //
			    else if(month>=12 && year>=2018){}///for change month 
				else if(today===0 && (typeof dd==='undefined' || dd.length===0)){
					html += ' enabled';
				}
				else if(today<day){
					if($.inArray(day,dd)===-1)
						html += ' enabled';
				}
				if(today===day){
					html += ' today';
				}
				html += '" data-day="'+day+'" data-month="'+(month+1)+'" data-year="'+year+'">'+day;
				day++;
			}
			else{
				html += ' disabled">';
			}
			html += '</td>';
		}
		if(day>monthLength){
			break;
		}
		else{
			html += '</tr><tr>';
		}
	}
	html += '</tr></table>';

	$calendarContainer.html(html);


	// Event Bindings
	$('.prev-month a, .next-month a', $calendarContainer).click(function(e){
		var $this = $(this),
			month = $this.data('month'),
			year = $this.data('year');

		$calendarContainer.calendar({
			month: month,
			year: year,
			disabled: options.disabled,
			onDateClick: options.onDateClick
		});

		e.preventDefault();
		e.stopPropagation();
		return false;
	});

	// On date click
	var $enabledDays = $('.calendar-day.enabled', $calendarContainer);
	$enabledDays.click(function(e){
		var $this = $(this),
			day = parseInt($this.data('day')),
			month = parseInt($this.data('month')),
			year = parseInt($this.data('year'));
			$enabledDays.removeClass('selected');
			$this.addClass('selected');

			options.onDateClick(day, month, year);

			e.preventDefault();
			e.stopPropagation();
			return false;
	});

	options.initCallback();

}