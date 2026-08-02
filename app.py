#!/usr/bin/env python
# coding: utf-8

# In[ ]:


from flask import Flask, render_template, request
import numpy as np
import joblib

app = Flask(__name__)

# Load model and scaler
model = joblib.load("flood_prediction")
scaler = joblib.load("flood_prediction_scaler")


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():

    features = [
        float(request.form["Temp"]),
        float(request.form["Humidity"]),
        float(request.form["ANNUAL"]),
        float(request.form["JunSep"]),
        float(request.form["avgjune"]),
        float(request.form["sub"])
    ]

    data = np.array(features).reshape(1, -1)

    scaled = scaler.transform(data)

    prediction = model.predict(scaled)[0]

    probability = model.predict_proba(scaled)[0]

    if prediction == 1:
        result = "Flood Risk"
        confidence = round(probability[1] * 100, 2)
        color = "#ff4444"
    else:
        result = "Safe"
        confidence = round(probability[0] * 100, 2)
        color = "#00d26a"

    return render_template(
        "index.html",
        prediction=result,
        confidence=confidence,
        color=color
    )


if __name__ == "__main__":
    app.run(debug=True)

