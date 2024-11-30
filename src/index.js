const express = require('express');
const cors = require('cors');
const schoolRoutes = require('./routes/schoolRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', schoolRoutes);

// Basic error handling


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});