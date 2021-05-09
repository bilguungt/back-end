const express = require('express')
const actions = require('../methods/actions')
const router = express.Router()

router.get('/',(req, res) => {
    res.send('Server amjilltai aslaa')
})

router.get('/dashboard',(req, res) => {
    res.send('Dashboard')
})

//@desc Add new user
//@route POST /adduser

router.post('/adduser', actions.addNew)

router.post('/login', actions.login)

router.get('/getinfo', actions.getinfo)

router.post('/insertLandMark', actions.insertLandMark)

router.post('/insertreview', actions.insertReview)
router.post('/selectreview', actions.selectReview)


// router.post('/selectcompanybyid', actions.selectCompanyById)
// router.post('/updatecompany', actions.updateCompany)

// router.post('/insertservice', actions.insertService)
// router.post('/updateservice', actions.updateService)
// router.post('/deleteservice', actions.deleteService)
// router.post('/selectservice', actions.selectService)


// router.post('/insertorder', actions.insertOrder)
// router.post('/updateorder', actions.updateOrder)
// router.post('/deleteorder', actions.deleteOrder)
// router.post('/selectorderbyuser', actions.selectOrderByUser)
// router.post('/selectorderbycompany', actions.selectOrderByCompany)
module.exports = router