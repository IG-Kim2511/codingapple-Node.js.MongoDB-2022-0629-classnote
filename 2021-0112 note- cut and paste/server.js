
/*πserver.js μλ¨ μ½λ */





//c13) EJS
app.set('view engine', 'ejs');

// c22)  β/public μμΉμ μλ ν΄λλ₯Ό μ°κ² λ€βλΌλ λ»
app.use('/public', express.static('public'))

// c23-10) method-override
const methodOverride = require('method-override')
app.use(methodOverride('_method'))



























