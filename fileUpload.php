<?php

	header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
	header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
	header("Cache-Control: no-store, no-cache, must-revalidate");
	header("Cache-Control: post-check=0, pre-check=0", false);
	header("Pragma: no-cache");

	$targetDir = 'uploads';

	if (!file_exists($targetDir)) {
		@mkdir($targetDir);
	}

	if (isset($_REQUEST["name"])) {
		$fileName = $_REQUEST["name"];
	} elseif (!empty($_FILES)) {
		$fileName = $_FILES["file"]["name"];
	} else {
		$fileName = uniqid("file_");
	}
	

	$currentDate = new DateTime("now", new DateTimeZone('Europe/Berlin'));
	$currentDate->setTimestamp(time());

	$filePath = $targetDir . DIRECTORY_SEPARATOR . $currentDate->format('Y-m-d-H-i-s_') . $fileName;

	$chunk = isset($_REQUEST["chunk"]) ? intval($_REQUEST["chunk"]) : 0;
	$chunks = isset($_REQUEST["chunks"]) ? intval($_REQUEST["chunks"]) : 0;


	if (!$out = @fopen("{$filePath}.part", $chunks ? "ab" : "wb")) {
		die('{"jsonrpc" : "2.0", "error" : {"code": 102, "message": "Failed to open output stream."}, "id" : "id"}');
	}

	if (!empty($_FILES)) {
		if ($_FILES["file"]["error"] || !is_uploaded_file($_FILES["file"]["tmp_name"])) {
			die('{"jsonrpc" : "2.0", "error" : {"code": 103, "message": "Failed to move uploaded file."}, "id" : "id"}');
		}

		if (!$in = @fopen($_FILES["file"]["tmp_name"], "rb")) {
			die('{"jsonrpc" : "2.0", "error" : {"code": 101, "message": "Failed to open input stream."}, "id" : "id"}');
		}
	} else {	
		if (!$in = @fopen("php://input", "rb")) {
			die('{"jsonrpc" : "2.0", "error" : {"code": 101, "message": "Failed to open input stream."}, "id" : "id"}');
		}
	}

	while ($buff = fread($in, 102400)) {
		fwrite($out, $buff);
	}

	@fclose($out);
	@fclose($in);

	if (!$chunks || $chunk == $chunks - 1) {
		rename("{$filePath}.part", $filePath);
	}

	die('{"jsonrpc" : "2.0", "result" : null, "id" : "id"}');
	
?>