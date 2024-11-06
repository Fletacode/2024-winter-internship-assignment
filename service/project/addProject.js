const fs = require('fs').promises; // fs 모듈의 Promise 버전을 사용

const { projectFrame } = require('../../model/projectDataFrame.js');
const {
    EMPTYTITLEMESSAGE,
    EMPTYDESCPTIONMESSAGE, 
    EMPTYINPUTPROJECT, 
    READERROR,
    WRITEERROR,
    CREATEPROJECTERROR,
    NOTVALIDATEINPUT
} = require("../../model/ErrorMessage.js");

const filePath = "./database/projects.json";

const {isEmpty} = require('../../util/isEmpty.js');

async function addDataToFile(inputData) {
    
    try {
        //입력값 유효성 테스트
        validateInputProject(inputData);

        // 파일 읽기
        let project = [];
        try {
            const fileData = await fs.readFile(filePath, 'utf8');
            project = JSON.parse(fileData);
        } catch (err) {
            throw READERROR;
        }

        // 새 프로젝트 생성 및 추가
        try {
            const nowId = (!project.length) ? 0 : project[project.length - 1].id;
            const newProject = createProjectFrame(inputData, nowId);
            project.push(newProject);
        } catch (err) {
            throw CREATEPROJECTERROR;
        }

        // 파일 쓰기
        try {
            await fs.writeFile(filePath, JSON.stringify(project, null, 2));
            return {id: project[project.length - 1].id , project: project[project.length - 1] };
        } catch (err) {
            throw WRITEERROR;
        }
    } catch (err) {
        throw err;
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
    if (isEmpty(inputProject)) {
        throw EMPTYINPUTPROJECT;
    }
    if (!inputProject.title) {
        throw EMPTYTITLEMESSAGE;
    }
    if (!inputProject.description) {
        throw EMPTYDESCPTIONMESSAGE;
    }
    return true;
}

module.exports = { addDataToFile };
