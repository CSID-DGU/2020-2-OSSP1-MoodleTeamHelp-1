//const jsdom = require('mocha-jsdom');
//global.document = jsdom({url:"http://localhost"});
const mariadb = require('mysql');
const pool = mariadb.createPool({ 
    host: 'localhost', 
    user: 'root',
    password: '',
    database:'moodle',
    connectionLimit: 1 
});


pool.getConnection((err, conn) => {
  if (err) throw err;

    console.log("connected ! connection id is " + conn.threadId);
    var temp2;
    let sql = "SELECT name FROM mdl_groups"
    
    let temp = conn.query(sql,(err, result, fields)=>{
        if(err) throw err;
        const group = result[0]['name']
        //document.querySelector("#middle-right-1").innerHTML = "<label>"+group+"</label>"
        console.log(group)
    });
	
	 
    
    conn.end(); //release to pool
});