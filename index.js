var express    = require('express');
var bodyParser = require('body-parser');
var app = express();
var axios = require('axios');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function userAndRegistry(cardId, graduateRut, firstName, lastName, email, phoneNumber, degreeType, degreeStatus, major, minor, startYear, gradYear, gpa, cardIdUni) {
    try {
        console.log("creando usuario")
      const result = await axios.post('http://localhost:8000/api/createuserandregistry', {
          cardid : cardId,
          graduaterut: graduateRut,
          firstname: firstName,
          lastname: lastName,
          email: email,
          phonenumber: phoneNumber,
          degreetype: degreeType,
          degreestatus: degreeStatus,
          major: major,
          minor: minor,
          startyear: startYear,
          gradyear: gradYear,
          gpa: gpa,
          cardiduni: cardIdUni
      });
      console.log("creando2");
      console.log(`result: ${result.data}`);
      return result.data;
    } catch(error) {
        console.log(`errorrrr: ${error}`);
        throw error
      
    }
  }

async function getTest() {
  try {
    const test = await axios.get('http://104.154.205.142/test');
    let data = test.data;
    return data;
  } catch(error) {
    res.send(error);
  }
}

async function firstTest() {
    try {
        console.log("Hola")
    var universityRut = "164879992";
    var cardId = "98772";
    var shortName = "dsada";
    var fullName = "dsadasada";
    var email = "ddasa@dsdada.com";
    const test = await axios.post('http://104.154.205.142/api/registerUniversity', {
        universityrut : universityRut,
        cardid : cardId,
        shortname: shortName,
        fullname: fullName,
        email : email
    })
    console.log(`???: ${test}`);
    return test.data
    
    } catch(error) {
        console.log(`error2: ${error}`);
        throw error
    }
    
}

app.get('/', function (req, res) {
    getTest()
    .then(response => {
      let ress = response;
      res.send(ress)
    })
});

app.get('/firsttest', function (req, res) {
    firstTest()
    .then(response => {
        res.send(response);
    })
    .catch(error => {
        console.log(`errorrr: ${error}`);
        res.send(error)
    })
});

app.post('/createuserandregistry', function (req, res) {
  var graduateRut = req.body.graduaterut;
  var degreeType = req.body.degreetype;
  var degreeStatus = req.body.degreestatus;
  var major = req.body.major;
  var minor = req.body.minor;
  var startYear = req.body.startyear;
  var gradYear = req.body.gradyear;
  var gpa = req.body.gpa;
  var cardId = req.body.cardid;
  var firstName = req.body.firstname;
  var lastName = req.body.lastname;
  var email = req.body.email;
  var phoneNumber = req.body.phonenumber;
  var cardIdUni = req.body.cardiduni;
    userAndRegistry(cardId, graduateRut, firstName, lastName, email, phoneNumber, degreeType, degreeStatus, major, minor, startYear, gradYear, gpa, cardIdUni)
    .then(response => {
        console.log(response)
        res.send(response);
    })
    .catch(error => {
        console.log(`errorrr: ${error}`);
        res.send(error)
    })
})

//declare port
var port = process.env.PORT || 3000;
if (process.env.VCAP_APPLICATION) {
  port = process.env.PORT;
}

//run app on port
app.listen(port, function() {
  console.log('app running on port: %d', port);
});