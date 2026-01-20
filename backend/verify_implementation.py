# Verify that all required files exist in the implementation
import os

def verify_implementation():
    print("Verifying Todo Application Backend Implementation...")
    print("="*50)

    backend_dir = "backend"
    required_files = [
        "main.py",
        "requirements.txt",
        ".env.example",
        "README.md",
        "config/settings.py",
        "database/engine.py",
        "database/session.py",
        "models/base.py",
        "models/user.py",
        "models/task.py",
        "schemas/response.py",
        "schemas/task.py",
        "auth/jwt_handler.py",
        "routes/tasks.py",
        "utils/validators.py",
        "__init__.py",
        "config/__init__.py",
        "database/__init__.py",
        "models/__init__.py",
        "schemas/__init__.py",
        "auth/__init__.py",
        "routes/__init__.py",
        "utils/__init__.py",
        "test_main.py",
        "test_auth.py",
        "simple_test.py"
    ]

    missing_files = []
    existing_files = []

    for file in required_files:
        file_path = os.path.join(backend_dir, file)
        if os.path.exists(file_path):
            existing_files.append(file)
            print(f"[OK] {file}")
        else:
            missing_files.append(file)
            print(f"[MISSING] {file}")

    print("\n" + "="*50)
    print(f"Summary: {len(existing_files)} files found, {len(missing_files)} missing")

    if missing_files:
        print(f"Missing files: {missing_files}")
    else:
        print("All required files are present!")

    # Verify content of key files
    print("\nVerifying content of key files...")

    # Check main.py has FastAPI
    main_content = open(os.path.join(backend_dir, "main.py")).read()
    if "FastAPI" in main_content:
        print("[OK] main.py contains FastAPI application")
    else:
        print("[ERROR] main.py missing FastAPI application")

    # Check models exist properly
    user_content = open(os.path.join(backend_dir, "models/user.py")).read()
    if "SQLModel" in user_content and "table=True" in user_content:
        print("[OK] User model properly defined with SQLModel")
    else:
        print("[ERROR] User model not properly defined")

    task_content = open(os.path.join(backend_dir, "models/task.py")).read()
    if "SQLModel" in task_content and "table=True" in task_content:
        print("[OK] Task model properly defined with SQLModel")
    else:
        print("[ERROR] Task model not properly defined")

    # Check auth handler exists
    auth_content = open(os.path.join(backend_dir, "auth/jwt_handler.py")).read()
    if "decode_jwt" in auth_content and "get_current_user" in auth_content:
        print("[OK] JWT authentication handler properly implemented")
    else:
        print("[ERROR] JWT authentication handler not properly implemented")

    # Check task routes exist
    routes_content = open(os.path.join(backend_dir, "routes/tasks.py")).read()
    if "GET /api/tasks" in routes_content and "POST /api/tasks" in routes_content:
        print("[OK] Task management routes properly implemented")
    else:
        print("[ERROR] Task management routes not properly implemented")

    print("\nImplementation verification complete!")

if __name__ == "__main__":
    verify_implementation()