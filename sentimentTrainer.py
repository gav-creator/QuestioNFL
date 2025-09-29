import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.metrics import mean_squared_error, r2_score
import numpy as np

df = pd.read_csv("blurbs_sentiment_nextgame.csv")   
df = df.dropna(subset=['sentiment', 'fantasy_points'])

# Suppose df has ['sentiment', 'fantasy_points']
X = df[['sentiment']]  # predictors
y = df['fantasy_points']

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Baseline Linear Regression
lr = LinearRegression()
lr.fit(X_train, y_train)
y_pred = lr.predict(X_test)

print("MSE:", mean_squared_error(y_test, y_pred))
print("R2:", r2_score(y_test, y_pred))

# Ridge regression for stability
ridge = Ridge(alpha=1.0)
scores = cross_val_score(ridge, X, y, scoring='r2', cv=5)
print("Ridge CV R2:", np.mean(scores))
