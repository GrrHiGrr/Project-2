const router = require('express').Router();
const seeder = require("../seeds/seed.js")

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.get("/seeder", async (req,res)=> {
    if(req.query.secret === process.env.SESSION_SECRET){
        await seeder();
        res.json("SUCCESSFULLY SEEDED DB!")
    }
})

module.exports = router;