var app = angular.module('classsearch');

/**
@name resultFilter
@author Student IT Office
@description The filter is used to filter the results without sending a new request.

*/

app.filter("resultFilter", function(){
	return function(courseitems, filterParams){

		var filteredCourses = [];

        if (filterParams) {
            angular.forEach(courseitems, function(value){
                var openClasses = true;
                var mornClasses = false;
                var noonClasses = false;
                var evenClasses = false;
                var instructorbox = true;
                var startTime = true;
                var career = true;
                var mon = true;
                var tues = true;
                var wed = true;
                var thurs = true;
                var fri = true;
                var sat = true;
                var sun = true;
                var only = false;
                var stringdays = [];
                var stringtimes =[];
                var dayintervals = "U";
                var showdays = "U";

                // Open Class Filter
                if (filterParams.openClasses) {
                	openClasses = value.enrollStatus == filterParams.openClasses;
                }

                // Career Filter
                if (filterParams.career || filterParams.career == "" || !filterParams.career) {
                	career = value.academicCareer == filterParams.career;
                	if (filterParams.career == "" || !filterParams.career) {
                		career = true;
                	}
                }

                // Filtering the days to string
                for (var i = 0, len = value.meetings.days.length; i < len; i++) {
                	var temp = value.meetings.days[i].trim().split(" ");
            		stringdays = stringdays.concat(temp);
                }

                // Applying Filter on Days
                if (filterParams.only == true) {
                	only = true;
                }
                //console.log("filterParams.only", filterParams.only);
                if (filterParams.only == false) {
                	only = false;
                }

                if (filterParams.mon) {
                	mon = stringdays.indexOf(filterParams.mon) != -1;
                	if (mon == true && only == false) {
                    	showdays = "S";
                	}
                	if (showdays != "S") {
                		showdays = "H";
                    }
                }
                if (filterParams.tues) {
                	tues = stringdays.indexOf(filterParams.tues) != -1;
                	if (tues == true && only == false) {
                		showdays = "S";
                	}
                	if (showdays != "S") {
                		showdays = "H";
                    }
                }
                if (filterParams.wed) {
                	wed = stringdays.indexOf(filterParams.wed) != -1;
                	if (wed == true && only == false) {
                		showdays = "S";
                	}
                	if (showdays != "S") {
                		showdays = "H";
                    }
                }
                if (filterParams.thurs) {
                	thurs = stringdays.indexOf(filterParams.thurs) != -1;
                	if (thurs == true && only == false) {
                		showdays = "S";
                	}
                	if (showdays != "S") {
                		showdays = "H";
                    }
                }
                if (filterParams.fri) {
                	fri = stringdays.indexOf(filterParams.fri) != -1;
                	if (fri == true && only == false) {
                		showdays = "S";
                	}
                	if (showdays != "S") {
                		showdays = "H";
                    }
                }
                if (filterParams.sat) {
                	sat = stringdays.indexOf(filterParams.sat) != -1;
                	if (sat == true && only == false) {
                		showdays = "S";
                	}
                	if (showdays != "S") {
                		showdays = "H";
                    }
                }
                if (filterParams.sun) {
                	sun = stringdays.indexOf(filterParams.sun) != -1;
                	if (sun == true && only == false) {
                		showdays = "S";
                	}
                	if (showdays != "S") {
                		showdays = "H";
                    }
                }

                // Extracting the parameters for StartTime
                for (var i = 0; i < value.meetings.times.length; i++) {
                	var temp = value.meetings.times[i].trim().split(" ");
                	temp = temp[0].split(":");

                	if (temp.length > 1) {
                		var hour = parseInt(temp[0]);
                		var timeperiod = temp[1].slice(-2);
                		if (temp[1].slice(-2) == "PM" && hour != 12) {
                			hour += 12;
                		}
                	}
            		stringtimes = stringtimes.concat(hour);
                }

                // Apply filter for Morning
                if (filterParams.mornClasses) {
                    for (var i = 0; i < stringtimes.length; i++) {
                    	if (stringtimes[i] >= 6 && stringtimes[i] < 12) {
                    		mornClasses = true;
                    		dayintervals = "S";
                    	}
                    }
                    if (dayintervals != "S") {
                    	dayintervals = "H";
                    }
                }

             // Apply filter for Afternoon
                if (filterParams.noonClasses) {
                	//OnoonClasses = false;
                    for (var i = 0; i < stringtimes.length; i++) {
                    	if (stringtimes[i] >= 12 && stringtimes[i] < 17) {
                    		noonClasses = true;
                    		dayintervals = "S";
                    	}
                    }
                    if (dayintervals != "S") {
                    	dayintervals = "H";
                    }
                }

             // Apply filter for Evening
                if (filterParams.evenClasses) {
                	for (var i = 0; i < stringtimes.length; i++) {
                    	if (stringtimes[i] >= 17 && stringtimes[i] < 24) {
                    		evenClasses = true;
                    		dayintervals = "S";
                    	}
                    }
                	if (dayintervals != "S") {
                    	dayintervals = "H";
                    }
                }

                // Apply filter for StartTime
                if (filterParams.startTime) {
                	startTime = false;
                	for (var i = 0; i < stringtimes.length; i++) {
                    	if (stringtimes[i] >= filterParams.startTime) {
                    		startTime = true;
                    	}
                    }
                }

                // Apply filter for Instructor
                if (filterParams.instructorbox) {
                	instructorbox = false;
                	//console.log('Instructors', value.meetings.instructors);
                    //console.log('Instructors-length', value.meetings.instructors.length);

                    for (var i = 0; i < value.meetings.instructors.length; i++) {
                    	var instructor = value.meetings.instructors[i].trim().toLowerCase().indexOf(filterParams.instructorbox.toLowerCase()) != -1;
                    	if (instructor) {
                    		instructorbox = true;
                    	}
                    }
                }

                //console.log('Only', only, 'filterParams.only', filterParams.only);

                // This is the SUPER simplified Logic to avoid more than 50 of Lines of code.
                if (only == true) {
                	if (openClasses && career && instructorbox && startTime && dayintervals != "H" && mon && tues && wed && thurs && fri && sat && sun) {
                    	filteredCourses.push(value);
                    }
                }
                else if (only == false) {
                	if (openClasses && career && instructorbox && startTime && dayintervals != "H" && showdays != "H") {
                    	filteredCourses.push(value);
                    }
                }


                /* OLD Logic: Would not work with && and || mix
                // Displaying ANY
                if (display === true) {
                	filteredCourses.push(value);
                }

                if (any == false) {
                	if (OopenClasses && Ocareer && OmornClasses && OnoonClasses && OevenClasses && Oinstructorbox && OstartTime && Omon && Otues && Owed && Othurs && Ofri && Osat && Osun){
                		filteredCourses.push(value);
                	}
                	console.log('Ocareer', Ocareer, 'Omon', Omon, 'Otues', Otues, 'Owed', Owed, 'Othurs', Othurs, 'Ofri', Ofri, 'Osat', Osat, 'Osun', Osun, 'OstartTime', OstartTime, 'Oinstructorbox', Oinstructorbox);

                	if (Ocareer && Omon && Otues && Owed && Othurs && Ofri && Osat && Osun && OstartTime && Oinstructorbox){
                		filteredCourses.push(value);
                	}
                }*/


                //console.log('FilterParams',filterParams);
            })
        }
        else {
        	//console.log('NO FILTERS SELECTED');
        	// If no filters specified
            filteredCourses = courseitems;
        }
        return filteredCourses;
	};
});

