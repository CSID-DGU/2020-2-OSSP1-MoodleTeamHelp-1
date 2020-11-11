var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var url = require('url');
var express = require('express');
var app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))

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
                res.send('<script type="text/javascript">alert("파일을 선택해 주세요");</script>');
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
            res.send('<script type="text/javascript">alert("파트가 존재하거나 입력되지 않았습니다");</script>');
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
            res.send('<script type="text/javascript">alert("파일이 있어 파트삭제 불가능");</script>');
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

app.get('/download/:id', function (req, res) {
    let filename = req.params.id.toString();
    let rfilename = filename.replace(/,/g, '/');
    let filepath = './upload/' + rfilename;
    res.download(filepath);
});

app.get('/', function (req, res) {

    function getFiles(dir, files_) {
        files_ = files_ || [];
        var files = fs.readdirSync(dir);
        files_.push('<ul>')
        //var p = 1;
        for (var i in files) {
            var name = dir + '/' + files[i];
            if (fs.statSync(name).isDirectory()) {
                let uname = name.replace(/\//g, ',');
                files_.push(`<div> <h2>${files[i]}</h2>
                <form action="deletepart/${uname}" method="post">
                    <input type="submit" value="part 삭제">
                </form>
                `);
                //p = p + 1;
                getFiles(name, files_);

                files_.push(`
                <div class="origin">
                <h2>${title}</h2>
                <form action="fileupload/${uname}" method="post"  enctype="multipart/form-data">
                <input type="file" name="filetoupload">
                <input type="submit">
                </form>
                </div>
                `)

                files_.push('</div>');
            } else {
                var spliturl = name.split("/");
                var fname = spliturl[spliturl.length - 1];
                let downloadUrl = spliturl.slice(spliturl.indexOf("upload") + 1).join(",");
                let uname = name.replace(/\//g, ',');
                files_.push(`<li><a href="/download/${downloadUrl}">${fname}</a>
                <form action="delete/${uname}" method="post">
                    <input type="submit" value="delete">
                </form>
                </li>`)
            }
        }


        files_.push('</ul>')
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
        .origin{
            clear:both;
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
    </body>
    </html>
    `;
    res.writeHead(200);
    res.end(template);

});

var server = http.createServer(app).listen(app.get('port'), function () { });

