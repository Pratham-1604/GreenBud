import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
import sklearn 
import os
for dirname, _, filenames in os.walk("C:/Hackathons/SE Hackathon/greenbud/GreenBud/server/model/dataset/data.csv"):
    for filename in filenames:
        print(os.path.join(dirname, filename))

df = pd.read_csv("C:/Hackathons/SE Hackathon/greenbud/GreenBud/server/model/dataset/data.csv")

target = []
for i in df.columns:
    col = df[i]
    if type(col[0]) == str:
        target.append(i)
        print(i)

from sklearn.preprocessing import LabelEncoder
for i in target:
    encoder = LabelEncoder()
    encoder.fit(list(df[i]))
    df[i] = encoder.fit_transform(df[i])

X = df.drop("CO2 Emissions(g/km)", axis=1)
y = df["CO2 Emissions(g/km)"]

from sklearn.model_selection import train_test_split
x_train, x_test, y_train, y_test = train_test_split(X, y, test_size=1/5, random_state=41)

from sklearn.ensemble import RandomForestRegressor

RF_model = RandomForestRegressor(n_estimators = 50, max_depth = 15, random_state = 55, n_jobs=-1).fit(x_train, y_train)

import joblib
joblib.dump(RF_model, "C:/Hackathons/SE Hackathon/greenbud/GreenBud/server/model/RF_model.joblib")

y_predRF = RF_model.predict(x_test)

from sklearn.metrics import r2_score
accRF = r2_score(y_test,y_predRF)
print(accRF)