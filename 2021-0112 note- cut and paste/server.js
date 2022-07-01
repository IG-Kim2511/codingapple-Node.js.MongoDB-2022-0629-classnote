
/*🍀server.js 상단 코드 */





//c13) EJS
app.set('view engine', 'ejs');

// c22)  “/public 위치에 있는 폴더를 쓰겠다”라는 뜻
app.use('/public', express.static('public'))

// c23-10) method-override
const methodOverride = require('method-override')
app.use(methodOverride('_method'))






















// 🦄🦄c10 REST API 
console.log('🦄🦄🦄🦄c10')
//👻필기노트


// 🦄🦄c11 MongoDB 셋팅하기 (무료 호스팅도 받아보자)




//🦄🦄c13 HTML에 DB데이터 넣는 법 1, EJS 파일 만들기 
console.log('🦄🦄🦄🦄c13')
// 👉views/list.ejs

/*2) 숙제해설 :
-2) 누군가 /add 경로로 POST 요청을 하면, 폼에 입력된 자료를 2개가 서버로 도착합니다.

-4) 이 때 자료 2개를 post라는 이름의 collection에 저장해보도록 합시다.

{ 제목 : ‘어쩌구’, 날짜 : ‘어쩌구’ } 이런 Object 자료형으로 저장하시면 되겠습니다.

참고 : c9 .. post  */

app.post('/add', function(요청, 응답){    //2-2)
  응답.send('전송완료13');
  console.log(요청.body.title);
  console.log(요청.body.data);
  
  //2-4)
   db.collection('collection-file1').insertOne( { 제목 : 요청.body.title, 날짜 : 요청.body.data } , function(){    
    console.log('저장완료13-2');
  });
});

/* 4) list로 get요청...접속하면
실제 DB에 저장된 데이터 적용된html보여줌 

-2) http://localhost:8080/list 주소창 접속*/




app.get('/list',function(요청,응답){      //13-4)

  db.collection('collection-file1').find().toArray(function(에러, 결과){   //14-2)

    console.log(결과)

    응답.render('list.ejs', { posts : 결과 })     //13-4)  14-4)
  })
});

// ejs문법 👉views/list.ejs

//🦄🦄c14 HTML에 DB데이터 넣는 법 2 (DB데이터 읽기), .find(.).toArray(에러,결과)=>{}), { posts : 결과 }
// 👉list.ejs
console.log('🦄🦄🦄🦄c14')

/* 2)

.find().toArray() 라고 적으시면 collection(‘post’)에 있는 모든 데이터를 Array 자료형으로 가져옵니다. 

4)
list.ejs 파일을 렌더링함과 동시에 {posts: 결과} 라는 데이터를 함께 보내줄 수 있습니다. 

(정확히 말하면 결과라는 데이터를 posts 라는 이름으로 ejs 파일에 보내주세요~ 입니다)
*/




// 🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄
//🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄
// 여기서부터는 그냥 녹화하면서 대충 , 선생님이  정리한 내용 복붙함

/*
🦄🦄 선생님 16 게시물마다 번호를 달아 저장해야합니다. findOne(.),insertOne(.)
🦄🦄 선생님 17 게시물마다 번호 달기2, updateOne(.), inc 연산자
 */
console.log('🦄🦄🦄🦄c16')


app.post('/add', function (요청, 응답) {
  
  db.collection('counter').findOne({name : '게시물갯수'}, function(에러, 결과){       // c16

    var 총게시물갯수 = 결과.totalPost             // c16

    db.collection('post').insertOne({ _id : 총게시물갯수 + 1, 제목 : 요청.body.title, 날짜 : 요청.body.date }, function (에러, 결과) {      // c16

      db.collection('counter').updateOne({name:'게시물갯수'},{ $inc: {totalPost:1} },function(에러, 결과){    // c17 updateOne(.), inc 연산자

        if(에러){return console.log(에러)}
        응답.send('전송완료');
      })
    })
  })
})

/* 
🦄🦄 선생님 18 AJAX로 DELETE 요청하기 1, $.ajax(.), app.delete('delete',(.)={})
👉list.ejs

🦄🦄 선생님 19 AJAX로 DELETE 요청하기2, deleteOne(.), parseInt(.), data-id, .dataset.id 
👉list.ejs

🦄🦄 선생님 20 AJAX로 DELETE 요청하기3, jQuery기능 .send .status .sendFile .render .json(~)
👉list.ejs

2) jQuery기능

app.get('/~~', function(요청, 응답){
  응답.send('<p>some html</p>')
  응답.status(404).send('Sorry, we cannot find that!')
  응답.sendFile('/uploads/logo.png')
  응답.render('list.ejs', { ejs에 보낼 데이터 })
  응답.json(제이슨데이터)
});

 */

app.delete('/delete', function(요청, 응답){   //18)

  요청.body._id = parseInt(요청.body._id)   // 19) parseInt()


  // DB에서 글 삭제해주쇼
  db.collection('post').deleteOne(요청.body, function(에러, 결과){    // 19) deleteOne()
    console.log('삭제완료')
  })

  응답.send('삭제완료')
});

