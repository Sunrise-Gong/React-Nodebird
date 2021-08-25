const AWS = require('aws-sdk');
const sharp = require('sharp');
const convert = require('heic-convert');

const s3 = new AWS.S3();

exports.handler = async (event, context, callback) => { // callback은 passport 의 done 과 비슷합니다.

    const Bucket = event.Records[0].s3.bucket.name;
    const Key = decodeURIComponent(event.Records[0].s3.object.key);
    const filename = Key.split('/')[Key.split('/').length - 1];
    const ext = Key.split('.')[Key.split('.').length - 1].toLowerCase();
    const requiredFormat = ext === 'jpg' ? 'jpeg' : ext;

    console.log('버킷', Bucket, '키', Key, '파일명', filename, '확장자', requiredFormat);

    try {
        const s3Object = await s3.getObject({ Bucket, Key }).promise();

        console.log('원본 이미지 용량', s3Object.Body.length);

        const s3ObjectConvert = ext === 'heic' ?
            await convert({ buffer: s3Object, format: 'JPEG', quality: 1 }) : await s3Object;

        const resizedImage = await sharp(s3ObjectConvert.Body)
            .resize(400, 400, { fit: 'inside' }) // 사이즈 변경
            .toFormat(requiredFormat) // 확장자 지정
            .toBuffer();

        await s3.putObject({
            Bucket,
            Key: `thumb/${filename}`,
            Body: resizedImage // 리사이즈 된 이미지 데이터
        }).promise();

        console.log('리사이즈된 이미지', resizedImage.length);

        return callback(null, `thumb/${filename}`);

    } catch (error) {
        console.error(error);
        return callback(error);
    }
}

/*
exports.handler
함수명은 다른 것으로 해도 무방. 이 함수명을 기억해야함

Bucket(버킷명)
ex) nodebird-copy-s3

Key(파일경로 추출)
ex) original/65436_abc.png
decodeURIComponent : 파일명이 한글일 경우 깨지는 것 방지하기 위해

filename(파일명 추출)
ex) original/65436_abc.png -> 65436_abc.png

ext(확장자명 추출)
ex) original/65436_abc.png -> png ,
toLowerCase : 대문자로 들어가는 것 방지하기 위해

requiredFormat(최종 확장자명)
sharp 사용시 확장자 jpg 는 jpeg 로 변경해햐 해서.

s3Object
정책 편집에서 Action 배열에 기입한 getObject 메소드를 사용함
s3Object.Body 에 이미지가 바이너리(0 과 1 로 이루어진 데이터)로 저장되어 있음

resizedImage
sharp 라이브러리를 이용해 이미지 리사이징

s3.putObject
정책 편집에서 Action 배열에 기입한 putObject 메소드를 사용함
Key: `thumb/${filename}` -> 버킷에 thumb 폴더에 리사이징한 이미지를 저장한다는 의미 같다.
*/
