function uuid() {
  var output = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
  for (var i = 1; i <= 20; i++) {
    output = output + characters[Math.floor(Math.random() * characters.length)];
  }
  return output;
}

export default uuid;
