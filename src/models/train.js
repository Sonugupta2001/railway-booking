module.exports = (sequelize, DataTypes) => {
  const Train = sequelize.define(
    'Train',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
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
      totalSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      availableSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: true }
  );

  Train.associate = (models) => {
    Train.hasMany(models.Booking, { foreignKey: 'trainId', onDelete: 'CASCADE' });
  };

  return Train;
};
