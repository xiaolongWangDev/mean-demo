exports.index = function (req, res) {
  console.log("sending index page");
  res.sendFile(__dirname + '/client/dist/html/index.html');
};
