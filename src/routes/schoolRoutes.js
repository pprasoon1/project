const express = require('express');
const SchoolController = require('../controllers/schoolController');
const { addSchoolValidator, listSchoolsValidator } = require('../validators/schoolValidator');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('School Management API');
})
router.post('/addSchool', addSchoolValidator, SchoolController.addSchool);
router.get('/listAllSchools', SchoolController.listSchools);
router.get('/listSchools', listSchoolsValidator, SchoolController.listSchools);

module.exports = router;