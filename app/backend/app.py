from flask import Flask, request, jsonify
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from flask_cors import CORS  # Importiere CORS

app = Flask(__name__)
CORS(app)  # Füge CORS-Middleware hinzu

def get_db_connection():
    conn = psycopg2.connect(
        host=os.environ['POSTGRES_HOST'],
        database=os.environ['POSTGRES_DB'],
        user=os.environ['POSTGRES_USER'],
        password=os.environ['POSTGRES_PASSWORD']
    )
    return conn

@app.route('/vote', methods=['POST'])
def vote():
    party = request.json['party']
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('UPDATE votes SET votes = votes + 1 WHERE party = %s', (party,))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify(message=f"Voted for {party}")

@app.route('/results')
def results():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute('SELECT * FROM votes')
    results = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(results=results)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
