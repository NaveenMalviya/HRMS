const express = require('express');
const router = express.Router();
const candidateController = require('../controller/candidateController');

// Route to create a new candidate
router.post('/createCandidate', candidateController.createCandidate);

// Route to get all candidates
router.get('/list', candidateController.getCandidates);

// Route to get a candidate by ID
router.get('/getcandidatebyid', candidateController.getCandidateById);

// Route to update candidate details
router.put('/updateCandidate', candidateController.updateCandidate);

// Route to delete a candidate
router.delete('/deleteCandidate', candidateController.deleteCandidate);

router.delete('/multi-delete',candidateController.multidelete);

router.get('/search',candidateController.search);



// router.route('/search').get(candidateController.searchCandidate);


module.exports = router;