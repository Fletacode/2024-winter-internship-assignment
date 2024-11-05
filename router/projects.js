const express = require('express');
const router = express.Router();
const { addDataToFile } = require('../service/project/addProject');
const { getAllProjects } = require('../service/project/getAllProject');


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
        const allProjects = await getAllProjects();
        res.json(allProjects.projects);
    }catch (err){
        console.error("모든 프로젝트 조회 실패", err);
        res.status(500).json({ message: "모든 프로젝트 조회 실패" });
    }
})



module.exports = router;
