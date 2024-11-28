const mongoose = require('mongoose');

const connectionDB = async () => {
	try {
	 	mongoose.set('strictQuery', false);
		const conn = await mongoose.connect(process.env.MONGODB_URI);
		console.log(`Database Connected: ${conn.connection.host}`);
	} catch (err) {
		console.error(err);
	}
}

module.exports = connectionDB;