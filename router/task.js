const express = require('express');
const router = express.Router();

const { addTask } = require('../service/task/addTask');
const {getAllTasks} = require('../service/task/getAllTask');
const {editByIdTask} = require('../service/task/editByIdTask');
const {deleteByIdTask} = require('../service/task/deleteByIdTask');

router.post('/:projectId/tasks', async (req,res)=>{
    
    try{
        const resAddTask = await addTask(req.body);
    
        return res.status(200).json(resAddTask);
    }catch(err){
        return res.status(404).send(err);   
    }
})

router.get('/:projectId/tasks', async (req,res)=>{

    try{
        const resGetAllTask = await getAllTasks(req.params.projectId);
        return res.status(200).json(resGetAllTask);
    }catch (err){
        res.status(404).send(err); 
    }

})

router.put('/:projectId/tasks/:taskId', async(req,res)=>{

    try{
        const resEditTask = await editByIdTask(req.params.projectId, req.params.taskId, req.body);
        
      
        return res.status(200).json(resEditTask);
    }catch(err){
        res.status(404).send(err); 
    }
})

router.delete('/:projectId/tasks/:taskId', async(req,res)=>{
    try{

        const resDelteTask = await deleteByIdTask(req.params.projectId, req.params.taskId);
            
        if (resDelteTask?.ErrorMessage !== null) return res.status(400).json(resDelteTask);
        return res.json(resDelteTask.message);
    }catch(err){
        return res.sendStatus(500).send(err); 
    }
})




module.exports = router;