$(document).ready( function(){
	window.tiTypeahead = {
		// input element
		input: $("#id_autocomplete"),

		// default options
		options: {
			url: "/tags/",
			minLength: 1,
			append: $("#id_autocomplete").parent()
		},

		// default classes
		classes: {
			wraper: "ti-typeahead",
			wraperBody: "ti-typeahead-body",
			result: "ti-typeahead-results",
			img: "image",
			txt: "text",
			opt: "opt",
			muted: "muted",
			active: "active"
		},

		// default elements
		elm: {
			main: $("<div>"),
			innerBody: $("<div>"),
			cont: $("<div>").addClass("container ti-container"),
			row: $("<div>").addClass("row"),
			footer: $("<div>")
		},

		// capture these keys
		keys: {
			ESC: 27,
			EN: 13
		},

		// track ajax current request
		currentRequest: "",

		// track error status
		error: false,

		onKeyPress: function(e) {
			var self = this;
			var opt = this.options;
			var rawVal = e.target.value;
			var index = rawVal.indexOf("@");
			var val = rawVal.substring(index + 1);

			// hide autocomplete when ESC pressed
			if(e.which === self.keys.ESC) {
				e.preventDefault();
				self.hideTypeahead();
				self.disableKillerFn();
				return;
			}

			// prevent form submit callback()
			if(e.which === self.keys.EN) {
				e.preventDefault();
			}

			// break callback() when less characters
			if(val.length < self.options.minLength) {
				self.hideTypeahead();
				return;
			}

			// setup ajax
			var ajaxSettings = {
				url: opt.url,
				type: "GET",
				data: "q=" + val
			}

			// abort panding ajax response
			if(self.currentRequest !== "" && self.currentRequest.pipe()) {
				self.currentRequest.abort();
			}

			// remove default autocomplete from element
			self.input.attr("autocomplete", "off");

			// ajax callback()
			self.currentRequest = $.ajax(ajaxSettings).done(function(data){
				self.clear();
				self.formatData(val, data);
				self.enableKillerFn();
			}).fail(function (jqXHR, textStatus, errorThrown){
				self.showError();
			});
		},

		showError: function(err) {
			var self = this;

			if(self.error) {
				return;
			}

			if(err !== "error") {
				return
			}

			self.clear();

			var div = $("<div>"),
				result = $("<div>").addClass(self.classes.result),
				elm = $("<div>").addClass("col-sm-12");

			var nosugg = $("<div>").addClass("text-center").text("Something went wrong.");
			result.append(nosugg);
			div.append(result);
			elm.append(div);
			self.elm.row.append(elm);
			self.showTypeahead();

			self.error = true;
		},

		formatData: function(q, response) {
			// abort when no response
			if( response === "undefined" ) {
				return;
			}

			var self = this,
				opt = this.options,
				elm = this.elm,
				data = $.parseJSON(response),
				cols = {
					col1: $("<div>").addClass("col-sm-3"),
					col2: $("<div>").addClass("col-sm-3"),
					col3: $("<div>").addClass("col-sm-3"),
					col4: $("<div>").addClass("col-sm-3"),
					col5: $("<div>").addClass("col-sm-3"),
					col6: $("<div>").addClass("col-sm-3"),
					col7: $("<div>").addClass("col-sm-3"),
					col8: $("<div>").addClass("col-sm-3")
				};

			var buffer = 0,
				bufferLength = 4;

			// structure autocomplete
			if( data.news.length != 0 && buffer < bufferLength) {
				cols.col1.append($("<span>").addClass(self.classes.opt).text("News "));
				cols.col1.append($("<a>").attr("href", "/investment-news/").text("Show More").addClass(self.classes.active).addClass(self.classes.opt));
				for(var i = 0; i < data.news.length; i++) {
					self.createSuggestions(data.news[i], q, cols.col1);
				}
				elm.row.append(cols.col1);
				buffer++;
			}
			if( data.jobs.length != 0 && buffer < bufferLength) {
				cols.col2.append($("<span>").addClass(self.classes.opt).text("Jobs "));
				cols.col2.append($("<a>").attr("href", "/investment-jobs/?q="+q).text("Show More").addClass(self.classes.active).addClass(self.classes.opt));
				for(var i = 0; i < data.jobs.length; i++) {
					self.createSuggestions(data.jobs[i], q, cols.col2);
				}
				elm.row.append(cols.col2);
				buffer++;
			}
			if( data.firms.length != 0 && buffer < bufferLength) {
				cols.col3.append($("<span>").addClass(self.classes.opt).text("Firms "));
				cols.col3.append($("<a>").attr("href", "/firms/?q="+q).text("Show More").addClass(self.classes.active).addClass(self.classes.opt));
				for(var i = 0; i < data.firms.length; i++) {
					self.createSuggestions(data.firms[i], q, cols.col3);
				}
				elm.row.append(cols.col3);
				buffer++;
			}
			if( data.profiles.length != 0 && buffer < bufferLength) {
				cols.col4.append($("<span>").addClass(self.classes.opt).text("People "));
				cols.col4.append($("<a>").attr("href", "/people/?q="+q).text("Show More").addClass(self.classes.active).addClass(self.classes.opt));
				for(var i = 0; i < data.profiles.length; i++) {
					self.createSuggestions(data.profiles[i], q, cols.col4);
				}
				elm.row.append(cols.col4);
				buffer++;
			}
			if( data.rankings.length != 0 && buffer < bufferLength) {
				cols.col5.append($("<span>").addClass(self.classes.opt).text("Rankings "));
				cols.col5.append($("<a>").attr("href", "/investment-rankings-directory/").text("Show More").addClass(self.classes.active).addClass(self.classes.opt));
				for(var i = 0; i < data.rankings.length; i++) {
					self.createSuggestions(data.rankings[i], q, cols.col5);
				}
				elm.row.append(cols.col5);
				buffer++;
			}
			if( data.events.length != 0 && buffer < bufferLength) {
				cols.col6.append($("<span>").addClass(self.classes.opt).text("Events "));
				cols.col6.append($("<a>").attr("href", "/institutional-investor-events/").text("Show More").addClass(self.classes.active).addClass(self.classes.opt));
				for(var i = 0; i < data.events.length; i++) {
					self.createSuggestions(data.events[i], q, cols.col6);
				}
				elm.row.append(cols.col6);
				buffer++;
			}
			if( data.snh.length != 0 && buffer < bufferLength) {
				cols.col7.append($("<span>").addClass(self.classes.opt).text("Search & Hires "));
				cols.col7.append($("<a>").attr("href", "/search-and-hire/?q="+q).text("Show More").addClass(self.classes.active).addClass(self.classes.opt));
				for(var i = 0; i < data.snh.length; i++) {
					self.createSuggestions(data.snh[i], q, cols.col7);
				}
				elm.row.append(cols.col7);
				buffer++;
			}
			if( data.syndicates.length != 0 && buffer < bufferLength) {
				cols.col8.append($("<span>").addClass(self.classes.opt).text("Syndicates "));
				cols.col8.append($("<a>").attr("href", "/syndicates/").text("Show More").addClass(self.classes.active).addClass(self.classes.opt));
				for(var i = 0; i < data.syndicates.length; i++) {
					self.createSuggestions(data.syndicates[i], q, cols.col8);
				}
				elm.row.append(cols.col8);
				buffer++;
			}

			// no results
			if( buffer == 0 ) {
				var col12 = $("<div>").addClass("col-sm-12");
				self.createSuggestions(null, q, col12);
				elm.row.append(col12);
			}

			// show typeahead after formating all data
			self.showTypeahead();
		},

		createSuggestions: function(data, q, elm) {
			var self = this,
				opt = this.options;

			var div = $("<div>"),
				result = $("<div>").addClass(self.classes.result);

			if(data === null) {
				var nosugg = $("<div>").addClass("text-center").text("No result found");
				result.append(nosugg);
				div.append(result);
				elm.append(div);
				return;
			}

			var a = $("<a>").attr("href", data.url);

			var imageWrap = $("<div>").addClass(self.classes.img),
				image = $("<img>").attr("src", data.imageUrl);
				imageWrap.append(image);

			var index = data.title.toLowerCase().search(q.toLowerCase()),
				subStr = data.title.substring(index, (index + q.length)),
				sugg = data.title.replace(subStr, "<strong>" + subStr + "</strong>");

			var titleWrap = $("<div>").addClass(self.classes.txt),
				addInfo = $("<div>").addClass(self.classes.muted).text(data.additionInfo),
				text = $("<span>").html(sugg);
				text.append(addInfo);
				titleWrap.append(text);

			result.append(imageWrap);
			result.append(titleWrap);
			a.append(result);
			div.append(a);
			elm.append(div);
		},

		createContainer: function() {
			var self = this,
				elm = this.elm,
				opt = this.options;

			// container elements
			elm.main.addClass(self.classes.wraper).hide();
			elm.innerBody.addClass(self.classes.wraperBody);
			elm.innerBody.append(elm.row);
			elm.cont.append(elm.innerBody);
			elm.main.append(elm.cont);
			opt.append.append(elm.main);
		},

		showTypeahead: function() {
			// show autocomplete
			this.elm.main.show();
		},

		hideTypeahead: function() {
			// hide autocomplete
			this.elm.main.hide();
		},

		clear: function() {
			// clear old results
			this.elm.row.html("");
		},

		onBlur: function(e) {
			this.disableKillerFn();
		},

		killerFn: function(e) {
			var self = this;
			if (!$(e.target).closest('.' + self.options.wraper).length) {
	            self.hideTypeahead();
	        }
		},

		enableKillerFn: function () {
	        var self = this;
	        $(document).on('click', function(e) { self.killerFn(e) });
	    },

		disableKillerFn: function() {
			var self = this;
			$(document).off('click', function(e) { self.killerFn(e) });
		},

		init: function() {
			console.log(this);
			var self = this;
			self.createContainer();
			self.input.on("keyup", function(e){ self.onKeyPress(e) });
			self.input.on("blur", function(e){ self.onBlur(e) });
		}
	}

});
