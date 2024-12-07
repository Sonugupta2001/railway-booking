const { Train, Booking } = require("../../models");
const { Op } = require("sequelize");
const { sequelize } = require("../../models");


const checkAvailability = async (req, res) => {
    try {
        const {source, destination} = req.query;

        if(!source || !destination){
            return res.status(400).json({ error: "Source and destination are required" });
        }


        const trains = await Train.findAll({
            where: {
                source,
                destination,
            },
        });

        if(!trains.length){
            return res.status(404).json({ error: "No trains found between these stations" });
        }

        res.status(200).json({ trains });
    }
    catch(error){
        console.error(error);

        res.status(500).json({ error: "Server error" });
    }
};


const bookSeat = async (req, res) => {
    const transaction = await sequelize.transaction();

    try{
        const { trainId } = req.body;
        const userId = req.user.id;
        const train = await Train.findByPk(trainId, { transaction });

        if(!trainId){
            return res.status(400).json({ error: "Train ID is required" });
        }

        if(!train){
            return res.status(404).json({ error: "Train not found" });
        }

        if(train.availableSeats <= 0){
            return res.status(400).json({ error: "No available seats" });
        }

        const booking = await Booking.create(
            {
                userId,
                trainId,
            },
            { transaction }
        );


        train.availableSeats -= 1;
        await train.save({ transaction });
        await transaction.commit();

        res.status(201).json({ message: "Booking successful", booking });
    }
    catch(error){
        await transaction.rollback();
        console.error(error);

        res.status(500).json({ error: "Server error" });
    }
};



const getBookingDetails = async (req, res) => {
    try{
        const { id } = req.params;
        const userId = req.user.id;


        const booking = await Booking.findOne({
            where: { id, userId },
            include: [
                {
                    model: Train,
                    attributes: ["name", "source", "destination"],
                },
            ],
        });

        if(!booking){
            return res.status(404).json({ error: "Booking not found" });
        }

        res.status(200).json({ booking });
    }
    catch(error){
        console.error(error);

        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { checkAvailability, bookSeat, getBookingDetails };