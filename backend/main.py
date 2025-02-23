from flask import Flask, jsonify, request
import json

app = Flask(__name__)

# Sample data (can be replaced with a database)
with open('data.json', 'r') as f:
    data = json.load(f)

print(data)

# Route to get all items
@app.route('/api/items', methods=['GET'])
def get_items():
    return jsonify(data)

# # Route to get a single item by ID
# @app.route('/api/items/<int:item_id>', methods=['GET'])
# def get_item(item_id):
#     item = next((item for item in data if item['id'] == item_id), None)
#     if item:
#         return jsonify(item)
#     else:
#         return jsonify({"error": "Item not found"}), 404

# # Route to add a new item
# @app.route('/api/items', methods=['POST'])
# def add_item():
#     new_item = request.get_json()
#     if not new_item or 'name' not in new_item:
#         return jsonify({"error": "Invalid data"}), 400
#     new_item['id'] = len(data) + 1
#     data.append(new_item)
#     return jsonify(new_item), 201

# # Route to update an item
# @app.route('/api/items/<int:item_id>', methods=['PUT'])
# def update_item(item_id):
#     item = next((item for item in data if item['id'] == item_id), None)
#     if not item:
#         return jsonify({"error": "Item not found"}), 404
#     updated_data = request.get_json()
#     if not updated_data or 'name' not in updated_data:
#         return jsonify({"error": "Invalid data"}), 400
#     item['name'] = updated_data['name']
#     return jsonify(item)

# # Route to delete an item
# @app.route('/api/items/<int:item_id>', methods=['DELETE'])
# def delete_item(item_id):
#     global data
#     item = next((item for item in data if item['id'] == item_id), None)
#     if not item:
#         return jsonify({"error": "Item not found"}), 404
#     data = [item for item in data if item['id'] != item_id]
#     return jsonify({"message": "Item deleted"}), 200

if __name__ == '__main__':
    app.run(debug=True)
