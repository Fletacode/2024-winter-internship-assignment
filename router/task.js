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
        
        console.log(resGetAllTask);

        if (resGetAllTask?.tasks === null) return res.status(400).json(resGetAllTask);
        return res.json(resGetAllTask.tasks);
    }catch (err){
        res.sendStatus(500).send(err); 
    }

})

router.put('/:projectId/tasks/:taskId', async(req,res)=>{

    try{
        const resEditTask = await editByIdTask(req.params.projectId, req.params.taskId, req.body);
        
        if (resEditTask?.ErrorMessage === null) return res.status(400).json(resEditTask);
        return res.json(resEditTask.editedTask);
    }catch(err){
        res.sendStatus(500).send(err); 
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