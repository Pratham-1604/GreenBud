"""## Importing Basic Utility Libraries"""

import numpy as np
import pandas as pd 
import scipy

"""## Loading Dataset"""

data = pd.read_csv("./data/dataset.csv", encoding='windows-1252')
data.head()

print("Dimensions: ", data.shape)
num_row = data.shape[0]
num_col = data.shape[1]

data.isna().sum()

"""## Implemeting One Hot Encoding"""

from sklearn import preprocessing
from sklearn.compose import ColumnTransformer

# Here are the categorical features we are going to create one-hot encoded features for
categorical_features = ['manufacturer','model','description','transmission','transmission_type','fuel','powertrain'] 

encoder = preprocessing.OneHotEncoder(handle_unknown='ignore')
one_hot_features = encoder.fit_transform(data[categorical_features])
one_hot_names = encoder.get_feature_names_out()

print("Type of one_hot_columns is:",type(one_hot_features))

one_hot_df = pd.DataFrame.sparse.from_spmatrix(one_hot_features)
one_hot_df.columns = one_hot_names # Now we can see the actual meaning of the one-hot feature in the DataFrame
one_hot_df.head()

"""## Combining Numerical & One Hot Features"""

from sklearn.model_selection import train_test_split

numerical_feature_names = ["engine_size_cm3","power_ps"]
numerical_features = data[numerical_feature_names]
scaler = preprocessing.MinMaxScaler()
numerical_features = scaler.fit_transform(numerical_features) # Need to scale numerical features for ridge regression

# Combine numerical features with one-hot-encoded features
features = scipy.sparse.hstack((numerical_features, one_hot_features),format='csr') 
all_feature_names = np.hstack((numerical_feature_names,one_hot_names)) # Store names of all features for later interpretation

target_column = ['co2_emissions_gPERkm'] 
target = data[target_column].values
target = np.ravel(target)

# Perform train and test split of data
rand_seed = 42 # For other models we will use the same random seed, so that we're always using the same train-test split
features_train, features_test, target_train, target_test = train_test_split(features, target, test_size=0.1, random_state=rand_seed)

# from sklearn.ensemble import RandomForestRegressor
# from sklearn.model_selection import RandomizedSearchCV

# rf_grid = {"n_estimators": np.arange(10, 100, 10),
#            "max_depth": [3, 5, 10],
#            "min_samples_split": np.arange(2, 20, 2),
#            "min_samples_leaf": np.arange(1, 20, 2),
#            "max_features": [0.5, 1, "sqrt"]}

# # Instantiate Model

# rs_model = RandomizedSearchCV(RandomForestRegressor(),
#                               param_distributions = rf_grid,
#                               n_iter = 100, # 100 iters takes 2 hours and gives better results
#                               cv = 5,
#                               verbose = 2)

# # Fit Model
# import joblib
# rs_model.fit(features_train, target_train)
# joblib.dump(rs_model, "./model/random_forest_full.joblib")

from sklearn import linear_model
ridge_fit = linear_model.RidgeCV(cv = 5)
ridge_fit.fit(features_train, target_train)
print("RidgeCV found an optimal regularization parameter alpha =",ridge_fit.alpha_)
import joblib
joblib.dump(ridge_fit, "./model/ridge_fit_full.joblib")
test_score_no_text = ridge_fit.score(features_test,target_test)
print("Test score for Ridge Regression without text features:", test_score_no_text)