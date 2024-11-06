const express = require('express');
const router = express.Router();
const { addDataToFile } = require('../service/project/addProject');
const { getAllProjects } = require('../service/project/getAllProject');
const { getByIdProject } = require('../service/project/getByIdProject');
const { deleteByIdProject } = require('../service/project/deleteByIdProject');

router.post('/', async (req,res) => {
    try{
    
        let resDto = await addDataToFile(req.body);
        
        return res.json(resDto);
    }catch (err){
        return res.status(404).send(err);
    }
    
})

router.get('/', async (req,res) => {
    try{
        const allProjects = await getAllProjects();
        return res.json(allProjects);
    }catch (err){
        return res.status(404).send(err);
    }
})

router.get('/:projectId', async (req,res)=>{
    try{
        const projectById = await getByIdProject(req.params.projectId);
        if (projectById.project === null) return res.status(400).json(projectById);
        return res.json(projectById);
    }catch (err){
        console.error("특정 프로젝트 조회 실패", err);
        return res.status(500).json({ message: "특정 프로젝트 조회 실패" });
    }
})

router.delete('/:projectId', async (req,res)=>{
    try{

        const deletedProject = await deleteByIdProject(req.params.projectId);

        if (deletedProject?.project === null || deletedProject?.ErrorMessage) return res.status(400).json(deletedProject.ErrorMessage);
        return res.json(deletedProject.message);
    }catch (err){
        console.error("특정 프로젝트 삭제 실패", err);
        return res.status(500).json({ message: "특정 프로젝트 삭제 실패" , ErrorMessage: err});
    }
})



module.exports = router;
