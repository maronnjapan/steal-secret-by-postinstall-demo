
function execHello() {
  console.log("Hello Everyone");
}

module.exports = {
  execHello
};

// ES6モジュールとの互換性のため
module.exports.default = module.exports;