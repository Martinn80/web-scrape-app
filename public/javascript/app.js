$(document).ready(function () {
    
    function startScrapping() {
        getNews(results => {
            //console.log(results);
            $('.articles').empty()
            let articles = results.data
            for (let i = 0; i < articles.length; i++) {
                $('.articles').prepend(`
                <div class="card p-2 mt-2">
                    <div class="card-body">
                        <h5 class="card-text">${articles[i].title}</h5>
                        <a href="${articles[i].url}" class="card-link"><i class="fa fa-car"></i>Website</a>
                        <button class="btn commentBtn" id = "${i}"><i class="fa fa-comments"></i>Comment</button>
                        
                    </div>
                </div>`);
            }
            // getAllNews(articles => {
            //     for (let i = 0; i < articles.length; i++) {
            //         $('.articles').prepend(`
            //     <div class="card p-2 mt-2">
            //         <div class="card-body">
            //             <h5 class="card-text">${articles[i].summary}</h5>
            //             <a href="${articles[i].url}" class="card-link"><i class="fa fa-car"></i>Website</a>
            //             <button class="btn commentBtn" id = "${articles[i]._id}"><i class="fa fa-comments"></i>Comment</button>

            //         </div>
            //     </div>`);
            //     }
            // });
        });
    }
    function getNews(cb) {
        $.ajax({
            method: 'GET',
            url: '/all/scrape'
        }).then(result => {
            console.log('Got latest news');
            //console.log(result);

            cb(result);
        });
    }

    function getAllNews(cb) {
        $.ajax({
            method: 'GET',
            url: '/all'
        }).then(result => {
            cb(result);
        });
    }

    // add a function so that when a user clicks on "Scrape news", the articles will append to the page, hint $(sth).on('click', function(){ ... } )
    // function getName() {} or getName = () => {}
    $("#scrape_news").on('click', function() {
        // ?
        startScrapping()
    })

});