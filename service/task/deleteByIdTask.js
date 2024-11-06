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

        //해당 프로젝트 찾기
        let findProject = await getByIdProject(projectId);

        //해당 데스크 삭제
        findProject.tasks  = deleteTask(findProject.tasks, taskId);

        const updateProjects = allProjects.map((project)=>{
            return (project.id == projectId) ? findProject : project;
        });
        
        try {
            await fs.writeFile(filePath, JSON.stringify(updateProjects, null, 2));
            return "데스크가 삭제되었습니다.";
        } catch (err) {
            throw err;
        }
        
    }catch(err){
        console.error(err);
        throw "데스크 삭제 실패";
    }


}

function deleteTask(tasks, findTaskId){
    return tasks.filter((task) => task.id != findTaskId);
}


module.exports = {deleteByIdTask};
