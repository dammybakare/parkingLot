const express = require('express');
const app = express();
const path = require('path');
// const DB = require('./db');
const browserify = require('browserify');
const port = 3000;
const server = require('http').createServer(app);
// DB.initDb();
app.use(express.static(path.join(__dirname, 'resources')));
app.get('/',(req,res) => {
	try{
		res.sendFile(path.join(__dirname,'page','index.html'));
	}catch(e){
		console.log(e);
	}
});
app.get('/script.js',(req,res) => {
	try{
		res.setHeader('Content-Type', 'application/javascript');
		browserify()
		  .add(path.join(__dirname, 'files','main.js'))
		  .bundle()
		  .pipe(res)
	}catch(e){
		console.log(e);
	}
});
// app.post('/save',(req) => {
// 	try{
// 		const data = req.query.data;
// 		const id = req.query.id;
// 		console.log('save ', id, ' ', data)
// 		if(id && data)DB.save({id, data});
// 	}catch(e){
// 		console.log(e);
// 	}
// });
// app.get('/fetch',(req,res) => {
// 	try{
// 	 	const id = req.query.id;
// 		console.log(id);
// 		return new Promise(function(resolve, reject){
// 	    const callback = function (err, data){
// 	      if(!err && data && data.length && data.length > 0 && data[0].data)
// 	        resolve(data[0]);
// 	      else reject(err);
// 	    }
// 			DB.search(id, callback);
// 	  }).then(function(value){
// 			console.log('load ', id, ' ', value)
// 			res.setHeader('Content-Type', 'application/json');
// 	    res.send(JSON.stringify(value));
// 		});
//
// 	}catch(e){
// 		console.log(e);
// 	}
// });
server.listen(port, function(){
	console.log(`Server listening on port ${port}...done`);
});
