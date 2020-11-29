var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
const bodyParser = require('body-parser')

var myRouter = require('./myrouter.js');
var template = require('./template.js');

const mysql      = require('mysql');
const dbconfig   = require('./config/database.js');
const connection = mysql.createConnection(dbconfig);

app.use(bodyParser.urlencoded({extended:false}))

app.set('port', process.env.PORT || 8888);

app.use(express.static('public'));

app.use('/myrouter',myRouter);

app.get('/', function (req, res) {
    
    function getFiles(dir, isPart, files_) {
        files_ = files_ || [];
        var files = fs.readdirSync(dir).map(filename=>{
            return{
                filename: filename,
                mtime: fs.statSync(dir+'/'+filename).mtime
            }
        })

        if(isPart==1)
            files.sort((a,b)=>a.mtime-b.mtime);
        var idx=0;
        for (var i in files) {

            var name = dir + '/' + files[i].filename;
            if (fs.statSync(name).isDirectory()) {
                let uname = name.replace(/\//g, ',');
                files_.push('<ul>')
                files_.push(`<div class="part"> 
                <div class="parttitle">
                <form action="myrouter/deletepart/${uname}" method="post">
                <h2 class="titlefont" style=color:blue;>
                    <input type="submit" value="x">
                    ${files[i].filename}
                </h2>
                </form>
                </div>
                `);
                files_.push(`
                <div class="partupload">
                <form action="myrouter/fileupload/${uname}" method="post"  enctype="multipart/form-data">
                <input type="file" name="filetoupload" style="width:73%;">
                <input type="submit">
                </form>
                </div>
                `)
                
                getFiles(name, 1, files_);

               
                files_.push('</div>');
                files_.push(`
                <div class="link">
                <hr color="orange" size="8" align="center">
                </div>
                `)
                files_.push('</ul>')

            } else {
                var spliturl = name.split("/");
                var fname = spliturl[spliturl.length - 1];
                let downloadUrl = spliturl.slice(spliturl.indexOf("upload") + 1).join(",");
                let uname = name.replace(/\//g, ',');
               
                files_.push(`
                <div class="vertical2">
                </div>`);
                if (idx%2){
                    files_.push(`
                    <div class="origin" style="border:1px solid orange; width:100%;">
                    `);
                }else{
                    files_.push(`
                    <div class="origin" style="border:1px solid blue; width:100%;">
                    `);
                }
                    
                files_.push(`
                <form action="myrouter/delete/${uname}" method="post" onsubmit="return confirm('정말 삭제하시겠습니까?');">
                <input type="submit" value="x">
                <a href="myrouter/download/${downloadUrl}" class=listfont>${fname}</a>
                </form>
                </div>
                `)
            }
            idx++;
        }
        
   
        files_ = files_.join('');
        return files_;
    }

    var html = template.HTML(getFiles('./upload',0),db);
    res.writeHead(200);
    res.end(html);

});

var db=[];

var server = http.createServer(app).listen(app.get('port'), function () {
    connection.query('SELECT firstname from mdl_user', (error, rows) => {
        if (error) throw error;
        for (var i in rows){
            db.push(rows[i].firstname);
        }
      });
 });


