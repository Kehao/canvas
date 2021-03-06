var ImageLoad = function() {
    this.images = [],
    this.imageUrls = [],
    this.imagesLoaded = 0,
    this.imagesFailedToLoad = 0,
    this.imageLoadingProgress = 0,
    this.imageLen = 0
}
;
ImageLoad.prototype = {
    queueImage: function(a) {
        var e = this;
        return "[object Array]" === Object.prototype.toString.call(a) ? a.forEach(function(a) {
            e.imageUrls.push(a)
        }) : this.imageUrls.push(a),
        this.imageLen = this.imageUrls.length,
        this
    },
    preLoad: function(a, e) {
        this.loadImages(),
        this.imageLoadingProgressCallback(a, e)
    },
    loadImages: function() {
        var a = this;
        return this.imageUrls.forEach(function(e, i) {
            var o = new Image;
            o.src = e,
            o.complete ? (a.images[i] = o,
            a.imagesLoaded++) : (o.onload = function(e) {
                return function() {
                    a.images[e] = o,
                    a.imagesLoaded++
                }
            }(i),
            o.onerror = function() {
                a.imagesFailedToLoad++
            }
            )
        }),
        this
    },
    imageLoadingProgressCallback: function(a, e) {
        var i = this
          , o = setInterval(function() {
            var s = Math.floor((i.imagesLoaded + i.imagesFailedToLoad) / i.imageLen * 100);
            i.imageLoadingProgress = isNaN(s) ? 100 : s;
            100 === i.imageLoadingProgress && (clearInterval(o),
            setTimeout(function() {
                e.call(i),
                i.imagesLoaded = 0,
                i.imagesFailedToLoad = 0
            }, 300));
            a.call(i, i.imageLoadingProgress)
        }, 100)
    },
    getLoadAfterImages: function() {
        return this.images
    }
},
window.ImageLoad = ImageLoad;
