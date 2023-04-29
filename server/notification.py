from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)
client = MongoClient('mongodb://localhost:27017/')
db = client['notification_system']
notif_collection = db['notifications']

@app.route('/createNotif', methods=['POST'])
def create_notif():
    data = request.json
    notif_id = notif_collection.insert_one(data).inserted_id
    return jsonify({'message': 'Notification created successfully!', 'notif_id': str(notif_id)})

@app.route('/getNotif', methods=['GET'])
def get_notif():
    notifs = notif_collection.find({})
    result = []
    for notif in notifs:
        notif_data = {}
        notif_data['sender_id'] = notif['sender_id']
        notif_data['sender_name'] = notif['sender_name']
        notif_data['receiver_id'] = notif['receiver_id']
        notif_data['receiver_name'] = notif['receiver_name']
        notif_data['message'] = notif['message']
        notif_data['sender_email'] = notif['sender_email']
        notif_data['_id'] = str(notif['_id'])
        result.append(notif_data)

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
