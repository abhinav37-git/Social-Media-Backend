const sequelize = require('../config/db');

(async () => {
  try {
    await sequelize.sync({ force: true }); // Use 'force: true' only in development to reset the database
    console.log('Database synced');
    process.exit();
  } catch (error) {
    console.error('Error syncisng database:', error);
    process.exit(1);
  }
})();
