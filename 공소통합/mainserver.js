var http = require("http");
var fs = require("fs");
var express = require("express");
var app = express();
const bodyParser = require("body-parser");
var session = require("express-session");
var mySqlStore = require("express-mysql-session")(session);
let router = express.Router();

var myRouter = require("./myrouter.js");
var template = require("./template.js");
var template2 = require("./template2.js");
const mysql = require("mysql");
const dbconfig = require("./config/database.js");
const connection = mysql.createConnection(dbconfig);
var options = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "moodle",
};

var sessionStore = new mySqlStore(options);

app.use(
  session({
    secret: "kim",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("port", process.env.PORT || 8888);

app.use(express.static("public"));

app.use("/myrouter", myRouter);

app.get("/", function (req, res) {
  let sql = `select mdl_groups.name,groupid, firstname, lastname
               from mdl_groups_members, mdl_user,mdl_groups
               where mdl_groups_members.userid = mdl_user.id and 
                     mdl_groups_members.groupid=1 and 
                     mdl_groups_members.groupid = mdl_groups.id;
    `;

  const names = [];
  //const lastNames = []
  connection.query(sql, function (err, rows, fields) {
    if (err) console.log("query is not excuted. select fail...\n" + err);
    else {
      rows.forEach((element) => {
        names.push(element.firstname + element.lastname);
      });
      console.log(rows[0].name);

      req.session.isLogined = true;
      req.session.names = names;
      req.session.groupName = rows[0].name;
      req.session.save(function () {
        res.redirect("/home");
      });
    }
  });
});

app.get("/teamPage", function (req, res) {
  res.render("teamPage.ejs", {
    memberName: req.session.names,
    groupName: req.session.groupName,
  });
});

app.get("/home", function (req, res) {
  console.log(req.session.isLogined);
  res.render("home.ejs");
});

app.get("/profilePage", function (req, res) {
  res.render("profilePage.ejs");
});

let comment = "hello";
app.get("/workList", function (req, res) {
  res.render("workList.ejs", {
    memberName: req.session.names,
    groupName: req.session.groupName,
    comment: comment,
  });
});

app.get("/dms", function (req, res) {
  var loginId = req.query.id;

  // var IdRepository=[];
  // console.log(db2);
  // for(var j in db2){
  //     if(db2[j].guid==loginId){
  //         IdRepository.push(db2[j].g_path);
  //     }
  // }

  function getFiles(dir, files_) {
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    files_.push("<ul>");
    for (var i in files) {
      //    if(IdRepository.indexOf(files[i])===-1) continue;
      //    else
      files_.push(
        `<li><h3><a href="/${files[i]}?id=${loginId}">${files[i]}</a></h3></li>`
      );
    }
    files_.push("</ul>");
    files_ = files_.join("");
    return files_;
  }
  var tt = getFiles("./grouprepository", 0);
  var html = template2.HTML(tt);
  res.writeHead(200);
  res.end(html);
});

app.get("/:id", function (req, res) {
  var loginId = req.query.id;
  var group = req.params.id;
  group = "./grouprepository/" + group;
  function getFiles(dir, isPart, files_) {
    files_ = files_ || [];
    var files = fs.readdirSync(dir).map((filename) => {
      return {
        filename: filename,
        mtime: fs.statSync(dir + "/" + filename).mtime,
      };
    });

    if (isPart == 1) files.sort((a, b) => a.mtime - b.mtime);
    var idx = 0;
    for (var i in files) {
      var name = dir + "/" + files[i].filename;
      if (fs.statSync(name).isDirectory()) {
        let uname = name.replace(/\//g, ",");
        files_.push("<ul>");
        files_.push(`<div class="part"> 
                <div class="parttitle">
                <form action="myrouter/deletepart/${uname}?id=${loginId}" method="post">
                <h2 class="titlefont" style=color:black;>
                    <input type="submit" value="x">
                    ${files[i].filename}
                </h2>
                </form>
                </div>
                `);
        files_.push(`
                <div class="partupload">
                <form action="myrouter/fileupload/${uname}?id=${loginId}" method="post"  enctype="multipart/form-data">
                <input type="file" name="filetoupload" style="width:73%;">
                <input type="submit">
                </form>
                </div>
                `);

        getFiles(name, 1, files_);

        files_.push("</div>");
        if (i < files.length - 1) {
          files_.push(`
                    <div class="link">
                    <hr color="gray" size="8" align="center">
                    </div>
                    `);
        }
        files_.push("</ul>");
      } else {
        var spliturl = name.split("/");
        var fname = spliturl[spliturl.length - 1];
        let uname = name.replace(/\//g, ",");

        files_.push(`
                <div class="vertical2">
                </div>`);
        if (idx % 2) {
          files_.push(`
                    <div class="listcontent" style="border:1px solid gray;">
                    `);
        } else {
          files_.push(`
                    <div class="listcontent" style="border:1px solid gray;">
                    `);
        }
        files_.push(`
                <form action="myrouter/delete/${uname}?id=${loginId}" method="post" onsubmit="return confirm('정말 삭제하시겠습니까?');">
                <input type="submit" value="x">
                <a href="myrouter/download/${uname}?id=${loginId}" class=listfont>${fname}</a>
                </form>
                </div>
                `);
      }
      idx++;
    }

    files_ = files_.join("");
    return files_;
  }
  let ugroup = group.replace(/\//g, ",");
  var html = template.HTML(getFiles(group, 0), db2, ugroup + "?id=" + loginId);
  res.writeHead(200);
  res.end(html);
});

var db = [];
var db2 = [];

var server = http.createServer(app).listen(app.get("port"), function () {
  // connection.query(
  //     `SELECT gm.id, gm.groupid, gm.userid, g.group_path, c.fullname
  //     from mdl_groups_members gm
  //     left outer join mdl_groups g on gm.groupid=g.id
  //     left outer join mdl_course c on g.courseid=c.id`, (error, rows) => {
  //         if (error) throw error;
  //         for (var i in rows) {
  //             db2.push(
  //                 {
  //                     'gm' : rows[i].id,
  //                     'gid' : rows[i].groupid,
  //                     'guid' : rows[i].userid,
  //                     'g_path' : rows[i].group_path,
  //                     'c_name' : rows[i].fullname
  //                 }
  //             );
  //         }
  //     }
  // );
});
