const BASE_URL = "http://localhost:3000";

async function main() {

  // call a /health
  const healthResponse = await fetch(BASE_URL + "/health");
  const healthData = await healthResponse.json();
  console.log("Health:", healthData);

  // create a task
  const createResponse = await fetch(BASE_URL + "/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: "Study for midterm",
      course: "CS453",
      completed: false
    })
  });

  // list all of the tasks
  const allTasks = await fetch(BASE_URL + "/api/tasks");
  const taskList = await allTasks.json();
  console.log(taskList);

  // get one specific task
  const id1 = 1;
  const oneTask = await fetch(BASE_URL + "/api/tasks/" + id1);
  const oneTaskLog = await oneTask.json();
  console.log(oneTaskLog);

  // update a task
  const id2 = 1;
  const updateResponse = await fetch(BASE_URL + "/api/tasks/" + id2, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        title: "New Title",
        course: "CS453",
        completed: true
    })
  });
  const updatedTask = await updateResponse.json();
  console.log(updatedTask);

  // delete a task
  const id3 = 1;
  const deleteResponse = await fetch(BASE_URL + "/api/tasks/" + id3, {
    method: "DELETE"
  });
}

main().catch(console.error);