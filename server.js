


// 🦄🦄 terminal 명령어 정리 👉 html
/* 
 🦄🦄c12 express 라이브러리 설치
        $npm init
        $npm install express

  🦄🦄c14 미리보기
  node server.js

  서버 끄기 : ctrl +c

    🦄🦄c18 nodemon 자동 미리보기
  $npm install -g nodemon (yarn add global nodemon)

  $nodemon server.js 

    🦄🦄c body-parser 라이브러리 설치
  $npm install body-parser 혹은 yarn add body-parser

  
    🦄🦄c npm install mongodb 라이브러리 설치        
    npm install mongodb

    🦄🦄c EJS 
    npm install ejs

    🦄🦄c method-override
    npm install method-override
          
  */

//🦄🦄 express홈페이지 사용법 참고 https://www.npmjs.com/package/express

// 🦄🦄c16 npm에러해결, package.json, npm init, npm install express(Node.js, Express라이브러리 설치)
console.log('🦄🦄🦄🦄c5')

/* 
2)
npm
package.json

4) 터미널 명령어
$npm init
$npm install express
*/


// 🦄🦄c18 express로 서버오픈공식, node server.js, get(주소, (req,res)={} ), send('글자')

/* (express) 서버오픈 기본공식 

2) 👆 server.js 상단에 코드 추가, express 라이브러리 첨부와 사용 

4) app.listen()은 원하는 포트에 서버를 오픈하는 문법이라고 보시면 됩니다. 

listen() 함수 안엔 두개의 파라미터가 필요합니다. 

listen(서버를 오픈할 포트번호, function(){서버 오픈시 실행할 코드})


app.listen(8080, function() {   
    console.log('listening on 8080')
})

(👉 c28 mongoDB코드로 옮김)

*/

/* 
6) node server.js / localhost:8080

터미널에서 node server.js를 입력하면 서버가 뜹니다.

브라우저에서 localhost:8080  접속하면 확인가능합니다. 

8) 서버 끄기 
terminal에서 ctrl + c
 */

/* 10) get(주소, ()={} ), send('글자')

-2) 누군가가 localhost:8080/pet으로 방문하면,
-3) 안내문 띄우기

-4) get안의 파라미터 eng이름 : (request, response) (req,res) 주로 사용함

브라우저 켜서 localhost:8080/pet  접속하면 펫용품 사라는 안내문이 뜨죠? */


// 12) 사용자가 / 경로로 접속시 (/ 하나만 있으면 홈페이지입니다)

// app.get('/', function (req, res) {
//   res.send('Hello World')
// })


const express = require('express')
const app = express()


app.get('/pet', function(req요청, res응답) {        //-2)  -4)
    res응답.send('펫용품 사시오')           //-3)
  })
  
app.listen(3000,function () {
    console.log('hello  3000')
})


// 🦄🦄c20 서버에서 index.html파일전송하기, Nodemon으로 자동화, 설치오류해결 powershell관리자모드
console.log('🦄🦄🦄🦄c20')


/* 
1) nodemon 설치

1-2)
npm install -g nodemon
yarn add global nodemon 

1-4) nodemon server.js
이제 서버를 실행할 때 nodemon server.js 라고 입력해주시면 되겠습니다.
파일 저장할 때 마다 이제 지가 알아서 서버를 새로 시작해줍니다.
(하지만 브라우저에서 새로고침은 하셔야합니다.)

1-5)에러난때 powershell관리자모드 실행 👉 set-executionpolicy unrestricted
*/

/* 
2) 사용자가 / 경로로 접속시 (/ 하나만 있으면 홈페이지입니다)

4) server.js랑 같은 경로에 있는 /index.html 이라는 파일을 보내줍니다. 

4-2) sendFile() 함수를 쓰면 파일을 보낼 수 있습니다

4-4) __dirname은 현재 파일의 경로를 뜻합니다. */

app.get('/', function(req요청, res응답) {               //2)
    res응답.sendFile(__dirname + '/index.html')       //4)
})   

// 6) style.css가져오기 (구글검색)

app.get('/style.css', function(req, res) {
    res.sendFile(__dirname + "/" + "style.css");
  });




// 🦄🦄c28 MongoDB 셋팅하기 (무료 호스팅도 받아보자)