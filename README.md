# fileUploadServer
This is an easy to use File Upload Server using Plupload.

# Installing
1. Donwload and extract the newest Plupload version directly into the plupload folder
2. Get a Webserver with PHP installed (I used an Apache server with a PHP plugin on Windows)
3. Change the upload path in fileUpload.php to your preferred destination and the Timezone if needed
4. Relocate your source code onto the Web server
5. Open the website and enjoy!

If you want, you can also set some client-side upload filters like max file size and MIME Types in the js/scripts.js

Check out [Plupload by Moxiecode](https://github.com/moxiecode/plupload)


This is a modified code from the official Plupload examples.
No security features are added in any way, so be careful and implement your own if needed.
It should only be used in networks where security is not needed (private).

Using this may result in modification and loss of data. Hereby no guarantees or responsibilities are taken.