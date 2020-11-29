var formidable = require('formidable');
var fs = require('fs');
var express = require('express');
var router = express.Router();

//파일 업로드
router.post('/fileupload/:id', function (req, res) {
    let path = req.params.id;
    let fpath = path.replace(/,/g, '/');
    var form = new formidable.IncomingForm(); //객체 할당
    //field값(필드 매개변수) 받는 부분
    form.parse(req, function (err, fields, files) {

        var filelist = fs.readdirSync(fpath);
        var p=1;
        var splitname = files.filetoupload.name.split(".");
        var sname = splitname[splitname.length - 2];
        var ext = splitname[splitname.length - 1];
        

        for(var i in filelist)
        {
            if(filelist[i]==files.filetoupload.name)
                p++;
            var tempname=sname+'_'+p+'.'+ext;
            if(filelist[i]==tempname)
                p++;
        }
            
        sname=sname+'_'+p+'.'+ext;
                
        var oldpath = files.filetoupload.path;
        var newpath;
        if(p>1)
            newpath = fpath + '/' + sname;
        else
            newpath = fpath + '/' + files.filetoupload.name;

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

//파트 추가
router.post('/addpart/',(req,res) => {
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

//파트 제거 (빈 파트만 가능)
router.post('/deletepart/:id', function (req, res) {
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

//파일 다운로드
router.get('/download/:id', function (req, res) {
    let filename = req.params.id.toString();
    let rfilename = filename.replace(/,/g, '/');
    let filepath = './upload/' + rfilename;
    res.download(filepath);
});

//파일 삭제
router.post('/delete/:id', function (req, res) {
    
    let path = req.params.id;
    let fpath = path.replace(/,/g, '/');


    fs.unlink(fpath, function (err) {
        if (err) throw err;
        res.writeHead(302, { Location: '/' });
        res.end();

    });

});

module.exports = router;