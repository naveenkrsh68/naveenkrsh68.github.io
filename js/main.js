$(document).ready(() => {
	$('.searchForm').on('submit',(e) => {
		e.preventDefault();
		let searchText = $('.searchText').val();
		//console.log('searchText'+searchText);
		getMovies(searchText);
	});
});


function getMovies(searchText) {
	axios.get(' http://www.omdbapi.com/?s='+searchText+'&apikey=343d3187')
		 .then((response) => {
		 	let movies = response.data.Search;
		 	let display = '';
		 	$.each(movies,(index,movie) => {
		 		display += `
		 			<div class="col-md-3">
		 				<div class="well text-center">
		 					<img src="${movie.Poster}" />
		 					<h4>${movie.Title}</h4>
		 					<a href="#" onClick="movieSelected('${movie.imdbID}')" class="btn btn-info">Movie Details</a>	
		 				</div>
		 			</div>
		 		`;
		 	});

		 	$("#movies").html(display);
		 })
		 .catch((err) => {
		 	console.log(err);
		});
}

function movieSelected(id) {
	sessionStorage.setItem('movieId',id);
	window.location = 'movie.html';
	return false;
}

function getMovie() {
	let movieId = sessionStorage.getItem('movieId')

	axios.get(' http://www.omdbapi.com/?i='+movieId+'&apikey=343d3187')
		 .then((response) => {
		 	let movie = response.data;
		 	
		 	let display = `<div class="row">
		 						<div class="col-md-4">
		 							<img src="${movie.Poster}" class="thumbnail"/>
		 						</div>
		 						<div class="col-md-6">
		 							<h3>${movie.Title}</h3>
		 							<ul class="list-group">
		 								<li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
		 								<li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
		 								<li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
		 								<li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
		 								<li class="list-group-item"><strong>Production:</strong> ${movie.Production}</li>
		 								<li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
		 								<li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
		 								<li class="list-group-item"><strong>Cast:</strong> ${movie.Actors}</li>
		 							</ul>
		 						</div>			
		 				   	</div>
		 				   	<div class="row">
		 				   		<div class="well">
		 				   			<h3>Plot</h3>
		 				   			${movie.Plot}
		 				   			<hr>
		 				   			<a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
		 				   			<a href="index.html" class="btn btn-default">Go Back To Search</a>
		 				   		</div>
		 				   	</div>`;

		 	$("#movie").html(display);
		 })
		 .catch((err) => {
		 	console.log(err);
		});
}