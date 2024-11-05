const express = require('express');
const router = express.Router();
const { addDataToFile } = require('../service/project/addProject');



router.post('/', async (req,res) => {
    try{
    
        let resDto = await addDataToFile(req.body);

        res.json(resDto);
    }catch (err){
        console.error("프로젝트 생성 실패", err);
        res.status(500).json({ message: "프로젝트 생성 실패" });
    }
    
})

router.get('/', async (req,res) => {
    try{

    }catch (err){

    }
})



module.exports = router;
