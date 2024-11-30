const { validationResult } = require('express-validator');
const School = require('../models/School');

class SchoolController {
  static async addSchool(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, address, latitude, longitude } = req.body;
      const schoolId = await School.create({ name, address, latitude, longitude });

      res.status(201).json({
        message: 'School added successfully',
        schoolId
      });
    } catch (error) {
      console.error('Error adding school:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async listSchools(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { latitude, longitude } = req.query;
      const schools = await School.findAll();

      const schoolsWithDistance = schools.map(school => ({
        ...school,
        distance: School.calculateDistance(
          parseFloat(latitude),
          parseFloat(longitude),
          school.latitude,
          school.longitude
        )
      }));

      schoolsWithDistance.sort((a, b) => a.distance - b.distance);

      res.json(schoolsWithDistance);
    } catch (error) {
      console.error('Error listing schools:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = SchoolController;