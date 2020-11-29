var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var url = require('url');
var express = require('express');
var app = express();
var qs = require('querystring');
var j = 0;
const bodyParser = require('body-parser')
const mysql      = require('mysql');
const dbconfig   = require('./config/database.js');
const { resourceLimits } = require('worker_threads');
const connection = mysql.createConnection(dbconfig);

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('upload'));
app.set('port', process.env.PORT || 8888);

app.use(express.static('public'));


app.post('/fileupload/:id', function (req, res) {
    let path = req.params.id;
    let fpath = path.replace(/,/g, '/');
    var form = new formidable.IncomingForm(); //객체 할당
    //field값(필드 매개변수) 받는 부분
    form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path;
        var newpath = fpath + '/' + files.filetoupload.name;
        fs.rename(oldpath, newpath, function (err) {
            if (err){
                res.send(`<script type="text/javascript">
                alert("파일을 선택해 주세요");
                history.back();
                </script>`);
                res.end();
            }
            else{
                res.writeHead(302, { Location: '/' });
                res.end();
            }
            
        });
    });
})

app.post('/addpart/',(req,res) => {
    var part=req.body.part;
    let addpart='./upload/'+part;
    fs.mkdir(addpart,err=>{
        if(err && err.cod != 'EEXIST'){
            res.send(`<script type="text/javascript">
            alert("파트가 존재하거나 입력되지 않았습니다");
            history.back();
            </script>`);
            res.end();
        }
        else{
            res.writeHead(302, { Location: '/' });
            res.end();
        }
        
    })
    
});

app.post('/deletepart/:id', function (req, res) {
    let path = req.params.id;
    let fpath = path.replace(/,/g, '/');

    fs.rmdir(fpath,err=>{
        if(err && err.cod != 'EEXIST') {
            res.send(`<script type="text/javascript">
            alert("파일이 있어 파트삭제 불가능");
            history.back();
            </script>`);
            res.end();
        }
        else{
            res.writeHead(302, { Location: '/' });
            res.end();
        }
       
    })
});

app.post('/delete/:id', function (req, res) {
    let path = req.params.id;
    let fpath = path.replace(/,/g, '/');

    fs.unlink(fpath, function (err) {
        if (err) throw err;
        console.log('file deleted');
        res.writeHead(302, { Location: '/' });
        res.end();

    });

});

app.get('/edit/:id', function (req, res) {
    var text = req.query.content;
    let path = req.params.id;
    let fpath = path.replace(/,/g, '/');
    var splitname = fpath.split(".");
    var sname = splitname[splitname.length - 2];
    var ext = "." + splitname[splitname.length - 1];
    let ffpath = fpath.replace(ext ,'_content.txt');
    console.log(ffpath)
    fs.writeFile(ffpath, text, (err) =>{
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        console.log('comment uploaded');
    });
});
function get_txt_route(ffpath){
    var rdata;
    fs.readFile(ffpath,'utf8',function(err,data){
        rdata=data;
   });
   return rdata;
}
app.get('/download/:id', function (req, res) {
    let filename = req.params.id.toString();
    let rfilename = filename.replace(/,/g, '/');
    let filepath = './upload/' + rfilename;
    res.download(filepath);
});