//🦄🦄 선생님 21 상세페이지를 만들어보자 (URL parameter) .get('/detail/:id작명', .findOne(~), .params.id작명, .parseInt(~)
console.log('🦄🦄🦄🦄c21')
// 👉detail.ejs

/* Q) http://localhost:8080/detail/3 ,  /detail/4....등으로 접속하면 

-> 서버에서 데이터 보냄 

-> 그에 맞는 데이터 적용된 게시물 보여주기

2) 하드코딩
app.get('/detail/3', function(요청, 응답){
  응답.render('detail.ejs', {3번게시물데이터} )
});

app.get('/detail/4', function(요청, 응답){
  응답.render('detail.ejs', {4번게시물데이터} )
}); */

/* 4) 소프트코딩 
콜론 (:) 기호를 붙여주면 누군가 /detail/ 뒤에 아무 문자열이나 입력하면~ 이라는 소리입니다.
땡땡 기호 뒤엔 여러분이 자유롭게 작명

6)
{ _id : URL에입력한id값 }

8)요청.params.id
코드에 사용자가 URL에 입력한 :id값을 그대로 넣어주기

10) { _id : parseInt(요청.params.id) }
parseInt()
요청.params.id를 출력해보면 ‘2’ 이런 식으로 문자자료형으로 출력됩니다.
이걸 숫자로 변환하기 위해 parseInt를 쓴 것입니다.
*/

app.get('/detail/:id작명', function(요청, 응답){       // 2) 4)
  db.collection('post').findOne( { _id : parseInt(요청.params.id) }, function(에러, 결과){   //6) 8) 10)
    응답.render('detail.ejs', {data : 결과} )     //2) 
  })
});

// 🦄🦄 선생님 22 css폴더-server.js에 지정하기, nav.html공유하기- include ejs문법
// 👉nav.html
// 👉list.ejs
// 👉.ejs

console.log('🦄🦄🦄🦄c22')

/* 
4) 👆css폴더-server.js에 지정하기

6) <nav>태그 UI가 필요한 파일에 가서 이런 문법을 사용합니다
<%- include('nav.html') %>
*/

// 🦄🦄 선생님 23 글 수정 기능1, PUT요청하기, method="PUT", method-override
// 👉 edit.ejs
console.log('🦄🦄🦄🦄c23')

/* 
4) .get('/edit/:id',~~)

6) DB에 있던 (URL에 적힌 :id)번 게시물의 제목과 날짜를 꺼내오려면 어떤 코드를 작성해야할까여?

findOne함수
요청.params.id

8)이제 어떤 사람이 /edit/4로 접속하면 {_id : 4}인 게시물을 찾고, 그 결과를 edit.ejs에 보내주게됩니다.

*/

app.get('/edit/:id', function(요청, 응답){      //4)

  db.collection('post').findOne({ _id : parseInt(요청.params.id) }, function(에러, 결과){   //6)

    응답.render('edit.ejs', { post : 결과 })      //8)

  })
  
});

/* 10)  html form 태그에 PUT요청을 사용하기

1. 터미널에 npm install method-override 를 입력해서 설치하시면 됩니다.
2. 👆 설치를 완료하기 위해 server.js 상단에 다음 코드를 추가합니다. 
3. 이제 form 태그에 PUT요청을 사용할 수 있습니다. 
👉edit.ejs
*/


// 🦄 선생님 24 글 수정 기능 2 : DB 데이터를 수정해보자
console.log('🦄🦄🦄🦄c24')

/*2) 👉edit.ejs
 4)updateOne
 6)<form>태그에 몰래 안보이는 <input>을 추가해보도록 합시다. 

 “사용자가 /edit으로 PUT요청을 하면”

“post라는 콜렉션에 있는 {_id : 요청.body.id } 데이터를 찾아서 { 제목 : 요청.body.title , 날짜 : 요청.body.date } 로 바꿔주세요”

8) parseInt()를 추가

10) 응답.redirect()를 추가해줍니다.
왜냐면 응답을 안해주면 브라우저가 멈출 수 있으니까요.
*/

app.put('/edit', function(요청, 결과){

  // 4) 6) 8)
  db.collection('post').updateOne( {_id : parseInt(요청.body.id) }, {$set : { 제목 : 요청.body.title , 날짜 : 요청.body.date }},  
  
  function(){
    console.log('수정완료')
    응답.redirect('/list')    //10)
  });
});


// 🦄🦄 선생님 25 세션, JWT, OAuth 등 회원인증 방법 이해하기
console.log('🦄🦄🦄🦄c25')

// 🦄🦄 선생님 26 (회원인증기능 1) 로그인 페이지 만들기 & 아이디 비번 검사
console.log('🦄🦄🦄🦄c26')

// 🦄🦄 선생님 27 (회원인증기능 2) 아이디 비번을 DB와 비교하고 세션 만들어주기
console.log('🦄🦄🦄🦄c27')

// 🦄🦄 선생님 28 (회원인증기능 3) 로그인 유저만 접속할 수 있는 페이지 만들기
console.log('🦄🦄🦄🦄c28')

// 🦄🦄 선생님 29 .env 파일에서 가변적인 변수 데이터들 환경변수(environment variable) 관리하기
console.log('🦄🦄🦄🦄c29')