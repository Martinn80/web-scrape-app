$(document).ready(function () {
    start();

    function start() {
        getNews(result => {
            console.log(result);

            getAllNews(articles => {
                for (let i = 0; i < articles.length; i++) {
                    $('.articles').prepend(`
                <div class="card p-2 mt-2">
                    <div class="card-body">
                        <h5 class="card-title">${articles[i].title}</h5>
                        <p class="card-text">${articles[i].summary}</p>
                        <a href="${articles[i].url}" class="card-link"><i class="fa fa-car"></i>Website</a>
                        <button class="btn commentBtn" id = "${articles[i]._id}"><i class="fa fa-comments"></i>Comment</button>
                    </div>
                </div>`);
                }
            });
        });
    }
    function getNews(cb) {
        $.ajax({
            method: 'GET',
            url: '/all/scrape'
        }).then(result => {
            console.log('Got latest news');
            console.log();

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
});