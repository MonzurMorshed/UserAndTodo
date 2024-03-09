const jwt = require("jsonwebtoken");
const TodoListModel = require("../models/TodoListModel");

exports.CreateTodo = (req,res) => {
    let reqBody = req.body;

    let UserName = req.headers['username'];
    let TodoSubject = reqBody['TodoSubject'];
    let TodoDescription = reqBody['TodoDescription'];
    let TodoStatus = 'New';
    let TodoCreateDate = Date.now();
    let TodoUpdateDate = Date.now();

    let PostBody = {
        UserName: UserName,
        TodoSubject: TodoSubject,
        TodoDescription: TodoDescription,
        TodoStatus: TodoStatus,
        TodoCreateDate: TodoCreateDate,
        TodoUpdateDate: TodoUpdateDate
    };

    TodoListModel.create(PostBody).then(
        () => { 
            return res.status(200).json({status:'success',data:reqBody});
        },
        (err) => { 
            return res.status(400).json({status:'fail',data:err});
        }
    );
}

exports.SelectTodo = (req,res) => {

    let UserName = req.headers['username'];
    TodoListModel.find({
        UserName:UserName
    }).then(
        (data) => { 
            return res.status(200).json({status:'success',data:data});  
        },
        (err) => { 
            return res.status(400).json({status:'fail',data:err});
        }
    );
}

exports.UpdateTodo = (req,res) => {

    let reqBody = req.body;

    let _id = reqBody['_id'];
    let TodoSubject = reqBody['TodoSubject'];
    let TodoDescription = reqBody['TodoDescription'];
    let TodoUpdateDate = Date.now();

    let PostBody = {
        TodoSubject: TodoSubject,
        TodoDescription: TodoDescription,
        TodoUpdateDate: TodoUpdateDate
    };

    TodoListModel.updateOne({_id:_id},{$set:PostBody},{upsert: true}).then(
        (data) => { 
            return res.status(200).json({status:'success',data:data});  
        },
        (err) => { 
            return res.status(400).json({status:'fail',data:err});
        }
    );
}

exports.UpdateStatusTodo = (req,res) => {

    let reqBody = req.body;

    let _id = reqBody['_id'];
    let TodoStatus = reqBody['TodoStatus'];
    let TodoUpdateDate = Date.now();

    let PostBody = {
        TodoStatus: TodoStatus,
        TodoUpdateDate: TodoUpdateDate
    };

    TodoListModel.updateOne({_id:_id},{$set:PostBody},{upsert: true}).then(
        (data) => { 
            return res.status(200).json({status:'success',data:data});  
        },
        (err) => { 
            return res.status(400).json({status:'fail',data:err});
        }
    );
}

exports.RemoveTodo = (req,res) => {

    let _id = req.body['_id'];

    TodoListModel.deleteOne({_id:_id}).then(
        (data) => { 
            return res.status(200).json({status:'success',data:data});  
        },
        (err) => { 
            return res.status(400).json({status:'fail',data:err});
        }
    );
}