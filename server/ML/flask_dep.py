from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS
import joblib
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.preprocessing import LabelEncoder
import random

app = Flask(__name__)
CORS(app)

# Load the trained model
model = joblib.load('./Artifacts/trained_model_good.pkl')

# Load the label encoder from the pickle file
label_encoder = joblib.load('./Artifacts/label_encoder_good.pkl')

@app.route('/predict', methods=['POST'])
def predict(): 
    try:
        # Get the JSON data from the request
        data = request.get_json()

        # Convert JSON to DataFrame
        df = pd.DataFrame(data, index=[0])

        # Encode categorical columns using the loaded label encoder
        categorical_cols = ['Training_name', 'Trainer_name', 'UserType', 'Status']
        for col in categorical_cols:
            df[col] = label_encoder.fit_transform(df[col])

        # Make prediction
        prediction = model.predict(df)

        # Add a random number between 45 and 245 to the prediction
        random_number = random.randint(45, 245)
        prediction_with_random = prediction + random_number

        # Return the prediction with the random number as JSON response
        return jsonify({'prediction': prediction_with_random.tolist()})

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(port=8080, debug=True)
