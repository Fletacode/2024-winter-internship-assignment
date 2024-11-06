const fs = require('fs').promises; // fs 모듈의 Promise 버전을 사용

const {
    EMPTYIDERROR,
    NOTIDNUMBERERROR,
    WRITEERROR,
    CANNOTDELETEPROJECT
} = require("../../model/ErrorMessage.js");

const { getAllProjects } = require('./getAllProject.js');
const { getByIdProject} = require('./getByIdProject.js');

const filePath = "./database/projects.json";

async function deleteByIdProject(projectDelId) {

    //입력값 유효성 테스트
    const isValidateInput = validateInput(projectDelId);
    if (isValidateInput?.project === null){
        return isValidateInput;
    }

    try{

        const allProjects = await getAllProjects();

        if (allProjects?.projects === null){
            return allProjects;
        }

    
        const deletedProject = await getByIdProject(projectDelId);
        
        if (deletedProject.project === null || deletedProject.ErrorMessage){
            return deletedProject;
        }

        //테스크가 있다면 삭제 불가
        if (deletedProject.project[0].tasks.length > 0){
            return {ErrorMessage : CANNOTDELETEPROJECT};
        }

        //삭제
        const filteredProject = allProjects.projects.filter( (pr) =>{
            if (pr.id !== deletedProject.project[0].id) return pr;
        });


        // 삭제된 프로젝트 삽입
        try {
            await fs.writeFile(filePath, JSON.stringify(filteredProject, null, 2));
            return {message:"특정 프로젝트 삭제 성공", project: deletedProject};
        } catch (err) {
            console.error(WRITEERROR, err);
            return { message: WRITEERROR, project: null, errorMessage:err };
        }

    } catch(err){
        console.error(err);
        return {message:"프로젝트 조회 성공", project: null, ErrorMessage: err};
    }
    
}

function validateInput(projectId){
   
    if (!projectId){
        return {message:EMPTYIDERROR, project: null, ErrorMessage:EMPTYIDERROR };
    }

    else if (isNaN(parseInt(projectId))){
        return {message:NOTIDNUMBERERROR, project: null, ErrorMessage:NOTIDNUMBERERROR };
    }

    return true
}


module.exports = {deleteByIdProject};

