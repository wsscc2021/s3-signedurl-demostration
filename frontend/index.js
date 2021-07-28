let uploadFileBlobData
let uploadFileName
let uploadFileType
let uploadFileSize

document.getElementById('uploadFile').addEventListener('change', readFileAsData);
function readFileAsData(event) {
    var files = this.files;
    if (files.length === 0) {
        console.log('No file is selected');
        return;
    }
    var reader = new FileReader();
    reader.onload = function(event) {
        if (uploadFileSize <= 0) {
            return;
        }
        uploadFileName = files[0].name;
        uploadFileType = files[0].type;
        var uploadFileBase64 = event.target.result.split(',')[1]
        var uploadFileBinary = atob(uploadFileBase64);
        let uploadFileBinaryUnicode = [];
        for (var i = 0; i < uploadFileBinary.length; i++) {
            uploadFileBinaryUnicode.push(uploadFileBinary.charCodeAt(i));
        }
        uploadFileBlobData = new Blob([new Uint8Array(uploadFileBinaryUnicode)], {type: uploadFileType});
    };
    reader.readAsDataURL(files[0]);
}

const upload_func = async () => {
    if (uploadFileSize <= 0) {
        alert("최소 0KB 이상의 파일만 업로드할 수 있습니다.");
    } else {
        let signedURL = await getSignedURL();
        uploadToS3(signedURL);
    }
}

const getSignedURL = () => {
    let apiGatewayURL = "https://wwuz8911u1.execute-api.us-east-1.amazonaws.com/demo"
    return fetch(apiGatewayURL, {
        method: "POST",
        body: JSON.stringify({
            fileName: uploadFileName,
            fileType: uploadFileType
        })
    }).then(response => response.json())
    .then(data => {
        return JSON.parse(data['body']).signedURL;
    }).catch(error => {
        console.log(error);
        alert("Pre-Signing 실패!");
        return false
    });
}

const uploadToS3 = (signedURL) => {
    fetch(signedURL, {
        method: "PUT",
        body: uploadFileBlobData
    }).then(response => {
        const statusCode = response.status
        if (statusCode >= 200 && statusCode < 400) {
            alert("업로드가 완료되었습니다.");
        } else if (statusCode >= 400 && statusCode < 600) {
            throw response;
        }
    }).catch(error => {
        console.log(error);
        alert("업로드 실패!");
    });
}