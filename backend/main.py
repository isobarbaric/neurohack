from flask import Flask, jsonify, request
import json
from assess.drawing import run_inference
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)

with open('data.json', 'r') as f:
    data = json.load(f)

def find_user(first_name):
    for user in data['users']:
        if user.firstName == first_name:
            return user 

@app.route('/api/get_user/<string:first_name>', methods=['GET'])
def get_user(first_name):
    user = find_user(first_name)
    if user:
        return jsonify(user) 
    return jsonify({"error": "User not found"}), 404

@app.route('/api/drawing/', methods=['POST'])
def evaluate_drawing():
    data = request.get_json()['image']
    results = run_inference(data)
    
    # TODO save results in database    
    print(results)
    return {'message': 'success', 'results': results}

@app.after_request
def add_header(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    return response


if __name__ == '__main__':
    app.run(debug=True)
