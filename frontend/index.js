function upload_func() {
    let uploadFile = $('#uploadFile').get()[0].files[0];
    let signedURL = get_signed_url(uploadFile.name)
}

function get_signed_url(fileName) {
    $.ajax({
        type : "GET",
        url  : "https://waw9vt6yi0.execute-api.us-east-1.amazonaws.com/demo",
        data : {fileName : fileName},
        success : function(res){
            // 응답코드 > 0000
            return res;
        },
        error : function(XMLHttpRequest, status, error){ // 비동기 통신이 실패할경우 error 콜백으로 들어옵니다.
            alert("실패!")
        }
    });
}

// function s3_upload(signedURL, uploadFile) {
//     $.ajax({
//         type : "PUT",
//         url  : signedURL,
//         success : function(res){
//             // 응답코드 > 0000
//             return res;
//         },
//         error : function(XMLHttpRequest, status, error){ // 비동기 통신이 실패할경우 error 콜백으로 들어옵니다.
//             return error;
//         }
//     });
// }
