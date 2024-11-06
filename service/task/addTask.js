const fs = require('fs').promises; // fs 모듈의 Promise 버전을 사용

const { taskFrame } = require('../../model/projectDataFrame.js');
const { getAllProjects } = require('../project/getAllProject.js');

const {
    WRITEERROR,
} = require("../../model/ErrorMessage.js");

const filePath = "./database/projects.json";

async function addTask(inputTask){

    try{

        const allProject = await getAllProjects();

        //테스크 추가할 프로젝트 찾기
        const findProject = allProject.projects.filter((pr)=>{
            if (pr.id == inputTask.pjId) return pr;
        })[0];

        //테스크 생성
        const createdTask = createTask(findProject, inputTask);

        //프로젝트에 테스크 추가
        findProject.tasks.push(createdTask); 
        
        //테스크 추가한 프로젝트 저장
        allProject.projects.map(project => 
            project.id === findProject.id ? findProject : project
        );

        try {
            await fs.writeFile(filePath, JSON.stringify(allProject.projects, null, 2));
            return {id: findProject.id, tasks: findProject.tasks};
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