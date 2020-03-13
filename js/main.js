// YOU WILL NEED TO ADD YOUR OWN API KEY IN QUOTES ON LINE 5, EVEN FOR THE PREVIEW TO WORK.
// 
// GET YOUR API HERE https://console.developers.google.com/apis/api


// https://developers.google.com/youtube/v3/docs/playlistItems/list

// https://console.developers.google.com/apis/api/youtube.googleapis.com/overview?project=webtut-195115&duration=PT1H

// <iframe width="560" height="315" src="https://www.youtube.com/embed/qxWrnhZEuRU" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

// https://i.ytimg.com/vi/qxWrnhZEuRU/mqdefault.jpg


$(document).ready(function () {

    let key = ['AIzaSyCOfiaa35Bhbp9Z2jovn8fNX24JZqmf510'];
    let playlistId = 'PLZN2wZjY_38CV9i8RUVdpUyF5yw_5tMQs';
    let URL = 'https://www.googleapis.com/youtube/v3/playlistItems';


    let options = {
        part: 'snippet',
        key: 'AIzaSyCOfiaa35Bhbp9Z2jovn8fNX24JZqmf510',
        maxResults: 20,
        playlistId: playlistId
    }

    loadVids();

    function loadVids() {
        $.getJSON(URL, options, function (data) {
            let id = data.items[0].snippet.resourceId.videoId;
            mainVid(id);
            resultsLoop(data);
        });
    }

    function mainVid(id) {
        $('#video').html(`
					<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
				`);
    }


    function resultsLoop(data) {

        $.each(data.items, function (i, item) {

            let thumb = item.snippet.thumbnails.medium.url;
            let title = item.snippet.title;
            let desc = item.snippet.description.substring(0, 100);
            let vid = item.snippet.resourceId.videoId;


            $('main').append(`
							<article class="item" data-key="${vid}">

								<img src="${thumb}" alt="" class="thumb">
								<div class="details">
									<h4>${title}</h4>
									<p>${desc}</p>
								</div>

							</article>
						`);
        });
    }

    // CLICK EVENT
    $('main').on('click', 'article', function () {
        let id = $(this).attr('data-key');
        mainVid(id);
    });


});