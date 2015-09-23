$(function() {

	var $videos = $('#bgVideos');

	var video_thumbs = [
		'http://placehold.it/240x180/ff0000/ffffff',
		'http://placehold.it/240x180/00ff00/ffffff',
		'http://placehold.it/240x180/0000ff/ffffff'
	];

	for (var i = 0; i < video_thumbs.length; i++) {

		var $img = $('<img/>');

		$img.data('videoId', i);
		$img.click(function() { // 画像がクリックされた時
			var $img = $(this);
			var video_id = $img.data('videoId');

			// 背景画像を設定
			var $video_frame = $('#videoFrame');
			var video_url = video_thumbs[video_id];
			$video_frame.css({
				width: $('#canvas').width(),
				height: $('#canvas').height(),
				background: 'url(' + video_url + ') 50% 50% no-repeat',
				backgroundSize: 'cover'
			});

		});

		$img.addClass('img-responsive');

		var url = video_thumbs[i];
		$img.attr('src', url);

		$videos.append($img);

	}

	/*$('#sourceFile').change(function(evt) {

		// キャンバスを取得
		var $canvas = $('#mCanvas');

		// キャンバスのコンテキストを取得
		var context = $canvas[0].getContext("2d");

		// 選択された画像ファイルの情報を取得
		var files = evt.target.files;
		var file = files[0];

		// Imageオブジェクトを生成
		var image = new Image();
		image.onload = function() { // 画像が読み込まれた時
			// キャンバスへ画像を描画
			context.drawImage(image, 0, 0);
			// キャンバスに対してクロマキー処理
			chromakeyImage($canvas[0], context);
		};

		// FileReaderを用いて画像ファイルを読み込み
		var reader = new FileReader();
		reader.onload = function(evt) { // ファイルが読み込まれた時
			// Imageオブジェクトへ画像を読み込み
			image.src = evt.target.result;
		};
		reader.readAsDataURL(file);

	});*/

});
