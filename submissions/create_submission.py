
import pandas as pd
import numpy as np
import lightgbm as lgb

# Load training and metadata
train = pd.read_csv('train.csv')
metadata = pd.read_csv('metadata.csv')

# Ensure metadata has unique building_id
metadata = metadata.drop_duplicates(subset=['building_id'])

# Merge training data with metadata
data = train.merge(metadata, on='building_id', how='left')

# Convert timestamp to datetime and extract time-based features
if 'timestamp' in data.columns:
    data['timestamp'] = pd.to_datetime(data['timestamp'])
    data['hour'] = data['timestamp'].dt.hour
    data['day'] = data['timestamp'].dt.day
    data['weekday'] = data['timestamp'].dt.weekday
    data['month'] = data['timestamp'].dt.month

# Define features (metadata + new time features if available)
feature_columns = [
    'rooms', 'no_of_people', 'area_in_sqft', 'inverter', 'lights',
    'ceiling_fans', 'air_coolers', 'air_conditioners', 'fridge', 'tv',
    'water_heaters', 'washing_machine', 'mixer', 'iron', 'micro_wave'
]

# Add time features if they exist
for col in ['hour', 'day', 'weekday', 'month']:
    if col in data.columns:
        feature_columns.append(col)

# Handle missing values
data[feature_columns] = data[feature_columns].fillna(0)

# Prepare training data
X_train = data[feature_columns]
y_train = np.log1p(data['meter_reading'])  # log-transform target

# Train LightGBM model
train_dataset = lgb.Dataset(X_train, label=y_train)
params = {
    'objective': 'regression',
    'metric': 'rmse',
    'learning_rate': 0.05,
    'num_leaves': 31,
    'feature_fraction': 0.9,
    'bagging_fraction': 0.8,
    'bagging_freq': 5,
    'seed': 42
}
model = lgb.train(params, train_dataset, num_boost_round=1000)

# Load and prepare test data
test = pd.read_csv('test.csv')
test = test.merge(metadata, on='building_id', how='left')

if 'timestamp' in test.columns:
    test['timestamp'] = pd.to_datetime(test['timestamp'])
    test['hour'] = test['timestamp'].dt.hour
    test['day'] = test['timestamp'].dt.day
    test['weekday'] = test['timestamp'].dt.weekday
    test['month'] = test['timestamp'].dt.month

test[feature_columns] = test[feature_columns].fillna(0)
X_test = test[feature_columns]

# Make predictions (convert back from log scale)
predictions = model.predict(X_test, num_iteration=model.best_iteration)
predictions = np.expm1(predictions)  # undo log1p

# Create submission file with correct 'id' column
submission = pd.DataFrame({'id': test['row_id'], 'meter_reading': predictions})

# Ensure no duplicate IDs
submission = submission.drop_duplicates(subset=['id'])

submission.to_csv('submission.csv', index=False)
print("Submission file 'submission.csv' created successfully with unique 'id' column.")

import pandas as pd

# Example data - change these columns and data as needed
data = {
    'id': [1, 2, 3],
    'prediction': ['yes', 'no', 'yes']
}

# Create a DataFrame
df = pd.DataFrame(data)

# Save to CSV without row indices
df.to_csv('submission.csv', index=False)

print("submission.csv has been created successfully.")

