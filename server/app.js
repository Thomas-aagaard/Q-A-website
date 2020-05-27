/**** External libraries ****/
const express = require('express'); // The express.js library for implementing the API
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');  // We need the mongoose library
const path = require('path');

/**** Configuration ****/
//const appName = "api"; // Change the name of your server app!
const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(bodyParser.json()); // Parse JSON from the request body
app.use(morgan('combined')); // Log all requests to the console
app.use(express.static('../client/build')); // Needed for serving production build of React




/**** Database ****/
const questionDB = require('./question_db')(mongoose);



/**** Routes ****/
app.get('/api/questions', async (req, res) => {
  const ques = await questionDB.getData();
  await res.json(ques);
  console.log(ques);  /// Tried to see if I could find why I dont get the data
});

app.get('/api/questions/:id', async (req, res) => {
  let id = req.params.id;
  const ques = await questionDB.getQuestion(id);
   await res.json(ques);
   console.log(ques);
});

app.post('/api/questions', async (req, res) => {
  let question = {
    question : req.body.question,
    answers : [{text:'', votes:0}] // answers array
  };
  const newQuestion = await questionDB.CreateQuestion(question);
  await res.json(newQuestion);
});



app.post('/api/questions/:id/answers', async (req, res) => {
  const id = req.params.id;
  const answers = {text:req.body.answers, votes:0};

  const updatedQuestion = await questionDB.addAnswer(id, answers);
  await res.json(updatedQuestion);
});

app.put('/api/questions/:id/answers/:aid', async (req,res) => {
    const id = req.params.id;
    const aid = req.params.aid;
    const updatedQuestion = await questionDB.addVote(id, aid);
    await res.json(updatedQuestion);
});

// PostAnswer
/*app.post('/api/questions/:id/answer', (req, res) => {
  const id = parseInt(req.params.id);
  const text = req.body.text;
  const question = data.find(q => q.id === id);hhh
  question.answer.push(text);  // added text
  console.log(question);
  res.json({msg: "Answer added", question: question});
});
*/


// "Redirect" all get requests (except for the routes specified above) to React's entry point (index.html) to be handled by Reach router
// It's important to specify this route as the very last one to prevent overriding all of the other routes
app.get('*', (req, res) =>
    res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
);


/**** Start ****/
const url = process.env.MONGO_URL || 'mongodb://localhost/question_db';
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(async () => {

      await questionDB.bootstrap(); // Fill in test data if mongoose database is empty.
      await app.listen(port); // Start the API
      console.log(`Question API running on port ${port}!`);

    })
    .catch(error => console.error(error));

/**** Start! ****/
//app.listen(port, () => console.log(`${appName} API running on port ${port}!`));

