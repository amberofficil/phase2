import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

from config.settings import settings
print(f"Database URL from settings: {settings.neon_db_url}")

from database.engine import engine
print(f"Engine URL: {engine.url}")

import os
db_path = "test.db"
if os.path.exists(db_path):
    print(f"Database file {db_path} exists")
    print(f"Size: {os.path.getsize(db_path)} bytes")
else:
    print(f"Database file {db_path} does NOT exist in current directory")

# Check if it's in a different location
full_path = os.path.abspath(db_path)
print(f"Full path would be: {full_path}")