const express = require('express');
const router = express.Router();
const { addDataToFile } = require('../service/project/addProject');



router.post('/', async (req,res) => {
    try{
        let jsonData = {
            title : req.body.title,
            description: req.body.description
        };
    
        let resDto = await addDataToFile(jsonData);

        res.json(resDto);
    }catch (err){
        console.error("프로젝트 생성 실패", err);
        res.status(500).json({ message: "프로젝트 생성 실패" });
    }
    
})



module.exports = router;
