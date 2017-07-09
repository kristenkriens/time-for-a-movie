// User inputs total time available in input[name=time]
// User inputs genre in select[name=genre]
// On submition of the form, searches by genre + runtime
// Choose 10 movies with specific genre and runtime
// Return list of movies
// MAYBE: Show netflix link if available (need to add input for country at some point?) - AllFlicks API

var movieApp = {};

movieApp.apiURL = "https://api.themoviedb.org/3/";
movieApp.apiKey = "7012d0c8abc08e5a2ed6182e96aed31e";

movieApp.randomPage1 = Math.floor(Math.random() * (10 - 1)) + 1;
movieApp.randomPage2 = Math.floor(Math.random() * (20 - 11)) + 11;
movieApp.randomPage3 = Math.floor(Math.random() * (30 - 21)) + 21;
movieApp.randomPage4 = Math.floor(Math.random() * (40 - 31)) + 31;
movieApp.randomPage5 = Math.floor(Math.random() * (50 - 41)) + 41;
movieApp.randomPage6 = Math.floor(Math.random() * (60 - 51)) + 51;


// Get movies
movieApp.getMovieByGenre1 = function(genreID) {
	$.ajax({
		url: movieApp.apiURL + "discover/movie",
		method: "GET",
		dataType: "json",
		data: {
			api_key: movieApp.apiKey,
			with_genres: genreID,
			sort_by: "popularity.desc",
			page: movieApp.randomPage1
		}
	}).then(function(movieData) {
		movieApp.getMovieID(movieData.results);
	});
};

movieApp.getMovieByGenre2 = function(genreID) {
	$.ajax({
		url: movieApp.apiURL + "discover/movie",
		method: "GET",
		dataType: "json",
		data: {
			api_key: movieApp.apiKey,
			with_genres: genreID,
			sort_by: "popularity.desc",
			page: movieApp.randomPage2
		}
	}).then(function(movieData) {
		movieApp.getMovieID(movieData.results);
	});
};

movieApp.getMovieByGenre3 = function(genreID) {
	$.ajax({
		url: movieApp.apiURL + "discover/movie",
		method: "GET",
		dataType: "json",
		data: {
			api_key: movieApp.apiKey,
			with_genres: genreID,
			sort_by: "popularity.desc",
			page: movieApp.randomPage3
		}
	}).then(function(movieData) {
		movieApp.getMovieID(movieData.results);
	});
};

movieApp.getMovieByGenre4 = function(genreID) {
	$.ajax({
		url: movieApp.apiURL + "discover/movie",
		method: "GET",
		dataType: "json",
		data: {
			api_key: movieApp.apiKey,
			with_genres: genreID,
			sort_by: "popularity.desc",
			page: movieApp.randomPage4
		}
	}).then(function(movieData) {
		movieApp.getMovieID(movieData.results);
	});
};

movieApp.getMovieByGenre5 = function(genreID) {
	$.ajax({
		url: movieApp.apiURL + "discover/movie",
		method: "GET",
		dataType: "json",
		data: {
			api_key: movieApp.apiKey,
			with_genres: genreID,
			sort_by: "popularity.desc",
			page: movieApp.randomPage5
		}
	}).then(function(movieData) {
		movieApp.getMovieID(movieData.results);
	});
};

movieApp.getMovieByGenre6 = function(genreID) {
	$.ajax({
		url: movieApp.apiURL + "discover/movie",
		method: "GET",
		dataType: "json",
		data: {
			api_key: movieApp.apiKey,
			with_genres: genreID,
			sort_by: "popularity.desc",
			page: movieApp.randomPage6
		}
	}).then(function(movieData) {
		movieApp.getMovieID(movieData.results);
	});
};


movieApp.getMovieID = function(movieData) {
	for (i = 0; i < 2; i++) {
		movieApp.getMovieByRuntime(movieData[i].id);
	}
};

movieApp.getMovieByRuntime = function(movieID) {
	$.ajax({
		url: movieApp.apiURL + "movie/" + movieID,
		method: "GET",
		dataType: "json",
		data: {
			api_key: movieApp.apiKey
		}
	}).then(function(movieData) {
		if(movieData.runtime <= movieApp.desiredRuntime && movieData.runtime != 0 && movieData.status === "Released" && movieData.poster_path != null) {
			movieApp.displayMovies(movieData);
		}
	});
};

// Display movies
movieApp.displayMovies = function(movieData) {
		$("#error").hide();
		var myTemplate = $("#myTemplate").html();
		var template = Handlebars.compile(myTemplate);

		movieData.release_date = movieData.release_date.split("").splice(0,4).join("");
		movieData.overview = movieData.overview.replace(/^(.{200}[^\s]*).*/, "$1") + "\n" + "...";

		var movieTemplate = template(movieData);
		$("#success").append(movieTemplate);
};

// Initialize
movieApp.init = function() {
	$("form").on("submit", function(e) {
		e.preventDefault();
	
		$(".submit").fadeOut(1000).hide();
		$(".restart, #results").fadeIn(1000).show();
		$("#error").html('<h2>Oh no! Your search returned 0 results. Please click "Try Again" to restart.</h2>').show();
		$("footer").show();

		var desiredGenre = $("select[name=genre]").val();
		movieApp.desiredRuntime = Number($("input[name=runtime]").val());
		movieApp.getMovieByGenre1(desiredGenre);
		movieApp.getMovieByGenre2(desiredGenre);
		movieApp.getMovieByGenre3(desiredGenre);
		movieApp.getMovieByGenre4(desiredGenre);
		movieApp.getMovieByGenre5(desiredGenre);
		movieApp.getMovieByGenre6(desiredGenre);

		$('html, body').animate({
         scrollTop: $("#results").offset().top
    	}, 750);
    	return false;
	});
	$(".restart").on("click",function(){
		$("#results, footer").hide();
		location.reload(true);
	});
};

// Document ready
	movieApp.init();