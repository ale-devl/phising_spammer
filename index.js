const querystring = require('querystring');
const request = require('request');

beginLoop();

function beginLoop() {
    prepareAndSendRequest();
    setTimeout(beginLoop, getRandomInt(1, 500));
}

function prepareAndSendRequest() {
    let oForm = {
        login: getRandomString(),
        password: getRandomString(),
        doAuth: '1'
    };

    let oFormData = querystring.stringify(oForm);

    let iContentLength = oFormData.length;

    sendRequest(oFormData, iContentLength);
}

function sendRequest(formData, contentLength) {
    console.log("Sending request...");
    console.log(formData);
    request({
        headers: {
            ':authority': 'doppler-drop.com',
            ':method': 'POST',
            ':path': '/auth.php',
            ':scheme': 'https',
            'accept': '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-US,en;q=0.9,de-DE;q=0.8,de;q=0.7',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'cookie': '__cfduid=df576b4929a29f434259226d98fdc11a71536357303; p8uJud5GfdRb7y2=WyJChzaXJvZ2EiLCIkMmEkMDckUFo1RXVrY01QT0NhOEk0RUc2OVokLlpRTEdqQ2V2NXpISGViZWNHNFo0bXhDTDcuUVRTREsiXQ%3D%3D; 203ced976d6f1ed9561fec1096a77f34=gTpUnA45ec; 23a8e08fd3bc05461a6f86523cf324eb=d9ad9f6c1b503493c99160db87422bd1; 2dxvogojlcccaa4=ek(.i%3Fg9saxvnym%23jzcw; timezoneOffset=7200,0',
            'origin': 'https://doppler-drop.com',
            'referer': 'https://doppler-drop.com/openid/login?openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.mode=checkid_setup&openid.return_to=https%3A%2F%2F%27+document.location.origin+%27%2F%3Flogin&openid.realm=https%3A%2F%2F%27+document.location.origin+%27&openid.ns.sreg=http%3A%2F%2Fopenid.net%2Fextensions%2Fsreg%2F1.1&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
            'x-requested-with': 'XMLHttpRequest',
            'Content-Length': contentLength
        },
        uri: 'https://doppler-drop.com/auth.php',
        body: formData,
        method: 'POST'
    }, function (err, res, body) {
        //it works!
        console.log("Success!");
    });
}

function getRandomString() {
    var text = "";
    var length = getRandomInt(4, 12);
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
}