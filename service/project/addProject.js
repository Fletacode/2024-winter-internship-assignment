const fs = require('fs').promises; // fs 모듈의 Promise 버전을 사용

const { projectFrame } = require('../../model/projectDataFrame.js');
const {
    EMPTYTITLEMESSAGE,
    EMPTYDESCPTIONMESSAGE, 
    EMPTYINPUTPROJECT, 
    READERROR,
    WRITEERROR,
    CREATEPROJECTERROR
} = require("../../model/ErrorMessage.js");

const filePath = "./database/projects.json";

/*
리턴 양식
{ message: READERROR, project: null, errorMessage:err }
*/

async function addDataToFile(inputData) {
    // 입력값 유효성 테스트
    const errorMessage = validateInputProject(inputData);
    if (errorMessage) {
        return { message: errorMessage, project: null, errorMessage: "입력값 유효성 통과 실패" };
    }

    try {
        // 파일 읽기
        let project = [];
        try {
            const fileData = await fs.readFile(filePath, 'utf8');
            project = JSON.parse(fileData);
        } catch (err) {
            console.error(READERROR, err);
            return { message: READERROR, project: null, errorMessage:err };
        }

        // 새 프로젝트 생성 및 추가
        try {
            const nowId = (!project.length) ? 0 : project[project.length - 1].id;
            const newProject = createProjectFrame(inputData, nowId);
            project.push(newProject);
        } catch (err) {
            console.error(CREATEPROJECTERROR, err);
            return { message: CREATEPROJECTERROR, project: null,errorMessage:err  };
        }

        // 파일 쓰기
        try {
            await fs.writeFile(filePath, JSON.stringify(project, null, 2));
            return { message: "프로젝트 생성 성공", project: project[project.length - 1] };
        } catch (err) {
            console.error(WRITEERROR, err);
            return { message: WRITEERROR, project: null, errorMessage:err };
        }
    } catch (err) {
        console.error("Unexpected error:", err);
        return { message: "Unexpected error occurred", project: null, errorMessage:err };
    }
}

// 프로젝트 프레임 생성 함수
function createProjectFrame(inputProject, nowId) {
    const tempProject = { ...projectFrame }; // 객체 복사
    tempProject.id = nowId + 1;
    tempProject.title = inputProject.title;
    tempProject.description = inputProject.description;
    return tempProject;
}

// 입력값 유효성 검사 함수
function validateInputProject(inputProject) {
    if (!inputProject) {
        return EMPTYINPUTPROJECT;
    }
    if (!inputProject.title) {
        return EMPTYTITLEMESSAGE;
    }
    if (!inputProject.description) {
        return EMPTYDESCPTIONMESSAGE;
    }
    return "";
}

module.exports = { addDataToFile };
