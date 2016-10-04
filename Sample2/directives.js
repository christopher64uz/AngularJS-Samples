var app = angular.module('classsearch');

/**
@name stickyHeader
@author Student IT Office
@description The directive used to on the results page to update table headers.

@property {function} link {@link menuDirective.link}

@namespace stickyHeader
*/
app.directive('stickyHeader', ["$compile", function($compile) {
	return {
		// indicate our directive will be used as a CSS Class
		restrict: 'C',
		replace: 'true',
		
		/**
		@function link
		@description Controls the updates or table headers

		@memberOf stickyHeader 
		*/
		link: function(scope, element, attribute)
		{
			// DOM Ready
			$(document).ready(function() {
				var headerRow;
				var clonedHeader;
				
				$("#results").each(function() {
					headerRow = $("#resultTitle", this);
					clonedHeader = headerRow.clone();
					$compile(clonedHeader.contents())(scope)
					headerRow
				    .before(clonedHeader)
				    .addClass("floatingHeader");
				   
					$(window)
						.scroll(UpdateTableHeaders)
						.trigger("scroll");
				});
			});
			   
			function UpdateTableHeaders() 
			{
				filterHeight = $("#filterWrapper").height();
				$("#results").each(function() 
				{
					var el         		= $(this),
						offset         	= el.offset(),
						scrollTop      	= $(window).scrollTop(),
						floatingHeader 	= $(".floatingHeader", el)
					
					if ((scrollTop > offset.top) && (scrollTop < offset.top + el.height())) {
						floatingHeader.css({
							"visibility": "visible"
				        });
				    } 
					else {
				        floatingHeader.css({
				        	"visibility": "hidden"
				        });      
				    };	
				});
			}   
		}
	};
}]);

/**
@name seperateAttributes
@author Student IT Office
@description A filter used to separate elements out based on attributes

@return {function} A function that filters based on attributes

@namespace seperateAttributes
*/
app.filter('seperateAttributes', function() {
	return function(items, count) {
		if(items == null){
			return;
		}
	    var out = new Array();
	    var numElem = Math.ceil(items.length/3);

	    
	    for( var i = 0; i < numElem; i++){
	    	if(items[i + numElem * (count - 1 )] != null){
	    		out.push(items[i + numElem * (count - 1 )]);
	    	};
	    }

	    return out;
	};
});

/**
@name regex
@author Student IT Office
@description A filter used to separate elements out based on regular expressions

@return {function} A function that filters based on a given regular expression

@namespace regex
*/
app.filter('regex', function() {
	return function(items, field, regex) {
		var patt = new RegExp(regex);      
	    var out = new Array();
	    angular.forEach(items, function(item) {
	    	if(patt.test(item[field]))
	    		out.push(item);
	    });
	    return out;
	};
});

/**
@name regexString
@author Student IT Office
@description A filter used to separate elements out based on regular expressions 
	and attributes

@return {function} A function that filters based on a given regular expression 
	and attributes

@namespace regexString
*/
app.filter('regexString', function() {
	return function(items, regex, eval, secondAttr, thirdAttr) {
		var patt = new RegExp(regex);      
	    var out = new Array();
	    angular.forEach(items, function(item) {
	    	if (eval == "T") {
	    		if(patt.test(item) && secondAttr == thirdAttr)
	    			out.push(item);
	    	} else {
	    		if(!patt.test(item) || secondAttr != thirdAttr)
	    			out.push(item);
	    	}
	    });
	    return out;
	};
});
