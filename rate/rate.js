var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");
var template = require("./template.js");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "moodle",
});

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

  if (pathname === "/") {
    var html = template.HTML();
    response.writeHead(200);
    response.end(html);
  } else if (pathname === "/rate") {
    var html = template.HTML();
    var body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      var post = qs.parse(body);
      var leadership = post.leadership;
      var assertiveness = post.assertiveness;
      var teamPlayer = post.teamPlayer;
      var creativeness = post.creativeness;
      var orator = post.orator;

      connection.connect(function (error) {
        if (error) throw error;
        console.log("Connected!");
        var sql = "INSERT INTO mdl_quiz_grades (quiz, grade) VALUES ?";
        var values = [
          ["leadership", leadership],
          ["assertiveness", assertiveness],
          ["teamPlayer", teamPlayer],
          ["creativeness", creativeness],
          ["orator", orator],
        ];
        connection.query(sql, [values], function (error, result) {
          if (error) throw error;
          console.log("Records inserted");
        });
      });
    });
    response.writeHead(200);
    response.end(html);
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});
app.listen(3000);
