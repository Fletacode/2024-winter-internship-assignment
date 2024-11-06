const projectFrame = {
  "id": "0",
  "title": "프로젝트 제목",
  "description": "프로젝트 설명",
  "tasks": [] // task id list
};

const taskFrame = {
  "pjId": 1, // project id
  "id": "1",
  "title": "태스크 제목",
  "description": "태스크 설명",
  "priority": "high", // high | medium | low
  "dueDate": "2024-11-10",
  "status": "in-progress" // not-started | in-progress | done
};

module.exports = { projectFrame, taskFrame };