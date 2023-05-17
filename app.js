const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.get("/index.html", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {
    var lhstr1 = parseFloat(req.body.LHSMSD1) + parseFloat(req.body.LHSVSD1) * 0.002;
    var lhstr2 = parseFloat(req.body.LHSMSD2) + parseFloat(req.body.LHSVSD2) * 0.002;
    var lhstr3 = parseFloat(req.body.LHSMSD3) + parseFloat(req.body.LHSVSD3) * 0.002;
    var lhstr4 = parseFloat(req.body.LHSMSD4) + parseFloat(req.body.LHSVSD4) * 0.002;
    var lhstr5 = parseFloat(req.body.LHSMSD5) + parseFloat(req.body.LHSVSD5) * 0.002;
    var lhstr6 = parseFloat(req.body.LHSMSD6) + parseFloat(req.body.LHSVSD6) * 0.002;
    var rhstr1 = parseFloat(req.body.RHSMSD1) + parseFloat(req.body.RHSVSD1) * 0.002;
    var rhstr2 = parseFloat(req.body.RHSMSD2) + parseFloat(req.body.RHSVSD2) * 0.002;
    var rhstr3 = parseFloat(req.body.RHSMSD3) + parseFloat(req.body.RHSVSD3) * 0.002;
    var rhstr4 = parseFloat(req.body.RHSMSD4) + parseFloat(req.body.RHSVSD4) * 0.002;
    var rhstr5 = parseFloat(req.body.RHSMSD5) + parseFloat(req.body.RHSVSD5) * 0.002;
    var rhstr6 = parseFloat(req.body.RHSMSD6) + parseFloat(req.body.RHSVSD6) * 0.002;
    var d1 = lhstr1 + rhstr1;
    var d2 = lhstr2 + rhstr2;
    var d3 = lhstr3 + rhstr3;
    var d4 = lhstr4 + rhstr4;
    var d5 = lhstr5 + rhstr5;
    var d6 = lhstr6 + rhstr6;
    var r1 = (d1 * d1 - d2 * d2) / (4 * 2 * 0.00005893);
    var r2 = (d3 * d3 - d4 * d4) / (4 * 2 * 0.00005893);
    var r3 = (d5 * d5 - d6 * d6) / (4 * 2 * 0.00005893);
    var radius = (r1 + r2 + r3) / 3;
    res.write("<div style='display:flex; justify-content:center'><img style='height:100px;width:100px' src='images/rings.gif' alt='Newtons rings'></div>");
    res.write("<h1 style='text-align:center; color:#0b226c'> The radius of curvature is " + Math.fround(radius) + "</h1>");
    res.send();
});

app.listen(3000, function () {
    console.log("Server started at port 3000");
});
