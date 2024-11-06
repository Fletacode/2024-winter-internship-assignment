const fs = require('fs').promises; // fs 모듈의 Promise 버전을 사용

const {
    EMPTYIDERROR,
    NOTIDNUMBERERROR,
    WRITEERROR,
    CANNOTDELETEPROJECT
} = require("../../model/ErrorMessage.js");

const { getAllProjects } = require('./getAllProject.js');
const { getByIdProject} = require('./getByIdProject.js');
const {isEmpty} = require('../../util/isEmpty.js');

const filePath = "./database/projects.json";

async function deleteByIdProject(projectDelId) {
    try{
        //입력값 유효성 검사
        validateInput(projectDelId);

        //모든 프로젝트 조회
        const allProjects = await getAllProjects();

        const deletedProject = await getByIdProject(projectDelId);

        //테스크가 있다면 삭제 불가
        validateIsTask(deletedProject);

        //삭제
        const filteredProject = allProjects.filter( (pr) =>{
            if (pr.id !== deletedProject.id) return pr;
        });


        // 삭제된 프로젝트 삽입
        try {
            await fs.writeFile(filePath, JSON.stringify(filteredProject, null, 2));
            return projectDelId + "번 특정 프로젝트 삭제 성공";
        } catch (err) {
            throw WRITEERROR;
        }

    } catch(err){
        throw err;
    }
    
}

function validateInput(projectId){
   
    if (isEmpty(projectId)){
        throw EMPTYIDERROR;
    }

    else if (isNaN(parseInt(projectId))){
        throw NOTIDNUMBERERROR;
    }

    return true
}

function validateIsTask(project){

    if (project.tasks.length > 0){
        throw CANNOTDELETEPROJECT;
    }

}


module.exports = {deleteByIdProject};

