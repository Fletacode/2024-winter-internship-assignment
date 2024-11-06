const fs = require('fs').promises; // fs 모듈의 Promise 버전을 사용

const {
    GETALLPROJECTERROR
} = require("../../model/ErrorMessage.js");

const filePath = "./database/projects.json";

async function getAllProjects(){
    try{
        const fileData = await fs.readFile(filePath, 'utf8');

        const projects = JSON.parse(fileData);

        return {message: "모든 프로젝트 조회 성공", projects: projects};
    } catch(err){
        return {message: GETALLPROJECTERROR, projects: null, ErrorMessage: err};
    }   
    

}


module.exports = {getAllProjects};