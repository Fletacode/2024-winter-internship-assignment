const express = require('express');
const router = express.Router();

const { addTask } = require('../service/task/addTask');
const {getAllTasks} = require('../service/task/getAllTask');

router.post('/:projectId/tasks', async (req,res)=>{
    
    try{
        const resAddTask = await addTask(req.body);
        if (resAddTask?.ErrorMessage !== null) return res.status(400).json(resAddTask);
        return res.json(resAddTask);
    }catch(err){
        res.sendStatus(500).send(err);   
    }
})

router.get('/:projectId/tasks', async (req,res)=>{

    try{
        const resGetAllTask = await getAllTasks(req.params.projectId);
        
        console.log(resGetAllTask);

        if (resGetAllTask?.tasks === null) return res.status(400).json(resGetAllTask);
        return res.json(resGetAllTask.tasks);
    }catch (err){
        res.sendStatus(500).send(err); 
    }

})




module.exports = router;