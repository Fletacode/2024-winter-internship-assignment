const express = require('express');
const router = express.Router();

const { addTask } = require('../service/task/addTask');

router.post('/:projectId/tasks', async (req,res)=>{
    
    try{
        const resAddTask = await addTask(req.body);
        if (resAddTask?.ErrorMessage !== null) return res.status(400).json(resAddTask);
        return res.json(resAddTask);
    }catch(err){
        res.sendStatus(500).send(err);   
    }
})


module.exports = router;