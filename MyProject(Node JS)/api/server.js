const express = require('express'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
	  fs = require('file-system'),
	  dataFile = 'tasks.json',
  	dataUser = 'users.json',
      app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('common'));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.get('/api/test', (req, res) => {
	res.send(getTasksFromDB());
});

app.post('/api/game', (req, res) => {
	const data = getUsersFromDB(),
		user = req.body;

	data.push(user);
	setTasksToDB(data);

	res.send(user);
});

app.get('/api/game', (req, res) => {
	res.send(getUsersFromDB());
});


function getTasksFromDB() {
    return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
}
function getUsersFromDB() {
	return JSON.parse(fs.readFileSync(dataUser, 'utf8'));
}




function setTasksToDB(data) {
	fs.writeFileSync(dataUser, JSON.stringify(data));
}

app.listen(3000, () => console.log('Server has been started...'));