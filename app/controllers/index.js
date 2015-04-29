//====================NOTE================
//This module will work only on device not on simulator. You have to enable iCloud in your bundle id and install using that provisoning profile.
//Also open your provisoning profile and copy entitlements section in the file Entitlements.plist and add Entitlements.plist in the root of your Titanium Project.
//=========================================
//Create module object

var iCloudDbSync = require('com.sagar.iclouddbsync');
Ti.API.info("module is => " + iCloudDbSync);

// You have to initiate the module object with your UbiquityContainerIdentifier(Which is same as your bundle id with team ID prefix) and icloud root folder path.
// id is the UbiquityContainerIdentifier
// By default there are two folders available on each app's iCloud
// 1.Documents 2. Path
// I am using : Path/To/Data/Root

iCloudDbSync.initICloudDb({
	id : 'iCloud.com.icloudtest.ios',
	rootFolderPath : 'Path/To/Data/Root'
});

var icloud_connected = iCloudDbSync.isConnectedToiCloud;

$.lbl_status.text = "iCloud Status : " + (icloud_connected == true ? 'Connected' : 'Not Connected');

var filePath = Ti.Filesystem.resourcesDirectory + "titanium_logo.png";

//Create UI

function createFolder() {

	iCloudDbSync.createFolderAtICloudRootFolderPath({
		folderName : 'Subfolder',
		callback : function(e) {

			status = e.status.toString();

			if (status == "not_connected") {

				alert("Your device is not connected with iCloud.");

			} else if (status == 'done') {

				alert("complete!");

			} else if (status == 'failed') {

				alert("failed!");

			}

		}
	});

}

function upload() {

	iCloudDbSync.upload({
		fromPath : filePath,
		toPath : "Subfolder/titanium_logo.png",
		callback : function(e) {

			status = e.status.toString();

			if (status == "not_connected") {

				alert("Your device is not connected with iCloud.");

			} else if (status == 'done') {

				alert("Upload complete!");

			} else if (status == 'failed') {

				alert("Upload failed!" + e);

			}

		}
	});
}

function download() {

	//If you haven't created any sub folder under the root path than just pass filename in the fromPath.

	var saveFilePath = Ti.Filesystem.applicationDataDirectory + "titanium_logo.png";

	iCloudDbSync.download({
		fromPath : "Subfolder/titanium_logo.png",
		toPath : saveFilePath,
		callback : function(e) {

			status = e.status.toString();

			if (status == "not_connected") {

				alert("Your device is not connected with iCloud.");

			} else if (status == 'done') {

				alert("Download complete!");

			} else if (status == 'failed') {

				alert("Download failed!");

			} else if (status == 'file_not_exists') {
				alert("File not exists !");
			}

		}
	});
}

function deleteFile() {

	//You can delete file from icloud
	//fromPath is a path for that file

	iCloudDbSync.delete({

		fromPath : "Subfolder/titanium_logo.png",
		callback : function(e) {

			status = e.status.toString();

			if (status == "not_connected") {

				alert("Your device is not connected with iCloud.");

			} else if (status == 'done') {

				alert("File Deleted!");

			} else if (status == 'failed') {

				alert("Delete failed!");

			} else if (status == 'file_not_exists') {
				alert("File not exists !");
			}

		}
	});
}

//files_updated is an event listener to get notification when any file updated.
//Please note that when you will have this file change notification ,
//module's auto sync mechanisam may downloading that latest file to your iCloud container.
//So download that file to your local directory from iCloud container.
//Method showFileChangeView will download that file to local directory and set data.

iCloudDbSync.addEventListener('files_updated', function(e) {

	showFileChangeView();
	
	alert("Updated files = " + JSON.stringify(e.files));

	
});

function showFileChangeView() {

	var saveFilePath = Ti.Filesystem.applicationDataDirectory + "data.txt";

	$.textareaview.visible = true;

	iCloudDbSync.download({
		fromPath : "Subfolder/data.txt",
		toPath : saveFilePath,
		callback : function(e) {

			status = e.status.toString();

			if (status == "not_connected") {

				alert("Your device is not connected with iCloud.");

			} else if (status == 'done') {

				//alert("Download complete!");

				setTimeout(function() {

					setFileData();

				}, 2000);

			} else if (status == 'failed') {

				alert("Download failed!");

			} else if (status == 'file_not_exists') {
				alert("File not exists !");
			}

		}
	});

}

function setFileData() {

	var saveFilePath = Ti.Filesystem.applicationDataDirectory + "data.txt";
	Ti.API.info("setFileData-FIlepath = " + saveFilePath);
	var newFile = Titanium.Filesystem.getFile(saveFilePath);

	if (newFile.exists()) {
		$.textarea.value = newFile.read();
	} else {
		alert("data.txt is not there");
	}
}

function hideFileChangeView() {
	$.textareaview.visible = false;
}

function saveFileData() {

	hideFileChangeView();

	//Create file and write text to it.

	var saveFilePath = Ti.Filesystem.applicationDataDirectory + "data.txt";
	Ti.API.info("saveFileData-FIlepath = " + saveFilePath);
	var newFile = Titanium.Filesystem.getFile(saveFilePath);

	newFile.createFile();

	if (newFile.exists()) {
		newFile.write($.textarea.value + '\n');
		Ti.API.info('newfile: ' + newFile.read());

		//Upload that file on icloud

		iCloudDbSync.upload({
			fromPath : saveFilePath,
			toPath : "Subfolder/data.txt",
			callback : function(e) {

				status = e.status.toString();

				if (status == "not_connected") {

					alert("Your device is not connected with iCloud.");

				} else if (status == 'done') {

					alert("Upload complete!");

				} else if (status == 'failed') {

					alert("Upload failed!" + e);

				}

			}
		});

	}

}

$.index.open();
