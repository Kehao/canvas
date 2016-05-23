
;
window.CORE = (function() {


    var GallerySlide = function() {
        this.startX = 0;
        this.startY = 0;
        this.translateX = 0;
        this.$galleryBg = $(".gallery");
        this.galleryBgHeight = $(".gallery").height();
        this.scale = 1;
        this.picViewer = new PicViewer();
    }

    GallerySlide.prototype = {

        initScale: function() {
            var self = this;
            self.scale = window.innerHeight / self.galleryBgHeight;
            self.$galleryBg.css("-webkit-transform", "matrix("+self.scale+", 0, 0, "+self.scale+", 0, 0)");
        },

        bindEvents: function() {
            var self = this;
            self.initScale();
            document.body.addEventListener('touchstart', function(e) {
                if(self.picViewer.state == 1) {
                    event.preventDefault();
                    return;
                }
                self.onTouchStart(e.changedTouches[0]);
            });
            document.body.addEventListener('touchmove', function(e) {
                if(self.picViewer.state == 1) {
                    event.preventDefault();
                    return;
                }
                self.onTouchMove(e.changedTouches[0]);
            });
            window.onresize = function() {
                self.initScale();
            }
            self.picViewer.bindEvents();
        },

        onTouchStart: function(e) {
            var self = this;
            self.startX = e.pageX;
            self.translateX = self.$galleryBg.css("-webkit-transform");
            self.translateX = self.translateX.replace("matrix(", "");
            self.translateX = self.translateX.replace(")", "");
            self.translateX = self.translateX.split(",");
            self.translateX = parseInt(self.translateX[4]);
        },

        onTouchMove: function (e) {
            var self = this;
            event.preventDefault();
            var _translateX = self.translateX + e.pageX - self.startX;

            if(_translateX > 0) {
                _translateX = 0
            }
            else if(_translateX < -1 * self.$galleryBg.width() + window.innerWidth) {
                _translateX = -1 * self.$galleryBg.width() + window.innerWidth;
            }
            self.$galleryBg.css("-webkit-transform", "matrix("+self.scale+", 0, 0, "+self.scale+", " + _translateX + ", 0)");
        }
    }



    var PicViewer = function() {
        this.state = 0;  //0-close  1-open
        this.picIndex = -1;  //[1,12]
    }
    PicViewer.prototype = {
        bindEvents: function() {
            var _this = this;
            _this.onOpen();
            _this.onClose();
        },
        onOpen: function() {
            var _this = this;
            $(window).on("tap", ".U_pic", function() {
                _this.state = 1;
                var index = $(this).data("index");
                _this.picIndex = index;

                // console.log(_this.picIndex);

                $(".U_pic_content").css({
                    "background": 'url("./image/content_'+index+'.png") center center no-repeat',
                    // "width": "100%",
                    // "height": "100%",
                    // "background-size": "contain",
                    "width": "640px",
                    "height": "1008px",
                    // "-webkit-transform": "translate(-50%, -50%) scale("+window.innerHeight/1004+")"
                })

                $(".U_pic_viewer_wrapper").css({
                    "-webkit-transform": "translate(-50%, -50%) scale("+window.innerHeight/1004+")"
                })

                // 大图里小icon动画特效
                $(".U_icon").hide();
                $(".U_icon_"+index).show();

                $(".U_pic_viewer").css({"opacity":1});
            })
        },
        onClose: function() {
            var _this = this;
            $(window).on("tap", "#J_closePicViewer", function() {
                _this.state = 0;
                $(".U_pic_viewer").css({"opacity":0});
            })
        }
    }






    var init = function() {
        $(function() {

            var s_width = window.innerWidth;
            var s_height = window.innerHeight;
            // 横屏
            if(s_width > s_height) {
                $(".U_size").css({"background-size": "contain"})
                $(".U_entry").css({
                    "-webkit-transform-origin": "55% 52%"
                })
            }
            else{
                $(".U_size").css({"background-size": "cover"})
                $(".U_entry").css({
                    "-webkit-transform-origin": "68% 52%"
                })
            }
            


            var isFirstOpenGate = true;  //是否第一次打开大门
            var isExitManShowed = false;  //闭馆小人是否已出现
            var isInExitAnimation = false;   //闭馆动画
            var isInEntryAnimation = false;  //进馆动画

            // 进馆
            $(window).on("tap", "#J_open_gate", function() {
                if(isInExitAnimation || isInEntryAnimation){
                    return;
                }
                isInEntryAnimation = true;

                $(".U_gallery").css({"display": "block"});

                $(".U_entry").css({
                    "-webkit-transform": "scale(3.6)",
                })
                setTimeout(function() {
                    $(".U_entry_gate_left").css({
                        "-webkit-transform": "translateX(-200px)"
                    })
                    $(".U_entry_gate_right").css({
                        "-webkit-transform": "translateX(200px)"
                    })
                    $(".U_gallery").css({"opacity": 1});
                    if(isFirstOpenGate) {
                        var gallerySlide = new GallerySlide();
                        gallerySlide.bindEvents();
                        isFirstOpenGate = false;
                    }
                }, 800);

                setTimeout(function() {
                    $(".U_entry").hide();
                    isInEntryAnimation = false;
                }, 2000);
            })

            // 闭馆
            $(window).on("tap", "#J_exit_gallery", function() {
                if(isInExitAnimation || isInEntryAnimation){
                    return;
                }
                
                isInExitAnimation = true;

                $(".U_gallery").css({
                    "display": "none",
                    "opacity": 0
                });
                $(".U_entry").css({
                    "-webkit-transform": "scale(2)",
                });
                $(".U_entry").show();
                $(".U_entry").css({
                    "-webkit-transform": "scale(1)",
                    "-webkit-transition": "all 1s linear"
                });

                // 关门
                setTimeout(function() {
                    $(".U_entry_gate_left").css({
                        "-webkit-transform": "translateX(0px)"
                    })
                    $(".U_entry_gate_right").css({
                        "-webkit-transform": "translateX(0px)"
                    })
                }, 800);


                if(isExitManShowed) {
                    setTimeout(function() {
                        $(".U_exit").show();
                        isInExitAnimation = false;
                    }, 2000)
                }
                else{
                    isExitManShowed = true;
                    setTimeout(function() {
                        $(".U_exit").show();
                        $(".U_entry_man_1").css({"opacity": 1})
                    }, 2000)
                    setTimeout(function() {
                        $(".U_entry_tag_2").css({
                            "opacity": 1,
                            "-webkit-transform": "translate(0, 0)"
                        })
                    }, 2500);
                    setTimeout(function() {
                        $(".U_entry_tag_3").css({
                            "opacity": 1,
                            "-webkit-transform": "translate(0, 0)"
                        })
                    }, 3000);
                    setTimeout(function() {
                        $(".U_entry_man_2").css({"opacity": 1})
                    }, 4000);
                    setTimeout(function() {
                        $(".U_entry_tag_1").css({
                            "opacity": 1,
                            "-webkit-transform": "translate(0, 0)"
                        })
                    }, 4500);
                    setTimeout(function() {
                        $(".U_entry_tag_4").css({
                            "opacity": 1,
                            "-webkit-transform": "translate(0, 0)"
                        })
                        $(".U_entry_tag_5").css({
                            "opacity": 1
                        })
                        isInExitAnimation = false;
                    }, 5200);
                }
            })
    
            // share
            $("#J_share").on("touchstart", function() {
                // 分享逻辑放这里
                console.log("share")
            });



            // music
            $("#J_Sound").on("touchstart", function() {
                if($(this).hasClass("pause")) {
                    $(this).removeClass("pause");
                    $(".icon-play").show();
                    $(".icon-pause").hide();
                    document.getElementById("J_BgAudio").play();
                }
                else{
                    $(this).addClass("pause");
                    $(".icon-play").hide();
                    $(".icon-pause").show();
                    document.getElementById("J_BgAudio").pause();
                }
            })

            // @debug
            $(window).on("tap", "#J_exit_gallery_test", function() {
                if(isInExitAnimation || isInEntryAnimation){
                    return;
                }
                
                isInExitAnimation = true;

                $(".U_gallery").css({
                    "display": "none",
                    "opacity": 0
                })

                $(".U_entry").css({
                    "-webkit-transform": "scale(2)",
                });
                $(".U_entry").show();
                $(".U_entry").css({
                    "-webkit-transform": "scale(1)",
                    "-webkit-transition": "all 1s linear"
                });
                // 关门
                setTimeout(function() {
                    $(".U_entry_gate_left").css({
                        "-webkit-transform": "translateX(0px)"
                    })
                    $(".U_entry_gate_right").css({
                        "-webkit-transform": "translateX(0px)"
                    })
                }, 800);


                if(isExitManShowed) {
                    setTimeout(function() {
                        $(".U_exit").show();
                        isInExitAnimation = false;
                    }, 2000)
                }
                else{
                    isExitManShowed = true;
                    setTimeout(function() {
                        $(".U_exit").show();
                        $(".U_entry_man_1").css({"opacity": 1})
                    }, 2000)
                    setTimeout(function() {
                        $(".U_entry_tag_2").css({
                            "opacity": 1,
                            "-webkit-transform": "translate(0, 0)"
                        })
                    }, 2500);
                    setTimeout(function() {
                        $(".U_entry_tag_3").css({
                            "opacity": 1,
                            "-webkit-transform": "translate(0, 0)"
                        })
                    }, 3000);
                    setTimeout(function() {
                        $(".U_entry_man_2").css({"opacity": 1})
                    }, 4000);
                    setTimeout(function() {
                        $(".U_entry_tag_1").css({
                            "opacity": 1,
                            "-webkit-transform": "translate(0, 0)"
                        })
                    }, 4500);
                    setTimeout(function() {
                        $(".U_entry_tag_4").css({
                            "opacity": 1,
                            "-webkit-transform": "translate(0, 0)"
                        })
                        $(".U_entry_tag_5").css({
                            "opacity": 1
                        })
                        isInExitAnimation = false;
                    }, 5200);
                }
            })
        })
    }


    return {
        init: init
    }
})()