from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import bcrypt
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

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    hashed_pw = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    cur = conn.cursor()
    try:
        cur.execute("INSERT INTO users (username, email, password_hash) VALUES (%s, %s, %s)",
                    (data['username'], data['email'], hashed_pw))
        conn.commit()
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    cur = conn.cursor()
    cur.execute("SELECT id, password_hash FROM users WHERE email = %s", (data['email'],))
    user = cur.fetchone()
    if user and bcrypt.checkpw(data['password'].encode('utf-8'), user[1].encode('utf-8')):
        token = create_access_token(identity=user[0])
        return jsonify({"access_token": token}), 200
    return jsonify({"error": "Invalid credentials"}), 401

@app.route('/me', methods=['GET'])
@jwt_required()
def me():
    user_id = get_jwt_identity()
    cur = conn.cursor()
    cur.execute("SELECT id, username, email FROM users WHERE id = %s", (user_id,))
    user = cur.fetchone()
    return jsonify({"id": user[0], "username": user[1], "email": user[2]}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
