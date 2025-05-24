def format_user(doc):
    return {
        "id": str(doc["_id"]),
        "firstName": doc["firstName"],
        "lastName": doc["lastName"],
        "email": doc["email"],
    }
