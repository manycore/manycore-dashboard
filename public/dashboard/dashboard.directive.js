app.directive('widgetDash', ['$parse', '$injector', '$compile', function ($parse, $injector, $compile) {
	return {
		restrict: 'E',
		link: function (scope, element, attrs, controller) {
			if (attrs.cat != null && $injector.has('widgetDash' + attrs.cat.toUpperCase() + 'Directive')) {
				$injector.get('widgetDash' + attrs.cat.toUpperCase() + 'Directive')[0].link(scope, element, attrs, controller);
			}
		}
	}
}]);

app.directive('widgetDashTG', function() {

	function chartThreadDivergence_link(scope, element, attrs, controller) {
		console.log("== directive == widgetDashTg ==");

		// Layout
		var container = element[0];
		var layout = {
			margin: { top: 4, right: 12, bottom: 4, left: 12},
			pad: { width: 10},
			height:	60,
			width:	container.clientWidth,
			graph:	{
				width:	function() { return Math.max(1, container.clientWidth - layout.margin.left - layout.margin.right); },
				height:	function() { return Math.max(1, container.clientHeight - layout.margin.top - layout.margin.bottom); },
				top:	function() { return layout.margin.top; },
				right:	function() { return Math.max(1, container.clientWidth - layout.margin.right); },
				bottom:	function() { return Math.max(1, container.clientHeight - layout.margin.bottom); },
				left:	function() { return layout.margin.left; }
			}
		};

		// Data
		var profiles = [];
		var timeMin = 0;
		var timeMax = 0;
		var timeStart = +attrs.timestart;			// The common min time
		var timeEnd = +attrs.timeend;				// The common max time

		// DOM
		var svg = d3.select(container).append('svg').attr({width: layout.width, height: layout.height});
		//svg.style("background", "#EEEEEE");

		// Scales
		var scaleX = d3.scale.linear();
		var scaleY = d3.scale.linear().rangeRound([layout.graph.bottom(), layout.graph.top()]);

		// Scales - domains
		scaleY.domain([0, 100]);

		// Axis
		var xAxis = d3.svg.axis().scale(scaleX);

		// Draw - groups
		var coreGroup = svg.append("g").attr("class", "core");
		var profileGroup = svg.append("g").attr("class", "profiles");
		var padGroup = svg.append("g").attr("class", "pads");

		// Draw - core
		var backgroundElement = coreGroup.append("rect")
			.attr("height", layout.graph.height)
			.attr("x", layout.graph.left)
			.attr("y", layout.graph.top)
			.style("fill", "#D2D2D2");

		// Draw - Pad left
		var padLeftElement = padGroup.append("g").attr("class", "pad-left")
			.attr("transform", "translate(" + (layout.graph.left() - layout.pad.width) + ",0)");
		padLeftElement.append("rect")
			.attr("width", layout.pad.width)
			.attr("height", layout.graph.height)
			.attr("x", 0)
			.attr("y", layout.graph.top)
			.style("fill", "#ABABAB")
			.attr("stroke", "#333333")
			.attr("stroke-width", 1);
		padLeftElement.append("line")
			.attr("class", "line")
			.attr("x1", layout.pad.width).attr("x2", layout.pad.width)
			.attr("y1", 0).attr("y2", layout.height)
			.attr('stroke', '#333333')
			.attr('stroke-width', 2)
			.attr('fill', 'none');
		padLeftElement.append("text")
			.attr("x", layout.pad.width / 2)
			.attr("y", layout.graph.top() + layout.graph.height() / 2)
			.attr("text-anchor", "middle")
			.style("fill", "#333333")
			.text("▶");

		// Draw - Pad right
		var padRightElement = padGroup.append("g").attr("class", "pad-right")
			.attr("transform", "translate(" + layout.graph.right() + ",0)");
		padRightElement.append("rect")
			.attr("width", layout.pad.width)
			.attr("height", layout.graph.height)
			.attr("x", 0)
			.attr("y", layout.graph.top)
			.style("fill", "#ABABAB")
			.attr("stroke", "#333333")
			.attr("stroke-width", 1);
		padRightElement.append("line")
			.attr("class", "line")
			.attr("x1", 0).attr("x2", 0)
			.attr("y1", 0).attr("y2", layout.height)
			.attr('stroke', '#333333')
			.attr('stroke-width', 2)
			.attr('fill', 'none');
		padRightElement.append("text")
			.attr("x", layout.pad.width / 2)
			.attr("y", layout.graph.top() + layout.graph.height() / 2)
			.attr("text-anchor", "middle")
			.style("fill", "#333333")
			.text("◀");

		// Draw - pad area
		var profileElements = profileGroup.selectAll(".profiles");

		

		// Compute data

			// Get data from scope
			// We don't erase the instance of the profile array
			profiles.splice(0, profiles.length);
			scope.getprofileData().forEach(function(profile) {
				profiles.push(profile);
			});

			// Find the max length
			timeMax = 0;
			profiles.forEach(function(profile) {
				timeMax = Math.max(timeMax, profile.info.duration);
			});
			timeEnd = timeMax;

			// Scales
			scaleX.domain([timeMin, timeMax]);


		// Redraw
			// Sizes
			layout.width = container.clientWidth;

			// Scales
			scaleX.rangeRound([layout.graph.left(), layout.graph.right()]);

			// SVG
			svg.attr('width', layout.width);

			// Core
			backgroundElement.attr("width", layout.graph.width);

			// Pads
			padRightElement.attr("transform", "translate(" + layout.graph.right() + ",0)");

			// Profiles
			profileElements
				.data(profiles).enter().append("rect")
					.attr("width", function(d) { return scaleX(d.info.duration) - scaleX(0); })
					.attr("height", function(d, i, j) { return layout.graph.height() / profiles.length; })
					.attr("x", scaleX(0))
					.attr("y", function(d, i, j) { return scaleY(100 - 50 * i); })
					.style("fill", "#008CBA");
		
		// scope.$watch(function() { return scope.selectedProfiles; }, redraw);
	}

	return {
		link: chartThreadDivergence_link,
		restrict: 'E'
	}
});