app.get('/', function (req, res) {
    //res.send(db);

    function getFiles(dir, files_) {
        files_ = files_ || [];
        var files = fs.readdirSync(dir);
        
        //var p = 1;
        for (var i in files) {
            var name = dir + '/' + files[i];
            var forbid = "_content";
            if(name.indexOf(forbid)!=-1){
                continue;
            }
            j = j+i;
            if (fs.statSync(name).isDirectory()) {
                let uname = name.replace(/\//g, ',');
                files_.push('<ul>')
                files_.push(`<div style="border:3px solid gray; width:19%;"> 
                <form action="deletepart/${uname}" method="post">
                <h2 class="titlefont">
                    <input type="submit" value="x">
                    ${files[i]}
                </h2>
                </form>
                `);
                files_.push(`
                <div class="origin" style="border:3px solid gray">
                <form action="fileupload/${uname}" method="post"  enctype="multipart/form-data">
                <input type="file" name="filetoupload" style="width:73%;">
                <input type="submit">
                </form>
                </div>
                `)
                getFiles(name, files_);

               
                files_.push('</div>');
                files_.push(`
                <div class="link">
                <hr color="gray" size="8" align="center">
                </div>
                `)
                  files_.push('</ul>')
            } else {
                var spliturl = name.split("/");
                var fname = spliturl[spliturl.length - 1];
                let downloadUrl = spliturl.slice(spliturl.indexOf("upload") + 1).join(",");
                let uname = name.replace(/\//g, ',');
                var path = uname;
                var fpath = path.replace(/,/g, '/');
                var splitname = fpath.split(".");
                var ext = "." + splitname[splitname.length - 1];
                var ffpath = fpath.replace(ext ,'_content.txt');
                var finalpath = ffpath.replace('./upload','');
                files_.push(`
                <div class="vertical">
                <p></p>
                </div>
                <div class="origin" style="border:3px solid gray; width:100%;">
                <form action="delete/${uname}" method="post">
                    <input type="submit" value="x" >
                    <a href="/download/${downloadUrl}" class=listfont>${fname}</a>
                </form>

                <form class = "detail" action="edit/${uname}">
                    <input type = "button" class = "detailBT" value = "detail" id = "dis${j}">
                    <textarea name = "content" rows="5" id = 'comment_area${j}' style="display:none" ></textarea>
                    <input type="submit" value="Edit" id = 'comment_edit${j}' style="display:none" >
                </form>
                </div>
                <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
                <script type="text/javascript">
                    $(document).on("click","#dis${j}", function(){
                        if($("#comment_area${j}").css('display') == 'none'){
                            $("#comment_area${j}").show();
                            $("#comment_edit${j}").show();
                            $("#comment_area${j}").load("${finalpath}",function(txt, status,xhr){
                                if (status == "success") {
                                    alert("로딩 성공");
                                    alert(status);
                                } else if (status == "error") {
                                    alert("로딩 실패");
                                    alert("Error: " + xhr.status + ": " + xhr.statusText);
                                }
                            });
                            }else{
                                $("#comment_area${j}").hide();
                                $("#comment_edit${j}").hide();
                            }
                    });

                 </script>
                `)

            }
        }
        files_ = files_.join('');
        return files_;
    }

    var title = 'Welcome';
    var template = `
    <!doctype html> 
    <head>
    
    <meta charset="UTF-8">
    <title></title>
    <style>
        div{float:left;}
        .link{
            float:left;
            position: relative;
            bottom:-15px;
            width:3%;
        }
        .titlefont{
            font-size:90%;
        }
        .listfont{
            font-size:70%;
        }
        .check{
            left: 1px;
        }
        .origin{
            clear:both;
        }
        .right{
            float:right;
        }
        .vertical{
           background-color:gray; 
           width: 6%;
           position: relative;
           left: 47%;
        }
        .horizontal{
            float:left;c
            background-color:black;
            widht:100%;
            height:100%;
        }
    </style>
    </head>
    <body>
    ${getFiles('./upload')}
    <div class=origin>
        <form action="addpart/" method="post">
        <input type="text" name="part">
        <input type="submit" value="파트추가">
        </form>
    </div>
    
    <div class=origin>
        ${db}
    </div>
    </body>
    </html>
    `;
    res.writeHead(200);
    res.end(template);

});

var db=[];


var server = http.createServer(app).listen(app.get('port'), function () {
    connection.query('SELECT firstname from mdl_user', (error, rows) => {
        if (error) throw error;
        for (var i in rows){
            //db.push(rows[i].firstname);
        }
      });
 });
 