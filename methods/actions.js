var User = require("../models/user");
var LandMark = require("../models/landmark")
var Review = require("../models/review");
var jwt = require("jwt-simple");
var config = require("../config/dbconfig");
const { check, validationResult } = require("express-validator");


var functions = {
  addNew: function (req, res) {
    if (
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.email || 
      !req.body.pin
    ) {
      res.status(403).json({ success: false, msg: "Enter" });
    } else {
      check("email").custom((value, { req }) => {
        return new Promise((resolve, reject) => {
          User.findOne(
            { email: req.body.email },
            function (err, user) {
              if (err) {
                reject(new Error("Server Error"));
              }
              if (Boolean(user)) {
                reject(new Error("email is already in use"));
              }
              resolve(true);
            }
          );
        });
      });
      var newUser = User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        avatar: "https://cdn.fakercloud.com/avatars/agromov_128.jpg",
        email: req.body.email,
        role: 0,
        pin: req.body.pin,
        fav: [],
      });
      newUser.save(function (err, newUser) {
        if (err) {
          res.json({ success: false, msg: err });
        } else {
          res.json({ success: true, msg: "successfully saved" });
        }
      });
    }
  },
  login: function (req, res) {
    User.findOne(
      {
        phoneNumber: req.body.phoneNumber,
      },
      function (err, user) {
        if (err) throw err;
        if (!user) {
          res
            .status(403)
            .send({
              success: false,
              msg: "Authentication Failed, User not found",
            });
        } else {
          user.comparePassword(req.body.pin, function (err, isMatch) {
            if (isMatch && !err) {
              var token = jwt.encode(user, config.secret);
              res.json({ success: true, token: token });
            } else {
              return res
                .status(403)
                .send({
                  success: false,
                  msg: "Authentication failed, wrong password",
                });
            }
          });
        }
      }
    );
  },
  getinfo: function (req, res) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      var token = req.headers.authorization.split(" ")[1];
      var decodedtoken = jwt.decode(token, config.secret);
      return res.json({
        success: true,
        userId: decodedtoken._id,
        firstName: decodedtoken.firstName,
        lastName: decodedtoken.lastName,
        phoneNumber: decodedtoken.phoneNumber,
        avatar: decodedtoken.avatar,
        role: decodedtoken.role,
      });
    } else {
      return res.status(403).json({ success: false, msg: "No Headers" });
    }
  },
  insertLandMark: function (req, res) {
    if (
      !req.body.fullName ||
      !req.body.photo ||
      !req.body.longtitude ||
      !req.body.laititude ||
      !req.body.description ||
      !req.body.rating ||
      !req.body.rCount ||
      !req.body.location
    ) {
      res.status(403).json({ success: false, msg: "Enter" });
    } else {
      
      var newLandmark = landmark({
        nameame: req.body.fullName,
        photo: req.body.photo,
        longtitude: req.body.longtitude,
        laititude: req.body.laititude,
        description: req.body.description,
        rating: req.body.rating,
        rCount: req.body.rCount,
        location: req.body.location

      });
      newLandmark.save(function (err, newLandmark) {
        if (err) {
          res.json({ success: false, msg: "failed to save" });
        } else {
          res.json({ success: true, msg: "successfully saved" });
        }
      });
    }
  },


 insertReview: function (req, res) {
  if (
    !req.body.userId ||
    !req.body.userName ||
    !req.body.avatar ||
    !req.body.companyId ||
    !req.body.star 
  ) {
    res.status(403).json({ success: false, msg: "Enter" });
  } else {
    var n = Date.now();

    var newReview = Review({
      userId: req.body.userId,
      userName: req.body.userName,
      avatar: req.body.avatar,
      companyId: req.body.companyId,
      content: req.body.content,
      star: req.body.star,
      dateCreated: n
    });
    newReview.save(function (err, newReview) {
      if (err) {
        res.status(403).json({ success: false, msg: err });
      } else {
        res.json({ success: true, msg: "successfully saved" });
      }
    });
  }
},
selectReview: function (req, res) {
  if (
    !req.body.companyId
  ) {
    res.json({ success: false, msg: "Enter" });
  } else {
    Review.find(
      {
        companyId: req.body.companyId
      }
      ,function (err, reviews) {
      if (err) {
        res.json({ success: false, msg: "failed to get Reviews" });
      } else {
        res.json({ success: true, msg: reviews });
      }
    });
  } 
},
insertOrder: function (req, res) {
  if (
    !req.body.userId ||
    !req.body.userName ||
    !req.body.carId ||
    !req.body.phoneNumber ||
    !req.body.companyId ||
    !req.body.companyName ||
    !req.body.companyPhoneNumber ||
    !req.body.companyAddress ||
    !req.body.serviceId ||
    !req.body.serviceName ||
    !req.body.orderDate ||
    !req.body.status
  ) {
    res.json({ success: false, msg: err });
  } else {
    var n = Date.now();

    var newOrder = Order({
      userId: req.body.userId,
      userName: req.body.userName,
      carId: req.body.carId,
      phoneNumber: req.body.phoneNumber,
      companyId: req.body.companyId,
      companyName: req.body.companyName,
      companyPhoneNumber: req.body.companyPhoneNumber,
      companyAddress: req.body.companyAddress,
      serviceId: req.body.serviceId,
      serviceName: req.body.serviceName,
      orderDate: req.body.orderDate,
      status: req.body.status,
      dateCreated: n
    });
    newOrder.save(function (err, newOrder) {
      if (err) {
        res.json({ success: false, msg: err });
      } else {
        res.json({ success: true, msg: "successfully saved" });
      }
    });
  } 
},


};

module.exports = functions;
