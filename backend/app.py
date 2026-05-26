from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
import pymongo
import certifi
import os
from dotenv import load_dotenv
from bson import ObjectId

app = Flask(__name__)
load_dotenv()
CORS(app)

# JWT config
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET", "supersecretkey")
jwt = JWTManager(app)

# MongoDB connection
uri = os.getenv("MONGO_URI")
client = pymongo.MongoClient(uri, tlsCAFile=certifi.where())
db = client[os.getenv("DB_NAME")]

# collections
cart_collection = db['cart_items']
users_collection = db['users']
products_collection = db['products']

# PRODUCTS 

# get all products (with optional search)
@app.route('/api/products', methods=['GET'])
def get_products():
    search = request.args.get('search', '')
    if search:
        products = list(products_collection.find(
            {"name": {"$regex": search, "$options": "i"}},
            {"_id": 0}
        ))
    else:
        products = list(products_collection.find({}, {"_id": 0}))
    return jsonify(products)

# CART 

# add item to cart
@app.route('/api/cart', methods=['POST'])
@jwt_required()
def add_to_cart():
    user_id = get_jwt_identity()
    data = request.get_json()
    existing_item = cart_collection.find_one({
        "product_id": data["product_id"],
        "user_id": user_id
    })
    if existing_item:
        cart_collection.update_one(
            {"product_id": data["product_id"], "user_id": user_id},
            {"$inc": {"quantity": 1}}
        )
    else:
        cart_collection.insert_one({
            "user_id": user_id,
            "product_id": data["product_id"],
            "name": data["name"],
            "price": data["price"],
            "image": data["image"],
            "quantity": 1
        })
    return jsonify({"message": "Item added to cart"})

# get cart for logged in user
@app.route('/api/cart', methods=['GET'])
@jwt_required()
def get_cart():
    user_id = get_jwt_identity()
    cart_items = list(cart_collection.find(
        {"user_id": user_id},
        {"_id": 0}
    ))
    return jsonify(cart_items)

# update quantity
@app.route('/api/cart/<int:product_id>', methods=['PUT'])
@jwt_required()
def update_cart(product_id):
    user_id = get_jwt_identity()
    data = request.get_json()
    cart_collection.update_one(
        {"product_id": product_id, "user_id": user_id},
        {"$set": {"quantity": data["quantity"]}}
    )
    return jsonify({"message": "Cart updated"})

# delete item from cart
@app.route('/api/cart/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_from_cart(product_id):
    user_id = get_jwt_identity()
    cart_collection.delete_one({
        "product_id": product_id,
        "user_id": user_id
    })
    return jsonify({"message": "Item deleted from cart"})

# AUTH 

# register
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    existing_user = users_collection.find_one({"email": data["email"]})
    if existing_user:
        return jsonify({"message": "User already exists"}), 400
    hashed_password = generate_password_hash(data["password"])
    users_collection.insert_one({
        "username": data["username"],
        "email": data["email"],
        "password": hashed_password,
        "role": "user"
    })
    return jsonify({"message": "User registered successfully"}), 201

# login
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = users_collection.find_one({"email": data["email"]})
    if not user or not check_password_hash(user["password"], data["password"]):
        return jsonify({"message": "Invalid email or password"}), 401
    access_token = create_access_token(identity=str(user["_id"]))
    return jsonify({
        "token": access_token,
        "username": user["username"],
        "role": user["role"]
    })

# ADMIN

# admin — get all users carts
@app.route('/api/admin/carts', methods=['GET'])
@jwt_required()
def get_all_carts():
    user_id = get_jwt_identity()
    user = users_collection.find_one({"_id": ObjectId(user_id)})
    if not user or user.get("role") != "admin":
        return jsonify({"message": "Unauthorized"}), 403
    all_carts = list(cart_collection.find({}, {"_id": 0}))
    return jsonify(all_carts)

if __name__ == '__main__':
    app.run(debug=True)