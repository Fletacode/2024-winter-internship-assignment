const {getByIdProject} = require("../project/getByIdProject");


async function getAllTasks(projectId){

    try{

        const findProject = await getByIdProject(projectId);
        
        return {tasks: findProject.tasks};
    } catch (err){
        return err;
    }

}

module.exports = {getAllTasks};

