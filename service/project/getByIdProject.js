const {
    EMPTYIDERROR,
    NOTFOUNDPROJECT,
    NOTIDNUMBERERROR
} = require("../../model/ErrorMessage.js");

const { getAllProjects } = require('./getAllProject.js');

/*
리턴양식
{message:"프로젝트 조회 성공", project: filteredProject};
{message:"프로젝트 조회 실패", project: null, ErrorMessage: err};
*/

async function getByIdProject(projectFindId){

    //입력값 유효성 테스트
    const isValidateInput = validateInput(projectFindId);
    if (isValidateInput?.project === null){
        return isValidateInput;
    }

    try{
        
        const allProjects = await getAllProjects();


        if (allProjects.project === null){
            return allProjects;
        }

        const filteredProject = allProjects.projects.filter((pr)=>{
            if (pr.id == projectFindId) return pr;
        });

        if (!validateFilteredProject(filteredProject)){
            return {ErrorMessage:NOTFOUNDPROJECT };
        }

    
        return {project: filteredProject};
        
    }catch(err){
        return {message:"프로젝트 조회 실패", project: null, ErrorMessage: err};
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

function validateFilteredProject(filteredProject){
    if (!filteredProject){
        return false;
    } else if (filteredProject.length == 0){
        return false;
    }

    return true;
}


module.exports = {getByIdProject};