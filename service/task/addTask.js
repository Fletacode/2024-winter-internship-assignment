const fs = require('fs').promises; // fs 모듈의 Promise 버전을 사용

const { taskFrame } = require('../../model/projectDataFrame.js');
const { getAllProjects } = require('../project/getAllProject.js');
const {getByIdProject} = require('../project/getByIdProject');

const {
    WRITEERROR,
} = require("../../model/ErrorMessage.js");

const filePath = "./database/projects.json";

async function addTask(inputTask){

    try{

        const allProjects = await getAllProjects();
        if (allProjects?.projects === null){
            return allProjects;
        }

        //테스크 추가할 프로젝트 찾기
        const findProject = await getByIdProject(inputTask.pjId);
        if (findProject.project === null || findProject.ErrorMessage){
            return findProject;
        }

        //테스크 생성
        const createdTask = createTask(findProject.project[0], inputTask);

        //프로젝트에 테스크 추가
        findProject.project[0].tasks.push(createdTask);
        
        //테스크 추가한 프로젝트 저장
        allProjects.projects = allProjects.projects.map((project)=>{
            return (project.id == findProject.project[0].id) ? findProject.project[0] : project;
        })

        try {
            await fs.writeFile(filePath, JSON.stringify(allProjects.projects, null, 2));
            return {id:  findProject.project[0].id, tasks:  findProject.project[0].tasks};
        } catch (err) {
            console.error(WRITEERROR, err);
            return { message: WRITEERROR, project: null, errorMessage:err };
        }

    }catch(err){
        return { message: "테스크 추가 실패", errorMessage:"테스크 추가 실패"};
    }

}

function createTask(findProject, inputTask){

    let tempTask = taskFrame;

    try{
        tempTask.pjId = findProject.id;
        tempTask.id = (findProject.tasks.length === 0) ? 1 : findProject.tasks.length + 1;
    
        tempTask.title = inputTask?.title;
        tempTask.description = inputTask?.description;
        tempTask.priority = inputTask?.priority;
        tempTask.dueDate = inputTask?.dueDate;
        tempTask.status = "not-started";
    
    }catch(err){
        console.error(err);
    }
   ;

    return tempTask;
}


module.exports = {addTask};