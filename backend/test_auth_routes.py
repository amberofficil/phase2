try:
    # Test importing the auth routes specifically
    from routes import auth
    print("Auth routes imported successfully")
    
    # Check if the register function exists
    register_func = getattr(auth, 'register_user', None)
    if register_func:
        print("register_user function exists")
    else:
        print("register_user function NOT found")
        
    # Check the router
    router = auth.router
    print(f"Router exists with {len(router.routes)} routes")
    
    for route in router.routes:
        print(f"Route: {route.path} - {route.methods}")
        
except Exception as e:
    import traceback
    print(f"Error with auth routes: {e}")
    print("Full traceback:")
    traceback.print_exc()