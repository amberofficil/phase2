
# create_tables.py
from sqlmodel import SQLModel
from database.engine import engine
from models.user import User
from models.task import Task

print("Creating tables...")
SQLModel.metadata.create_all(engine)
print("Tables created successfully!")

