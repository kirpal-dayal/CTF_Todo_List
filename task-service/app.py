from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
import psycopg2

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'supersecretkey'  # Cambia esto por algo seguro
jwt = JWTManager(app)

# Conexión a la base de datos
conn = psycopg2.connect(
    host="postgres_db",
    database="ctf_todo",
    user="postgres",
    password=""
)

@app.route('/tasks', methods=['POST'])
@jwt_required()
def create_task():
    user_id = get_jwt_identity()
    data = request.json
    cur = conn.cursor()
    cur.execute("INSERT INTO tasks (user_id, title, description, priority) VALUES (%s, %s, %s, %s) RETURNING id",
                (user_id, data['title'], data['description'], data.get('priority', 0)))
    task_id = cur.fetchone()[0]
    conn.commit()
    return jsonify({"id": task_id, "message": "Task created"}), 201

@app.route('/tasks', methods=['GET'])
@jwt_required()
def get_tasks():
    user_id = get_jwt_identity()
    cur = conn.cursor()
    cur.execute("SELECT id, title, description, priority, completed FROM tasks WHERE user_id = %s", (user_id,))
    tasks = cur.fetchall()
    return jsonify([{"id": t[0], "title": t[1], "description": t[2], "priority": t[3], "completed": t[4]} for t in tasks]), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
