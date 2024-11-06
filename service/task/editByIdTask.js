const fs = require('fs').promises; // fs 모듈의 Promise 버전을 사용

const {getByIdProject} = require("../project/getByIdProject");
const {getAllProjects} = require("../project/getAllProject");

const {
    WRITEERROR,
} = require("../../model/ErrorMessage.js");

const filePath = "./database/projects.json";

async function editByIdTask(projectId, taskId, reqTask){

    try{

        const allProjects = await getAllProjects();
        if (allProjects?.projects === null){
            return allProjects;
        }

        //해당 프로젝트 찾고 수정된 데스크 반환
        const findProject = await getByIdProject(projectId);
        if (findProject.project === null || findProject.ErrorMessage){
            return findProject;
        }

        const foundProjectTasks = findProject.project[0].tasks;
        let targetEditTask = foundProjectTasks.find(task => task.id == taskId);
        const editedTask = editOneTask(targetEditTask, reqTask);

        

        //수정된 테스크, 데스크 배열에 적용
        findProject.project[0].tasks = editTaskList(foundProjectTasks,editedTask);
        
        
        //프로젝트 저장
        const updateProjects = allProjects.projects.map((project)=>{
            return (project.id == findProject.project[0].id) ? findProject.project[0] : project;
        })


        
        try {
            await fs.writeFile(filePath, JSON.stringify(updateProjects, null, 2));
            return {editedTask: editedTask};
        } catch (err) {
            //console.error(WRITEERROR, err);
            return { message: WRITEERROR, errorMessage:err };
        }
        

    } catch(err){
        return { message: WRITEERROR, errorMessage:err };
    }

}

//수정된 데스크 반환
function editOneTask(editedTask, reqTask){

    editedTask.title = reqTask.title;
    editedTask.priority = reqTask.priority;
    editedTask.dueDate = reqTask.dueDate;
    editedTask.status = reqTask.status;

    return editedTask;
}

//수정된 데크스 테스크 배열에 적용하여 리턴
function editTaskList(taskList, editedTask){

    return taskList.map((task) =>{
        return (task.id == editedTask.id) ? editedTask : task;
    })

}




module.exports = {editByIdTask};