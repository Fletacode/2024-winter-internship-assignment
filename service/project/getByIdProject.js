const {
    EMPTYIDERROR,
    NOTFOUNDPROJECT,
    NOTIDNUMBERERROR
} = require("../../model/ErrorMessage.js");

const { getAllProjects } = require('./getAllProject.js');
const { isEmpty} = require("../../util/isEmpty.js");


async function getByIdProject(projectFindId){

    try{
        //입력 유효성 검사
        validateInput(projectFindId);

        //모든 프로젝트 조회
        const allProjects = await getAllProjects();

        //id 값으로 프로젝트 찾기
        const filteredProject = allProjects.filter((pr)=>{
            if (pr.id == projectFindId) return pr;
        });

        //찾은 결과 예외처리
        if (!validateFilteredProject(filteredProject)){
            throw NOTFOUNDPROJECT;
        }

        return filteredProject[0];
    }catch(err){
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

    return true;
}

function validateFilteredProject(filteredProject){
    if (isEmpty(filteredProject)){
        return false;
    }

    return true;
}


module.exports = {getByIdProject};