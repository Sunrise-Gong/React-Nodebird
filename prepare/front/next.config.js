const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
    compress: true,
    webpack(config, { webpack }) {
        const prod = process.env.NODE_ENV === 'production';
        
        return {
            ...config,
            mode: prod ? 'production' : 'development',
            devtool: prod ? 'hidden-source-map' : 'eval',
            plugins: [
                ...config.plugins,
                new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
            ],
        };
    },
});

/*
const CompressPlugin = require('compression-webpack-plugin');

module.exports = {
    webpack(config, { webpack }) {
        const prod = process.env.NODE_ENV === 'production';

        const plugins = [...config.plugins];

        if (prod) { plugins.push(new CompressPlugin()); }

        return {
            ...config,
            mode: prod ? 'production' : 'development',
            devtool: prod ? 'hidden-source-map' : 'eval',
            plugins,
        };
    },
};

hidden-source-map 안하면 배포환경에서 소스코드 노출됩니다.

...config 이런식으로 불변성을 지키고 있는데
리듀서 뿐만 아니라 여기에도 immer 를 사용할 수 있습니다.

const CompressPlugin = require('compression-webpack-plugin');
html, css, js 파일들을 gzip으로 압축해서 용량을 줄이는 역할을 해줍니다.
compress : true 설정으로 대채할 수 있는듯

next.config.js 에서 웹팩 뿐만 아니라, next에 대한 설정도 변경 할 수 있습니다.

build 실행시 환경변수 설정하기
process.env.ANALYZE === 'true'
process.env.NODE_ENV === 'production'
build 를 실행할 때 환경변수를 위처럼 설정하기 위해서
dotenv 를 이용할 수도 있지만 package.json에서

"build": "ANALYZER=true NODE_ENV=production next build"
이런식으로 build 실행시 환경변수를 설정할 수 도 있습니다.

그런데 이게 window 에서는 안되서 cross-env를 사용해야 합니다

npm i cross-env 설치 후
( crossenv 라고 오타를 내서 설치한 사람들의 .dotenv 파일이 털린 유명한 사건이 있음 오타를 조심.. )

"build": "cross-env ANALYZER=true NODE_ENV=production next build"
로 바꿔주면 됩니다.

*/