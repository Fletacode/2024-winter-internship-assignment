const fs = require('fs').promises; // fs 모듈의 Promise 버전을 사용

const {
    READERROR
} = require("../../model/ErrorMessage.js");

const filePath = "./database/projects.json";

async function getAllProjects(){
    try{
        try{
            const fileData = await fs.readFile(filePath, 'utf8');

            const projects = JSON.parse(fileData);

            return projects;
        }catch(err){
            throw READERROR;
        }

        
    } catch(err){
        throw err;
    }   
    

}


module.exports = {getAllProjects};