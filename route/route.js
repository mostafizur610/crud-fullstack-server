const router = require('express').Router();
const EmployeeController = require('../controller/employee-controller');

router.get('/', EmployeeController.get);
router.get('/details/:id', EmployeeController.details);
router.post('/create', EmployeeController.create);
router.put('/update', EmployeeController.update);
router.put('/block', EmployeeController.block);
router.delete('/delete/:id', EmployeeController.delete);

module.exports = router;