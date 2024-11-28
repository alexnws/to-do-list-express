import request from "supertest";
import app from "./index";

describe("To do list", () => {
  let taskId: number;

  // Test de création d'une tâche
  it("create a new task", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({ title: "Test Task" });
    expect(response.status).toBe(201);
    expect(response.body.title).toBe("Test Task");
    expect(response.body.completed).toBe(false);
    taskId = response.body.id;
  });

  // Test de lecture des tâches
  it("returns all tasks", async () => {
    const response = await request(app).get("/tasks");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test de mise à jour d'une tâche
  it("updates a task", async () => {
    const response = await request(app)
      .put(`/tasks/${taskId}`)
      .send({ title: "Updated Task", completed: true });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Updated Task");
    expect(response.body.completed).toBe(true);
  });

  // Test de suppression d'une tâche
  it("deletes a task", async () => {
    const createResponse = await request(app)
      .post("/tasks")
      .send({ title: "Task to Delete" });
    const taskId = createResponse.body.id;

    // Supprime la tâche
    const deleteResponse = await request(app).delete(`/tasks/${taskId}`);
    expect(deleteResponse.status).toBe(204);
  });
});
