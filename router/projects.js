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
    
        return res.json(projectById);
    }catch (err){
        return res.status(404).send(err);
    }
})

router.delete('/:projectId', async (req,res)=>{
    try{

        const deletedProject = await deleteByIdProject(req.params.projectId);

        return res.status(200).send(deletedProject);
    }catch (err){
        return res.status(404).send(err);
    }
})



module.exports = router;
