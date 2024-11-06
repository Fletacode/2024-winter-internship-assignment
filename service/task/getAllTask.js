const {getByIdProject} = require("../project/getByIdProject");


async function getAllTasks(projectId){

    try{

        const findProject = await getByIdProject(projectId);
        
        return findProject.tasks;
    } catch (err){
        return err;
    }

}

module.exports = {getAllTasks};

