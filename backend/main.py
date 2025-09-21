from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
from sklearn.ensemble import RandomForestRegressor

app = FastAPI()

# Load trained model
model = joblib.load("rf_model.joblib")

# Schema matches frontend input
class PlayerFeatures(BaseModel):
    age: int
    snap: int
    weight: float
    position: str
    game_designation: str
    started: bool
    injury_type: str

# Columns in your training DataFrame
position_cols = ["position_DL","position_FB","position_LB","position_OL","position_QB","position_RB","position_ST","position_TE","position_WR"]
game_cols = ["Game_Designation_C19 Opt-Out","Game_Designation_Doubtful","Game_Designation_Injured Reserve","Game_Designation_Out",
             "Game_Designation_Physically Unable to Perform","Game_Designation_Questionable"]
injury_cols = [
    "Injury_Type_Achilles","Injury_Type_Ankle","Injury_Type_Back","Injury_Type_Biceps","Injury_Type_C19","Injury_Type_C19 Opt-Out",
    "Injury_Type_Calf","Injury_Type_Chest","Injury_Type_Concussion","Injury_Type_Core","Injury_Type_Elbow","Injury_Type_Finger",
    "Injury_Type_Foot","Injury_Type_Glute","Injury_Type_Groin","Injury_Type_Hamstring","Injury_Type_Hamstrings","Injury_Type_Hand",
    "Injury_Type_Hip","Injury_Type_Knee","Injury_Type_Left Calf","Injury_Type_Left Groin","Injury_Type_Left Thumb","Injury_Type_Liver",
    "Injury_Type_Neck","Injury_Type_Oblique","Injury_Type_Pectoral","Injury_Type_Quadricep","Injury_Type_Rib","Injury_Type_Ribs",
    "Injury_Type_Right Groin","Injury_Type_Right Knee","Injury_Type_Right Quadricep","Injury_Type_Right Shoulder","Injury_Type_Right Thumb",
    "Injury_Type_Shin","Injury_Type_Shoulder","Injury_Type_Stinger","Injury_Type_Thigh","Injury_Type_Thumb","Injury_Type_Toe",
    "Injury_Type_Triceps","Injury_Type_Wrist"
]

@app.get("/")
def read_root():
    return {"message": "NFL Injury Prediction API is running!"}

@app.post("/predict")
def predict(features: PlayerFeatures):
    # Start with numeric features
    data = {
        "Age": features.age,
        "start_snap": features.start_snap,
        "weight": features.weight,
        "started_YES": features.started
    }

    # One-hot encode position
    for col in position_cols:
        data[col] = col.split("_")[1] == features.position

    # One-hot encode game designation
    for col in game_cols:
        # handle spaces in column names
        data[col] = col.replace("Game_Designation_", "") == features.game_designation

    # One-hot encode injury type
    for col in injury_cols:
        data[col] = col.replace("Injury_Type_", "") == features.injury_type

    # Convert to DataFrame
    df = pd.DataFrame([data])

    # Predict
    prediction = model.predict(df)[0]

    return {"prediction": float(prediction)}
