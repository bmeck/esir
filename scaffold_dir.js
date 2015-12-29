var path = require('path');
var fs = require('fs');
console.log(
	fs.readdirSync(process.argv[2])
	.filter(function (name) {
		if (path.extname(name) !== '.js') {
			return false;
		}
		return true;
	})
	.map(function (file) {
		var str = file.substr(
			0,
			file.length - path.extname(file).length
		);
		var name = JSON.stringify(str);
		var require_arg = JSON.stringify('./'+file);
		return 'exports['+name+']=require('+require_arg+');'
	})
	.join('\n')
)