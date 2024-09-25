from bson import ObjectId
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_pymongo import PyMongo
import bcrypt
import pickle
import datetime
from pymongo import MongoClient
import pytz

app = Flask(__name__)
CORS(app)

# Load the pre-trained models
with open('diabetes_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

with open('heart_disease_model.pkl', 'rb') as f:
    heart_disease = pickle.load(f)

# MongoDB Client Setup
client = MongoClient("mongodb+srv://raveeshyatharun:wVDIBUP4ZgNZG0S6@cluster0.okgay.mongodb.net/")
UserCollection = client.prediction_db
Users = UserCollection.users
app.config["MONGO_URI"] = "mongodb+srv://raveeshyatharun:wVDIBUP4ZgNZG0S6@cluster0.okgay.mongodb.net/prediction_db"
mongo = PyMongo(app)

# MongoDB collections
Users = mongo.db.users
history_collection = mongo.db.prediction_history
heart_history_collection = mongo.db.heart_prediction_history

# User signup route
@app.route('/api/users', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Check if the user already exists
    existing_user = Users.find_one({'email': email})
    if existing_user:
        return jsonify({'message': 'User with this email already exists'}), 400

    # Hash the password and insert the new user
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    user = {
        'firstName': data.get('firstName'),
        'email': email,
        'password': hashed_password.decode('utf-8')
    }
    Users.insert_one(user)

    return jsonify({'message': 'User registered successfully!'}), 201

# User login route
@app.route('/api/auth', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    print(f"Received email: {email}, password: {password}")

    # Find the user by email
    user = Users.find_one({'email': email})
    if user is None:
        print("User not found")
        return jsonify({'message': 'Invalid email or password'}), 401

    print(f"User found: {user}")

    # Verify the password
    if not bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        print("Password does not match")
        return jsonify({'error': 'Invalid email or password'}), 401
    
    print("Authentication successful")

    # Authentication successful, return success response with user data
    response_data = {
        'message': 'Login successful',
        'user': {
            'firstName': user.get('firstName'),
            'email': user.get('email'),
            'password': user.get('password')
        }
    }
    return jsonify(response_data), 200

#get all users
@app.route('/api/v1/Register/getall', methods=['GET'])
def get_all_users():
    users = Users.find()
    user_list = []
    for user in users:
        user['_id'] = str(user['_id'])  # Convert ObjectId to string
        user_list.append(user)
    return jsonify(user_list), 200

#update user
@app.route('/api/v1/Register/edit/<user_id>', methods=['PUT'])
def edit_user(user_id):
    data = request.json
    Users.update_one(
        {'_id': ObjectId(user_id)},
        {'$set': {
            'firstName': data.get('firstName'),
            'email': data.get('email')
        }}
    )
    return jsonify({'message': 'User updated successfully'}), 200


# Route to delete a user
@app.route('/api/v1/Register/delete/<user_id>', methods=['DELETE'])
def remove_user(user_id):
    Users.delete_one({'_id': ObjectId(user_id)})
    return jsonify({'message': 'User deleted successfully'}), 200


# Diabetes prediction route

# Diabetes prediction route
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = [float(data[key]) for key in ['Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age']]
    prediction = model.predict([features])[0]
    
    # Map prediction result to labels
    result_label = 'diabetic' if prediction == 1 else 'not diabetic'
    
    sri_lanka_tz = pytz.timezone('Asia/Colombo')
    current_time = datetime.datetime.now(sri_lanka_tz)

    # Save prediction to history
    history_collection.insert_one({
        'features': features,
        'result': result_label,  # Save label instead of numerical result
        'date': current_time
    })

    return jsonify({'result': result_label})  # Return the label

# @app.route('/predict', methods=['POST'])
# def predict():
#     data = request.json
#     features = [float(data[key]) for key in ['Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age']]
#     prediction = model.predict([features])[0]
    
#     sri_lanka_tz = pytz.timezone('Asia/Colombo')
#     current_time = datetime.datetime.now(sri_lanka_tz)

#     # Save prediction to history
#     history_collection.insert_one({
#         'features': features,
#         'result': int(prediction),
#         'date': current_time
#     })

#     return jsonify({'result': int(prediction)})

# Diabetes prediction history
@app.route('/history', methods=['GET'])
def history():
    entries = list(history_collection.find({}, {'_id': 0}))
    return jsonify(entries), 200


@app.route('/all_diabetic_history', methods=['GET'])
def all_diabetic_history():
    entries = list(history_collection.find({}, {'_id': 0}))
    return jsonify(entries), 200

# Heart disease prediction route (backend)
@app.route('/predict-heart-disease', methods=['POST'])
def predict_heart_disease():
    try:
        data = request.json

        # List of all 13 required features
        required_features = [
            'Age', 'Sex', 'ChestPainType', 'RestingBP', 'Cholesterol', 
            'FastingBS', 'RestingECG', 'MaxHR', 'ExerciseAngina', 'Oldpeak', 
            'ST_Slope', 'ca', 'thal'
        ]

        # Ensure all required features are included in the input
        features = {feature: data.get(feature, 0) for feature in required_features}

        # Convert features to a list for model prediction
        feature_values = [float(features[feature]) for feature in required_features]

        # Predict using the model
        result = heart_disease.predict([feature_values])[0]

        # Save prediction to history with all the feature names
        heart_history_collection.insert_one({
            'features': features,  # Store the features dictionary
            'result': int(result),
            'date': datetime.datetime.now()
        })

        return jsonify({'result': str(result)})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Prediction failed, check inputs'}), 500

# Heart disease prediction history route (backend)
@app.route('/history-heart-disease', methods=['GET'])
def history_heart_disease():
    entries = list(heart_history_collection.find({}, {'_id': 0}))
    return jsonify(entries), 200

# Heart disease prediction history route (backend)
@app.route('/history-hearts-disease', methods=['GET'])
def history_hearts_disease():
    entries = list(heart_history_collection.find({}, {'_id': 0}))
    return jsonify(entries), 200

# Heart disease prediction route

# @app.route('/predict-heart-disease', methods=['POST'])
# def predict_heart_disease():
#     try:
#         data = request.json

#         # Correct list of features to match the model training
#         required_features = [
#             'Age', 'Sex', 'ChestPainType', 'RestingBP', 'Cholesterol', 
#             'FastingBS', 'RestingECG', 'MaxHR', 'ExerciseAngina', 'Oldpeak', 
#             'ST_Slope', 'ca', 'thal'
#         ]

#         # Ensure all required features are included in the input
#         features = [float(data.get(feature, 0)) for feature in required_features]

#         # Check for the correct number of features
#         if len(features) != 13:
#             return jsonify({'error': f'Expected 13 features, but got {len(features)}. Check the input data.'}), 400

#         # Predict using the model
#         result = heart_disease.predict([features])[0]

#         # Save prediction to history
#         heart_history_collection.insert_one({
#             'features': features,
#             'result': int(result),
#             'date': datetime.datetime.now()
#         })

#         return jsonify({'result': str(result)})
#     except Exception as e:
#         print(f"Error: {e}")
#         return jsonify({'error': 'Prediction failed, check inputs'}), 500

# # Heart disease prediction history
# @app.route('/history-heart-disease', methods=['GET'])
# def history_heart_disease():
#     entries = list(heart_history_collection.find({}, {'_id': 0}))
#     return jsonify(entries), 200

if __name__ == '__main__':
    app.run(debug=True)



