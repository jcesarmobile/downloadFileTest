/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        downloadFile('http://www.rd.com/wp-content/uploads/sites/2/2016/04/01-cat-wants-to-tell-you-laptop.jpg','-media-3405-company.jpg',function(file){document.getElementById("downloaded").src = file;});
    }
};

function downloadFile (url, fileName, callback) {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
                             fs.root.getFile(fileName, {
                                             create: true,
                                             exclusive: false
                                             }, function (fileEntry) {
                                             var fileURL = fileEntry.toURL()
                                             var fileTransfer = new FileTransfer();
                                             fileTransfer.download(
                                                                   url,
                                                                   fileURL,
                                                                   function (entry) {
                                                                   var file = entry.toURL() // <--- HERE
                                                                   callback(file);
                                                                   },
                                                                   function (error) {
                                                                   alert('error ' + error.code + '(' + fileName + ')');

                                                                   }
                                                                   );
                                             }, function (error) {
                                             alert(2);
                                             });
                             }, function() {
                             alert(3);
                             })
}

app.initialize();
