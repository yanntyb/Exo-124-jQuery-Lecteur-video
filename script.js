// FIXME Assurez vous que ces deux variables contiennent bien les bonnes choses ;-)
let player = $('.player__video').first().get(0);
let progress = $('.progress__filled').first().get(0);
let progressDiv = $(".progress").first().get(0);
let mouseUp = false;

let volume = $("#volume").first().get(0);
let playbackrate = $("#playbackRate").first().get(0);

$(".toggle").click(function () {
    $(this).toggleClass("play");
    if ($(this).hasClass("play")) {
        $(this).html("⏸")
        player.play();
    } else {
        $(this).html("►");
        player.pause();
    }
})

player.addEventListener("timeupdate", function () {
    if (player.currentTime - 1 < Math.trunc(player.duration)) {
        $(progress).animate({
            width: (100 / player.duration) * player.currentTime + "%"
        }, 1);
    }
})

$(progressDiv).mousemove(function (e) {
    if(mouseUp){
        let mouseProgress = e.pageX - $(progressDiv).offset().left;
        let witdh = $(progressDiv).css('width');
        let newCurrentTime = mouseProgress/parseInt(witdh) * 100;
        $(progress).css({
            width: newCurrentTime + "%"
        })
        player.currentTime = (player.duration/100) * newCurrentTime;
    }

})

$(volume).mousemove(function (e) {
    if(mouseUp){
        let mouseProgress = e.pageX - $(volume).offset().left;
        if(mouseProgress > 0) {

            let witdh = $(volume).css('width');
            let newCurrentTime = mouseProgress / parseInt(witdh);
            if (newCurrentTime < 1) {
                player.volume = newCurrentTime;
            }
        }
    }
})

$(playbackrate).mousemove(function (e) {
    if(mouseUp){
        let mouseProgress = e.pageX - $(playbackrate).offset().left;
        if(mouseProgress > 0) {

            let witdh = $(playbackrate).css('width');
            let newCurrentTime = mouseProgress / parseInt(witdh);
            if (newCurrentTime < 1) {
                player.playbackRate = 1 + newCurrentTime*2;
            }
        }
    }
})

document.body.onmousedown = function (){
    mouseUp = true
}

document.body.onmouseup = function (){
    mouseUp = false
}