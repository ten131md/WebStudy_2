$(function() {

	/**
	 * キャンバスに対してクロマキー処理する関数
	 * @param {Canvas} 処理対象のCanvas
	 * @param {Context} 処理対象のCanvasの2D-Context
	 */
	function chromakeyImage(canvas, context) {
		// キャンバスの画像を取得
		var image = context.getImageData(0, 0, canvas.width, canvas.height);

		// 画像の各画素を反復
		for (var i = 0, l = image.data.length; i < l; i += 4) {
			// 画素を取得 (赤, 緑, 青, 透明度)
			var red = image.data[i];
			var green = image.data[i+1];
			var blue = image.data[i+2];
			var alpha = image.data[i+3];
			// テスト
			if (red == 255) {
				image.data[i+3] = 0; // 透明にする
			}
		}

		// Canvasを書き換え
		context.putImageData(image.data, 0, 0);
	};

	$('#sourceFile').change(function(evt) {

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

	});

});
