module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    'Booking',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
      },
      trainId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Trains', key: 'id' },
      },
      seatNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      source: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bookingTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      status: {
        type: DataTypes.ENUM('confirmed', 'cancelled'),
        defaultValue: 'confirmed',
        allowNull: false,
      },
      fare: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    { timestamps: true }
  );

  Booking.associate = (models) => {
    Booking.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Booking.belongsTo(models.Train, { foreignKey: 'trainId', onDelete: 'CASCADE' });
  };

  return Booking;
};