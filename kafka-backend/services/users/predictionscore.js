const User = require('../../models/UserModel');
const Prediction = require('../../models/PredictionModel');

const handle_request = async (msg, callback) => {
    console.log("inside predict service");
    const res = {};
    console.log("--------check service-----",msg)
    User.findById(msg.userId)
        .exec((err,user)=>{
            if(user){
                // console.log("inside user");
                Prediction.find({$and:[{Country:msg.country},{ Date: msg.date}]})
                    .exec((err,predict)=>{
                        //console.log(predict)
                        if(predict && predict.length > 0){
                            console.log("inside predict",predict[0].Pscore);
                            const score=predict[0].Pscore;
                            if(score<=-0.001){
                                res.data={
                                    message:"Safe"
                                }
                                res.status = 200;
                                callback(null, res);
                            }
                            else if(score>-0.001 && score<0.001){
                                res.data={
                                    message:"Moderate"
                                }
                                res.status = 200;
                                callback(null, res);
                            }
                            else{
                                res.data={
                                    message:"Unsafe"
                                }
                                res.status = 200;
                                callback(null, res);
                            }
                        }
                        else {
                            console.log(err);
                            res.status = 201;
                            res.data = {
                                message:"No Data",
                                response:err
                            };
                            callback(null, res);
                          }

                    })
            }
            else{
                console.log(err);
                res.status = 201;
                res.data = {
                    message:"",
                    response:err
                };
                callback(null, res);
            }
        })
};

exports.handle_request = handle_request;
