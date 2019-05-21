function randomQuote() {
    $.ajax({
        url: "https://api.forismatic.com/api/1.0/?",
        dataType: "jsonp",
        data: "method=getQuote&format=jsonp&lang=en&jsonp=?",
        success: function (quoteData) {

            if (quoteData.quoteAuthor === '') {
                quoteData.quoteAuthor = 'Unknown';
            };

            $("#randomQuote").html("<p id='randomQuote'><i class=\"fa fa-quote-left\"></i>    " + quoteData.quoteText + "<br/> <div class=\"text-right\"> — " + quoteData.quoteAuthor + "</div></p>");
        }
    });
}

randomQuote();
setInterval(function () {
    $('#randomQuote').fadeOut(2000, function () {
        setInterval(randomQuote(), 2000);
        $('#randomQuote').fadeIn(2000, function () {

        });

    });
}, 10000);