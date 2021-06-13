require('./config/mongoose');


var connection = require('./kafka/connection');

//Importing topics
const {LOGINHANDLER,SIGNUPHANDLER}=require('./kafka/topics');
const {PASSPORTHANDLER}=require('./kafka/topics');

const {USERUPDATEIMAGEHANDLER}=require('./kafka/topics');
const {GROUPUPDATEIMAGEHANDLER}=require('./kafka/topics');

const {GETPROFILEHANDLER}=require('./kafka/topics');
const {UPDATEPROFILEHANDLER}=require('./kafka/topics');

const {PREDICTIONSCORE}=require('./kafka/topics');
const {PREDICTIONSCOREDATE}=require('./kafka/topics');
const {PREDICTIONACTIVEDATE}=require('./kafka/topics');

//import services
var loginHandler = require('./services/account/loginHandler');
var signUpHandler = require('./services/account/signUpHandler');

var passportHandler= require('./services/passport');

var userUpdateImageHandler= require('./services/images/userUpdateImageHandler');
var groupUpdateImageHandler= require('./services/images/groupUpdateImageHandler');

var getProfileHandler= require('./services/users/getProfileHandler');
var updateProfileHandler= require('./services/users/updateProfileHandler');

var predictionscore= require('./services/users/predictionscore');
var predictionscoredate= require('./services/users/predictionscoredate');
var predictionactivedate= require('./services/users/predictionactivedate');

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function (message) {
      console.log("message received for " + topic_name + " ", fname);
      console.log(JSON.stringify(message.value));
      var data = JSON.parse(message.value);

      fname.handle_request(data.data, function (err, res) {
          console.log("after handle" , res);
          var payloads = [
              {
                  topic: data.replyTo,
                  messages: JSON.stringify({
                      correlationId: data.correlationId,
                      data: res,
                  }),
                  partition: 0,
              },
          ];
          producer.send(payloads, function (err, data) {
              console.log(data);
          });
          return;
      });
  });
}

handleTopicRequest(LOGINHANDLER, loginHandler);
handleTopicRequest(SIGNUPHANDLER, signUpHandler);

handleTopicRequest(PASSPORTHANDLER, passportHandler);

handleTopicRequest(USERUPDATEIMAGEHANDLER, userUpdateImageHandler);
handleTopicRequest(GROUPUPDATEIMAGEHANDLER, groupUpdateImageHandler);

handleTopicRequest(GETPROFILEHANDLER, getProfileHandler);
handleTopicRequest(UPDATEPROFILEHANDLER, updateProfileHandler);

handleTopicRequest(PREDICTIONSCORE, predictionscore);
handleTopicRequest(PREDICTIONSCOREDATE, predictionscoredate);
handleTopicRequest(PREDICTIONACTIVEDATE, predictionactivedate);

