var log4js = require('log4js');

var config = {
	"appenders": [{
		"category": "access",
		"type": "dateFile",
		"filename": "./logs/access.log",
		"pattern": "-yyyy-MM-dd",
		"backups": 3
	},
	{
		"category": "system",
		"type": "dateFile",
		"filename": "./logs/system.log",
		"pattern": "-yyyy-MM-dd",
		"backups": 3
	},
	{
		"category": "error",
		"type": "dateFile",
		"filename": "./logs/error.log",
		"pattern": "-yyyy-MM-dd",
		"backups": 3
	},
	{
		"type": "console"
	}],
	"levels": {
		"access": "ALL",
		"system": "ALL",
		"error": "ALL"
	}
};
log4js.configure(config);


module.exports = {
	access: log4js.getLogger('access'),
	error: log4js.getLogger('error'),
	system: log4js.getLogger('system'),
	express: log4js.connectLogger(log4js.getLogger('access'), {level: log4js.levels.INFO})
}
