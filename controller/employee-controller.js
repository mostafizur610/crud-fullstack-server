
const {ObjectId} = require('mongodb');
const client = require('../config/db');
const EmployeeController = {};

EmployeeController.get= async (req, res, next) => {
    try {
        await client.connect();
        const data = await client.db("crud").collection('employee').find().toArray();
        client.close();
        res.status(200).send({
            message: 'success',
            data: data
        });
    } catch(error) {
        next(error);
    }
}


EmployeeController.details= async (req, res, next) => {
    try {
        const {id} = req.params;
        if(!id) throw new Error('Id not provided');

        await client.connect();
        const data = await client.db("crud").collection('employee').findOne({_id: ObjectId(id)});
        client.close();
        res.status(200).send({
            message: 'success',
            data: data
        });
    } catch(error) {
        next(error);
    }
}

EmployeeController.create= async (req, res, next) => {
    try {
        const {firstName, lastName, email, phoneNumber} = req.body;
        if (!firstName) throw new Error('FirstName required');
        if (!email) throw new Error('Email required');
        if (!phoneNumber) throw new Error('PhoneNumber required');

        await client.connect();
        const data = await client.db("crud").collection('employee').insertOne({
            firstName, lastName, email, phoneNumber, isBlock: false 
        });
        client.close();
        res.status(201).send({
            message: 'created'
        });
    } catch(error) {
        next(error);
    }
}

EmployeeController.update= async (req, res, next) => {
    try {
        const {id, firstName, lastName, phoneNumber} = req.body;
        if (!id) throw new Error('Id required');
        if (!firstName) throw new Error('FirstName required');
        if (!phoneNumber) throw new Error('PhoneNumber required');

        await client.connect();
        const data = await client.db("crud").collection('employee').updateOne({_id: ObjectId(id)},{
            $set: {firstName, lastName, phoneNumber}
        });

        client.close();
        if (data.modifiedCount === 0) throw new Error('Data not updated')
        res.status(201).send({
            message: 'updated'
        });
    } catch(error) {
        next(error);
    }
}

EmployeeController.block= async (req, res, next) => {
    try {
        const {id} = req.body;
        if (!id) throw new Error('Id required');

        await client.connect();
        const data = await client.db("crud").collection('employee').findOne({_id: ObjectId(id)});
        if(!data) throw new Error('Data not updated');
        const updateData = await client.db("crud").collection('employee').updateOne({_id: ObjectId(id)},{
            $set: {isBlock: !data.isBlock}
        });

        client.close();
        if (updateData.modifiedCount === 0) throw new Error('Data not updated')
        res.status(201).send({
            message: 'updated'
        });
    } catch(error) {
        next(error);
    }
}

EmployeeController.delete= async (req, res, next) => {
    try {
        const {id} = req.params;
        if(!id) throw new Error('Id not provided');

        await client.connect();
        const data = await client.db("crud").collection('employee').deleteOne({
            _id: ObjectId(id)
        });

        if (data.deletedCount === 0) throw new Error('Data not deleted');
        client.close();
        res.status(200).send({
            message: 'deleted'
        });
    } catch(error) {
        next(error);
    }
}

module.exports = EmployeeController;