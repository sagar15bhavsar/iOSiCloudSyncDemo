function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function createFolder() {
        iCloudDbSync.createFolderAtICloudRootFolderPath({
            folderName: "Subfolder",
            callback: function(e) {
                status = e.status.toString();
                "not_connected" == status ? alert("Your device is not connected with iCloud.") : "done" == status ? alert("complete!") : "failed" == status && alert("failed!");
            }
        });
    }
    function upload() {
        iCloudDbSync.upload({
            fromPath: filePath,
            toPath: "Subfolder/titanium_logo.png",
            callback: function(e) {
                status = e.status.toString();
                "not_connected" == status ? alert("Your device is not connected with iCloud.") : "done" == status ? alert("Upload complete!") : "failed" == status && alert("Upload failed!" + e);
            }
        });
    }
    function download() {
        var saveFilePath = Ti.Filesystem.applicationDataDirectory + "titanium_logo.png";
        iCloudDbSync.download({
            fromPath: "Subfolder/titanium_logo.png",
            toPath: saveFilePath,
            callback: function(e) {
                status = e.status.toString();
                "not_connected" == status ? alert("Your device is not connected with iCloud.") : "done" == status ? alert("Download complete!") : "failed" == status ? alert("Download failed!") : "file_not_exists" == status && alert("File not exists !");
            }
        });
    }
    function deleteFile() {
        iCloudDbSync.delete({
            fromPath: "Subfolder/titanium_logo.png",
            callback: function(e) {
                status = e.status.toString();
                "not_connected" == status ? alert("Your device is not connected with iCloud.") : "done" == status ? alert("File Deleted!") : "failed" == status ? alert("Delete failed!") : "file_not_exists" == status && alert("File not exists !");
            }
        });
    }
    function showFileChangeView() {
        var saveFilePath = Ti.Filesystem.applicationDataDirectory + "data.txt";
        $.textareaview.visible = true;
        iCloudDbSync.download({
            fromPath: "Subfolder/data.txt",
            toPath: saveFilePath,
            callback: function(e) {
                status = e.status.toString();
                "not_connected" == status ? alert("Your device is not connected with iCloud.") : "done" == status ? setTimeout(function() {
                    setFileData();
                }, 2e3) : "failed" == status ? alert("Download failed!") : "file_not_exists" == status && alert("File not exists !");
            }
        });
    }
    function setFileData() {
        var saveFilePath = Ti.Filesystem.applicationDataDirectory + "data.txt";
        Ti.API.info("setFileData-FIlepath = " + saveFilePath);
        var newFile = Titanium.Filesystem.getFile(saveFilePath);
        newFile.exists() ? $.textarea.value = newFile.read() : alert("data.txt is not there");
    }
    function hideFileChangeView() {
        $.textareaview.visible = false;
    }
    function saveFileData() {
        hideFileChangeView();
        var saveFilePath = Ti.Filesystem.applicationDataDirectory + "data.txt";
        Ti.API.info("saveFileData-FIlepath = " + saveFilePath);
        var newFile = Titanium.Filesystem.getFile(saveFilePath);
        newFile.createFile();
        if (newFile.exists()) {
            newFile.write($.textarea.value + "\n");
            Ti.API.info("newfile: " + newFile.read());
            iCloudDbSync.upload({
                fromPath: saveFilePath,
                toPath: "Subfolder/data.txt",
                callback: function(e) {
                    status = e.status.toString();
                    "not_connected" == status ? alert("Your device is not connected with iCloud.") : "done" == status ? alert("Upload complete!") : "failed" == status && alert("Upload failed!" + e);
                }
            });
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.backview = Ti.UI.createView({
        backgroundColor: "White",
        height: "100%",
        width: "100%",
        layout: "vertical",
        top: 20,
        id: "backview"
    });
    $.__views.index.add($.__views.backview);
    $.__views.lbl_status = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: 70,
        color: "blue",
        text: "Getting iCloud Status...",
        top: "30",
        id: "lbl_status"
    });
    $.__views.backview.add($.__views.lbl_status);
    $.__views.__alloyId0 = Ti.UI.createButton({
        width: 200,
        height: 40,
        borderWidth: 2,
        borderColor: "blue",
        top: 15,
        color: "blue",
        title: "Create Folder",
        id: "__alloyId0"
    });
    $.__views.backview.add($.__views.__alloyId0);
    createFolder ? $.__views.__alloyId0.addEventListener("click", createFolder) : __defers["$.__views.__alloyId0!click!createFolder"] = true;
    $.__views.__alloyId1 = Ti.UI.createButton({
        width: 200,
        height: 40,
        borderWidth: 2,
        borderColor: "blue",
        top: 15,
        color: "blue",
        title: "Upload",
        id: "__alloyId1"
    });
    $.__views.backview.add($.__views.__alloyId1);
    upload ? $.__views.__alloyId1.addEventListener("click", upload) : __defers["$.__views.__alloyId1!click!upload"] = true;
    $.__views.__alloyId2 = Ti.UI.createButton({
        width: 200,
        height: 40,
        borderWidth: 2,
        borderColor: "blue",
        top: 15,
        color: "blue",
        title: "Download",
        id: "__alloyId2"
    });
    $.__views.backview.add($.__views.__alloyId2);
    download ? $.__views.__alloyId2.addEventListener("click", download) : __defers["$.__views.__alloyId2!click!download"] = true;
    $.__views.__alloyId3 = Ti.UI.createButton({
        width: 200,
        height: 40,
        borderWidth: 2,
        borderColor: "blue",
        top: 15,
        color: "blue",
        title: "Delete",
        id: "__alloyId3"
    });
    $.__views.backview.add($.__views.__alloyId3);
    deleteFile ? $.__views.__alloyId3.addEventListener("click", deleteFile) : __defers["$.__views.__alloyId3!click!deleteFile"] = true;
    $.__views.__alloyId4 = Ti.UI.createButton({
        width: 200,
        height: 40,
        borderWidth: 2,
        borderColor: "blue",
        top: 15,
        color: "blue",
        title: "File Change Notification",
        id: "__alloyId4"
    });
    $.__views.backview.add($.__views.__alloyId4);
    showFileChangeView ? $.__views.__alloyId4.addEventListener("click", showFileChangeView) : __defers["$.__views.__alloyId4!click!showFileChangeView"] = true;
    $.__views.textareaview = Ti.UI.createView({
        backgroundColor: "White",
        height: "100%",
        width: "100%",
        visible: false,
        layout: "vertical",
        id: "textareaview"
    });
    $.__views.index.add($.__views.textareaview);
    $.__views.textarea = Ti.UI.createTextArea({
        top: 50,
        width: 250,
        height: 100,
        borderWidth: 2,
        borderColor: "blue",
        color: "blue",
        value: "Enter text here and save to test file change notification.",
        font: {
            fontSize: 16
        },
        id: "textarea"
    });
    $.__views.textareaview.add($.__views.textarea);
    $.__views.__alloyId5 = Ti.UI.createButton({
        width: 200,
        height: 40,
        borderWidth: 2,
        borderColor: "blue",
        top: 15,
        color: "blue",
        title: "Save",
        id: "__alloyId5"
    });
    $.__views.textareaview.add($.__views.__alloyId5);
    saveFileData ? $.__views.__alloyId5.addEventListener("click", saveFileData) : __defers["$.__views.__alloyId5!click!saveFileData"] = true;
    $.__views.__alloyId6 = Ti.UI.createButton({
        width: 200,
        height: 40,
        borderWidth: 2,
        borderColor: "blue",
        top: 15,
        color: "blue",
        title: "Cancel",
        id: "__alloyId6"
    });
    $.__views.textareaview.add($.__views.__alloyId6);
    hideFileChangeView ? $.__views.__alloyId6.addEventListener("click", hideFileChangeView) : __defers["$.__views.__alloyId6!click!hideFileChangeView"] = true;
    $.__views.lblNote = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "blue",
        left: 10,
        right: 10,
        top: 30,
        font: {
            fontSize: 14
        },
        textAlign: "center",
        text: "NOTE : You have to install this app in two devices which have same icloud account. When you type something and save than this saves this text in file which is data.txt so once you save the code and iOS trigger iCloud Sync at that time other device will have notification of the file change by other device.You don't need to worry about downloding updated file when you got notification as module will automatically download this for you.",
        id: "lblNote"
    });
    $.__views.textareaview.add($.__views.lblNote);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var iCloudDbSync = require("com.sagar.iclouddbsync");
    Ti.API.info("module is => " + iCloudDbSync);
    iCloudDbSync.initICloudDb({
        id: "iCloud.com.icloudtest.ios",
        rootFolderPath: "Path/To/Data/Root"
    });
    var icloud_connected = iCloudDbSync.isConnectedToiCloud;
    $.lbl_status.text = "iCloud Status : " + (true == icloud_connected ? "Connected" : "Not Connected");
    var filePath = Ti.Filesystem.resourcesDirectory + "titanium_logo.png";
    iCloudDbSync.addEventListener("files_updated", function(e) {
        showFileChangeView();
        alert("Updated files = " + JSON.stringify(e.files));
    });
    $.index.open();
    __defers["$.__views.__alloyId0!click!createFolder"] && $.__views.__alloyId0.addEventListener("click", createFolder);
    __defers["$.__views.__alloyId1!click!upload"] && $.__views.__alloyId1.addEventListener("click", upload);
    __defers["$.__views.__alloyId2!click!download"] && $.__views.__alloyId2.addEventListener("click", download);
    __defers["$.__views.__alloyId3!click!deleteFile"] && $.__views.__alloyId3.addEventListener("click", deleteFile);
    __defers["$.__views.__alloyId4!click!showFileChangeView"] && $.__views.__alloyId4.addEventListener("click", showFileChangeView);
    __defers["$.__views.__alloyId5!click!saveFileData"] && $.__views.__alloyId5.addEventListener("click", saveFileData);
    __defers["$.__views.__alloyId6!click!hideFileChangeView"] && $.__views.__alloyId6.addEventListener("click", hideFileChangeView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;