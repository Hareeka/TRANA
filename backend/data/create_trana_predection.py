import pandas as pd
import os

# Make sure the directory exists
os.makedirs('./backend/data', exist_ok=True)


# Sample data for TRANA predictions
zone_ids = [101, 102, 103]
risk_scores = [0.85, 0.15, 0.52]

# Create DataFrame
df = pd.DataFrame({
    'zone_id': zone_ids,
    'risk_score': risk_scores
})

# Save to CSV (file will be created in the current directory)
csv_path = './backend/data/trana_predictions.csv'
df.to_csv(csv_path, index=False)
print(f"CSV file created at: {csv_path}")
