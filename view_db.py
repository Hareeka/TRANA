import sqlite3

# Use the full absolute path to your database file
conn = sqlite3.connect(r'C:\Users\harss\TRANA\trana.db')
cursor = conn.cursor()

cursor.execute('SELECT id, user_id, location, latitude, longitude, timestamp FROM alerts ORDER BY timestamp DESC')
rows = cursor.fetchall()

for row in rows:
    print(row)

conn.close()
