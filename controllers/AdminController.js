const adminController = {};
var express = require('express');
var app = express();
var mongoose = require('mongoose');
const Admin_auth = require('../models/AuthModel');
const RolesModel = require('../models/RoleModel');
const UserRolesModel = require('../models/UserRolesModel');
var bcrypt = require('bcrypt');

//Default page
adminController.index =function function_name(req, res) {
    Admin_auth.findOne().exec(function (err, result) {
        console.log(result);
        if(result==null){
            res.render('index', { count: 0 });
        }else{
            res.render('index', { count: 1 });
        }
    })
}

//Add Roles
adminController.add_roles = function (req, res, cb) {

    var arr =['Admin','Account','Manager','User'];
    arr.forEach(element => { 
        var role_data = {
            _id: new mongoose.Types.ObjectId(),
            name: element,
            desc: "This is "+element
        };
        const Role = new RolesModel(role_data);
        Role.save((err) => {
            if (err) {
                // console.log(err);
                // res.json("Something Went Wrong!");
            } else {
                // res.json(1);
            }
        })
    })
    res.json("Successfull add Admin,Account,Manager,User role");
}


//Add Admin User
adminController.add_user = function(req, res, cb) {
    var today = new Date();
    var user_role = req.body.user_role;
    if (user_role == 0) {
        user_role = 'Admin';
    } else {
        user_role = req.body.user_role;
    }
    role_user(user_role, function(err, argument) {
        if (err) {
            res.json("Something Went Wrong!");
        } else {
            var password = req.body.userpassword;
            cryptPassword(password, function(err, passwordh) {
                var user_data = {
                    _id: new mongoose.Types.ObjectId(),
                    username: req.body.username,
                    password: passwordh,
                    role: argument
                };
                const User = new Admin_auth(user_data);
                User.save((err) => {
                    if (err) {
                        res.json({
                            status: false
                        });
                    } else {
                        res.json({
                            status: true
                        });
                    }
                })
            })
        }
    })
}

//Find user roles by Role id

role_user = function (rolename,cb) {
     RolesModel.findOne({name:rolename}).exec(function (err, result) {
        return err == null ? cb(null, result._id) :cb(err);

     });
}



cryptPassword = function (password, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        if (err)
            return callback(err);
        bcrypt.hash(password, salt, function (err, hash) {
            return callback(err, hash);
        });
    });
};

comparePassword = function (plainPass, hashword, callback) {
    bcrypt.compare(plainPass, hashword, function (err, isPasswordMatch) {
        return err == null ?
            callback(null, isPasswordMatch) :
            callback(err);
    });
};


module.exports = adminController;