let filters = {};				//{max_file_size : '10mb',mime_types: [{title : "Image files", extensions : "jpg,gif,png"},{title : "Zip files", extensions : "zip"}]};

let uploader = new plupload.Uploader(
	{
		runtimes : 'html5,flash,silverlight,html4',
		
		browse_button : 'uploadButton',
		container: document.getElementById('buttonContainer'),
		
		url : 'fileUpload.php',
		
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
					document.getElementById('fileList').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';
				});
			},

			UploadProgress: function(up, file) {
				document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
			},

			Error: function(up, err) {
				document.getElementById('console').appendChild(document.createTextNode("\nError #" + err.code + ": " + err.message));
			}
		}
	}
);

uploader.init();
