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
