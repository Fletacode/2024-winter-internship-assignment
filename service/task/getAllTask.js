const {getByIdProject} = require("../project/getByIdProject");


async function getAllTasks(projectId){


    try{

        const findProject = await getByIdProject(projectId);
        
        return {tasks: findProject.project[0].tasks};
    } catch (err){
        return {tasks: null, ErroMessage:"테스크 조회 실패"};
    }

}

module.exports = {getAllTasks};

