/*
	* Flickr API - Learning jQuery ajax
*/

$(document).ready(function() {
	// load the profile, then the public photos
	flickrFindByUsername();
	flickrGetPublicPhotos();

	// onclick load the User Information
	/* $('.search').on("click", function(e) {
		e.preventDefault();
		$('#flickrUserInfo').empty();
		$('#flickrPhotos').empty();
		findByUserName();
	}); */

});
var flickrKey = '31749d85ae9c0811522eedcac9b7390d',
	flickrSecret = '3e8a1b8e6a577c24',
	flickrUserID = '15771535@N04';

// Create the FindByUsername URL
var usernameBaseURL = 'http://api.flickr.com/services/rest/',
	flickrFindByUsernameURL = usernameBaseURL + '?method=flickr.people.getInfo'
		+ '&api_key=' + flickrKey + '&user_id=' + flickrUserID
		+ '&format=json&nojsoncallback=1';
// console.log(flickUrl);

// Create the GetPublicPhotos URL
var photosBaseURL = 'http://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos',
	photosPerPage = 9,
	photoPages = 1,
	flickrGetPublicPhotosURL = photosBaseURL + '&api_key=' +
		flickrKey + '&user_id=' + flickrUserID + '&per_page=' +
		photosPerPage + '&page=' + photoPages + '&format=json&nojsoncallback=1';
// console.log(PublicPhotosURL);

/*
	* flickr.people.getInfo
	* http://www.flickr.com/services/api/flickr.people.getInfo.html
*/
var flickrFindByUsername = function() {
	$.ajax({
		url: flickrFindByUsernameURL,
		dataType: 'json',
		success: function(data) {

			var flickrInfo = $( "#flickrUserInfo" );
			$('<h1><a href="'
				+ data.person.profileurl._content
				+ '">'
				+ data.person.realname._content
				+ '</a></h1>').appendTo(flickrInfo);

			$('<p>'
				+ data.person.id
				+ ', '
				+ data.person.username._content
				+ '</p>').appendTo(flickrInfo);

			$('<p>'
				+ data.person.description._content
				+ '</p>').appendTo(flickrInfo);
		},
		error: function(error) {
			console.log("error"+error.status);
		}
	});
}

/*
	* flickr.people.getPublicPhotos
	* http://www.flickr.com/services/api/flickr.people.getPhotos.html
	* http://www.flickr.com/photos/{user-id}/{photo-id} - individual photo
*/
var flickrGetPublicPhotos = function() {
	$.ajax({
		url: flickrGetPublicPhotosURL,
		dataType: 'json',
		success: function(data) {
			// console.log(data);
			// Iterates over the properties in an object, accessing both the current item and its key.
			$.each(data.photos.photo, function(k, v) {

				var flickrInfo = $( "#flickrPhotos" );

				$('<div class="thumb"><a href="http://www.flickr.com/photos/'
					+ v.owner + '/'
					+ v.id
					+ '"><img src="http://farm'
					+ v.farm
					+ '.staticflickr.com/'
					+ v.server
					+ '/'
					+ v.id
					+ '_'
					+ v.secret
					+ '_n.jpg'
					+ '" id="'
					+ v.id
					+ '"><div class="mask"><p>'
					+ v.title
					+ '</p></div></a></div>'
					).appendTo(flickrInfo);
			});
		},
		error: function(error) {
			console.log("Error: "+ error.status);
		},
	});
}














