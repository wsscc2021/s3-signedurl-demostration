
S3 Pre-signed URL의 동작을 확인하기 위한 데모 어플리케이션

frontend/index.js 파일의 `apiGatewayURL` 변수의 값을 본인이 생성한 API Gateway로 수정합니다.

실습 진행 방법
1. 버킷을 생성합니다.
- CORS 를 활성화합니다.

2. 람다 함수를 생성합니다. (nodejs14.x)
- `bucketName` Environment를 추가합니다. (업로드할 대상 버킷)
- 람다 함수의 역할에 대상 버킷에 대한 PutObject 권한이 있어야합니다.

3. API Gateway를 생성합니다. (REST API)
- POST 메소드를 추가하고, 위에서 생성한 람다 함수를 통합합니다.
- CORS 를 활성화합니다.

4. index.html 파일에 접근하여 동작을 확인합니다.