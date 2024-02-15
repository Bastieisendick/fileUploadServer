let filters = {};				//{max_file_size : '10mb',mime_types: [{title : "Image files", extensions : "jpg,gif,png"},{title : "Zip files", extensions : "zip"}]};

let uploader = new plupload.Uploader(
	{
		runtimes : 'html5,silverlight,html4',
		
		browse_button : 'uploadButton',
		container: document.getElementById('buttonContainer'),
		
		url : 'fileUpload.php',

		chunk_size: '1024000',
		max_retries: 10,
		
		flash_swf_url : 'plupload/Moxie.swf',
		silverlight_xap_url : 'plupload/Moxie.xap',

		filters : filters,

		init: {
			PostInit: function() {
				document.getElementById('fileList').innerHTML = '';

				document.getElementById('startUploadButton').onclick = function() {
					uploader.start();
					return false;
				};
			},

			FilesAdded: function(up, files) {
				plupload.each(files, function(file) {
					document.getElementById('fileList').innerHTML += '<div id="' + file.id + '"  class="uploadedFileInfo">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';
				});
			},

			UploadProgress: function(up, file) {
				document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span style="color: ' + (file.percent === 100 ? 'green' : 'yellow') + ';">' + file.percent + "%</span>";
			},

			Error: function(up, err) {
				document.getElementById('console').appendChild(document.createTextNode("\nError #" + err.code + ": " + err.message));
			}
		}
	}
);

uploader.init();
