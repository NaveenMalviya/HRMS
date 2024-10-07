const skillController = require("../controller/skillController");
const express = require("express");
const router = express.Router();
 
router.route('/createskill').post(skillController.createSkill);
router.route('/list').get(skillController.getSkills);
router.route('/update').put(skillController.updateSkill);
router.route('/getskillbyid').get(skillController.getSkillById);
router.route('/delete').delete(skillController.deleteSkill);
router.route('/multidelete').delete(skillController.multiDelete);
router.route('/search').get(skillController.searchSkill);


  
module.exports = router;