
	
setTimeout(function() {
	var s_width = window.innerWidth;
	var s_height = window.innerHeight;
	var loadingPicBox_height = $(".U_loading_pic_box").height();
	var loadingPicBox_width = $(".U_loading_pic_box").width();
	var loadingPic_height = $(".U_loading_pic").height();
	var loadingPic_width = $(".U_loading_pic").width();
	var scale = loadingPicBox_height/loadingPic_height;

	$(".U_loading_pic").css({
	    "-webkit-transform": "translate(-50%, -50%) scale("+scale+")"
	})
	$("#U_loading_page").css({"visibility":"visible"});
}, 0)


var BASE_URL = "./image/"
// var BASE_URL = "http://h5.gitos.org/p03_in/image/"

var loadImgArr = [
	BASE_URL+"bg_long.png",
	BASE_URL+"ceil.png",

	BASE_URL+"entry_bg.png",
	BASE_URL+"entry_gate_left.png",
	BASE_URL+"entry_gate_right.png",
	BASE_URL+"entry_ground.png",
	BASE_URL+"entry_sky.png",
	BASE_URL+"entry_logo.png",
	BASE_URL+"entry_man_1.png",
	BASE_URL+"entry_man_2.png",
	BASE_URL+"entry_tag_1.png",
	BASE_URL+"entry_tag_2.png",
	BASE_URL+"entry_tag_3.png",
	BASE_URL+"entry_tag_4.png",
	BASE_URL+"entry_tag_5.png",

	BASE_URL+"pic_1.png",
	BASE_URL+"pic_2.png",
	BASE_URL+"pic_3.png",
	BASE_URL+"pic_4.png",
	BASE_URL+"pic_5.png",
	BASE_URL+"pic_6.png",
	BASE_URL+"pic_7.png",
	BASE_URL+"pic_8.png",
	BASE_URL+"pic_9.png",
	BASE_URL+"pic_10.png",
	BASE_URL+"pic_11.png",
	BASE_URL+"pic_12.png",

	BASE_URL+"content_1.png",
	BASE_URL+"content_2.png",
	BASE_URL+"content_3.png",
	BASE_URL+"content_4.png",
	BASE_URL+"content_5.png",
	BASE_URL+"content_6.png",
	BASE_URL+"content_7.png",
	BASE_URL+"content_8.png",
	BASE_URL+"content_9.png",
	BASE_URL+"content_10.png",
	BASE_URL+"content_11.png",
	BASE_URL+"content_12.png",

	BASE_URL+"statue_1.png",
	BASE_URL+"statue_3.png",
	BASE_URL+"statue_4.png",
	BASE_URL+"statue_5.png",
	BASE_URL+"statue_6.png",
	BASE_URL+"statue_7.png",
	BASE_URL+"statue_8.png",
	BASE_URL+"statue_9.png",
	BASE_URL+"statue_10.png",
	BASE_URL+"statue_2_1.png",
	BASE_URL+"statue_2_2.png",
	BASE_URL+"statue_2_3.png",
	BASE_URL+"statue_2_4.png",
	BASE_URL+"statue_2_5.png",

]

// @debug
// var needPreLoad = false;

var needPreLoad = true;

if(needPreLoad) {

	var imageLoad = new ImageLoad,
	    imageUrls = [],
	    $loadingPage = $("#U_loading_page");

	$(document.body).find("img").each(function() {
	    imageUrls.push($(this).attr("src"))
	});

	imageLoad.queueImage(imageUrls).queueImage(loadImgArr).preLoad(function(a) {
		$loadingPage.find("#percent").html(a+"%");
	}, function() {
		$("#U_wrapper").css({"visibility":"visible"});
	    setTimeout(function() {
	    	$loadingPage.hide();
	        window.CORE && window.CORE.init();
	    }, 500);

	    setTimeout(function() {
	        document.getElementById("J_BgAudio").play()
	    }, 2000);

	});
}
else{
	$("#U_wrapper").css({"visibility":"visible"});
	var $loadingPage = $("#U_loading_page");
	$loadingPage.hide();
    window.CORE && window.CORE.init();

    setTimeout(function() {
        document.getElementById("J_BgAudio").play()
    }, 2000)
}


