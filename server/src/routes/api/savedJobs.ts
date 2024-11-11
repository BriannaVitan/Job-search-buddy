// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// // Initialize Express app
// const app = express();
// const port = 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB connection
// mongoose.connect('mongodb://localhost:27017/jobDB', { useNewUrlParser: true, useUnifiedTopology: true });

// // Job model
// const Job = mongoose.model('Job', new mongoose.Schema({
//   jobTitle: String,
//   companyName: String,
//   companyLogo: String,
//   jobGeo: String,
//   annualSalaryMax: Number,
//   salaryCurrency: String,
//   jobDescription: String,
//   postedDate: { type: Date, default: Date.now },
// }));

// // API route to save a job to the database
// app.post('/api/jobs', async (req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
//   try {
//     const job = new Job(req.body); // Create new Job document from request body
//     await job.save(); // Save to database
//     res.status(201).json(job); // Respond with the saved job
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to save job' });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });