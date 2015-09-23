$(function() {
    
   var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    // そのまま表示すると鏡像にならないので反転させておく
    canvas.style.transform = 'rotateY(180deg)';

    var context = canvas.getContext('2d');

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    navigator.getUserMedia({video: true, audio: false}, function (stream) {
        video.src = URL.createObjectURL(stream);
        draw();
    }, function () {});

    // videoの映像をcanvasに描画する
    var draw = function () {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        chromaKey();
        requestAnimationFrame(draw);
    };
    
      // r,g,bというkeyを持ったobjectが第一引数と第二引数に渡される想定
    var getColorDistance = function (rgb1, rgb2) {
        // 三次元空間の距離が返る
        return Math.sqrt(
            Math.pow((rgb1.r - rgb2.r), 2) +
            Math.pow((rgb1.g - rgb2.g), 2) +
            Math.pow((rgb1.b - rgb2.b), 2)
        );
    };
    
    // 消す色と閾値
    var chromaKeyColor = {r: 0, g: 255, b: 0},
        colorDistance = 30;

    // クロマキー処理
    var chromaKey = function () {
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height),
            data = imageData.data;

        // dataはUint8ClampedArray
        // 長さはcanvasの width * height * 4(r,g,b,a)
        // 先頭から、一番左上のピクセルのr,g,b,aの値が順に入っており、
        // 右隣のピクセルのr,g,b,aの値が続く
        // n から n+4 までが1つのピクセルの情報となる

        for (var i = 0, l = data.length; i < l; i += 4) {
            var target = {
                    r: data[i],
                    g: data[i + 1],
                    b: data[i + 2]
                };

            // chromaKeyColorと現在のピクセルの三次元空間上の距離を閾値と比較する
            // 閾値より小さい（色が近い）場合、そのピクセルを消す
            if (getColorDistance(chromaKeyColor, target) < colorDistance) {
                // alpha値を0にすることで見えなくする
                data[i + 3] = 0;
            }
        }

        // 書き換えたdataをimageDataにもどし、描画する
        imageData.data = data;
        context.putImageData(imageData, 0, 0);
    };
});
