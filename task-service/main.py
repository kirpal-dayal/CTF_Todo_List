from fastapi import FastAPI
from pydantic import BaseModel
from pymongo import MongoClient

app = FastAPI()
client = MongoClient("mongodb://localhost:27017/")
db = client.todo_db
tasks_collection = db.tasks

class Task(BaseModel):
    title: str

@app.get("/tasks")
def get_tasks():
    tasks = list(tasks_collection.find({}, {"_id": 0}))
    return tasks

@app.post("/tasks")
def create_task(task: Task):
    task_id = tasks_collection.insert_one(task.dict()).inserted_id
    return {"id": str(task_id)}

@app.put("/tasks/{task_id}")
def update_task(task_id: str, task: Task):
    tasks_collection.update_one({"_id": task_id}, {"$set": task.dict()})
    return {"message": "Task updated"}

@app.delete("/tasks/{task_id}")
def delete_task(task_id: str):
    tasks_collection.delete_one({"_id": task_id})
    return {"message": "Task deleted"}
