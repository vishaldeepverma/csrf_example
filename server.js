const express = require("express");
const bodyParser = require("body-parser");

const csurf = require("csurf");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3000;
const app = express();

const csrfMiddleware = csurf({
  cookie: true
});

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(cookieParser());

app.use(csrfMiddleware);

app.get("/", (req, res) => {
  res.send(`
		<h1>Hello, </h1>
	    <form action="/" method="POST">
	    	<input type="hidden" name="_csrf" value="${req.csrfToken()}" />
	      	<div>
		        <label for="name">Enter Your Name:</label><br/>
		        <input id="name" name="name" type="text" />
	      	</div>
	      	<input type="submit" value="Submit" />
	    </form>
	`);
});

app.post("/", (req, res) => {
  console.log(`Hello, ${req.body.name}`);
  res.send(req.body.name);
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT} 👍`);
});
