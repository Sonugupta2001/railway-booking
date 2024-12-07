const { Train } = require("../../models");

const addTrain = async (req, res) => {
    try{
        const {name, source, destination, totalSeats} = req.body;

        if(!name || !source || !destination || !totalSeats){
            return res.status(400).json({ error: "All fields are required" });
        }


        const newTrain = await Train.create({ name, source, destination, totalSeats, availableSeats: totalSeats });
        res.status(201).json({ message: "Train added successfully", train: newTrain });
    }
    catch(error){
        console.error(error);

        res.status(500).json({ error: "Server error" });
    }
};


const updateTrainSeats = async (req, res) => {
    try{
        const {id} = req.params;
        const {totalSeats} = req.body;

        if(!totalSeats){
            return res.status(400).json({ error: "Total seats are required" });
        }

        const train = await Train.findByPk(id);
        if(!train){
            return res.status(404).json({ error: "Train not found" });
        }

        train.totalSeats = totalSeats;
        train.availableSeats = Math.min(train.availableSeats, totalSeats);
        await train.save();

        res.status(200).json({ message: "Train updated successfully", train });
    }
    catch(error){
        console.error(error);

        res.status(500).json({ error: "Server error" });
    }
};


const getAllTrains = async (req, res) => {
    try{
        const trains = await Train.findAll();
        res.status(200).json({ trains });
    }
    catch(error){
        console.error(error);

        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { addTrain, updateTrainSeats, getAllTrains };