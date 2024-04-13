const Service = require('../models/service-model');

const service = async(req, res) => {
    try {
        const response = await Service.find();
        if(!response){
            res.status(404).json({msg : "No service exist"});
            return ;
        }
        res.status(200).json({response});
    } catch (error) {
        console.log("Service controller error");
    }
}

module.exports = service;