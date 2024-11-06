const fs = require('fs').promises; // fs 모듈의 Promise 버전을 사용

const {getAllProjects} = require('../project/getAllProject');
const {getByIdProject} = require('../project/getByIdProject');

const {
    WRITEERROR,
} = require("../../model/ErrorMessage.js");

const filePath = "./database/projects.json";

async function deleteByIdTask(projectId, taskId){


    try{

        const allProjects = await getAllProjects();
        if (allProjects?.projects === null){
            return allProjects;
        }

        //해당 프로젝트 찾기
        const findProject = await getByIdProject(projectId);
        if (findProject.project === null || findProject.ErrorMessage){
            return findProject;
        }

        //해당 데스크 삭제
        findProject.project[0].tasks  = deleteTask(findProject.project[0].tasks, taskId);

        const updateProjects = allProjects.projects.map((project)=>{
            return (project.id == projectId) ? findProject.project[0] : project;
        });

        console.log(updateProjects);
        
        try {
            await fs.writeFile(filePath, JSON.stringify(updateProjects, null, 2));
            return {message:"데스크가 삭제되었습니다."};
        } catch (err) {
            console.error(WRITEERROR, err);
            return { message: WRITEERROR, ErrorMessage:WRITEERROR };
        }
        
    }catch(err){
        return { message: "데스크 삭제 실패", errorMessage:err };
    }


}

function deleteTask(tasks, findTaskId){
    return tasks.filter((task) => task.id === findTaskId);
}


module.exports = {deleteByIdTask};