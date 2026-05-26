from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
import pymongo
import certifi

app = Flask(__name__)

uri = "mongodb+srv://kuchnycasam_db_user:FgypT6fruZJaSe0d@cluster0.aa0e77m.mongodb.net/?appName=Cluster0"
client = pymongo.MongoClient(uri, tlsCAFile=certifi.where())
db = client['kuchnycasam_db']
cart_collection = db['cart_items']




@app.route('/')
def home():
    return render_template('index.html')

# api to add item to cart from frontend (create or update quantity if item already exists)
@app.route('/cart', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    existing_item = cart_collection.find_one({"id": data["id"]})

    if existing_item:
        cart_collection.update_one({"id": data["id"]}, {"$inc": {"quantity": 1}})
    else:
        data["quantity"] = 1
        cart_collection.insert_one(data)
    return jsonify({"message": "Item added to cart"})

# get all items in cart (Read ALL)
@app.route('/cart', methods=['GET'])
def get_cart():
    cart_items = list(cart_collection.find({}, {"_id": 0}))
    return jsonify(cart_items)

# update quantity of item in cart (update)
@app.route('/cart/<int:item_id>', methods =['PUT'])
def update_cart(item_id):
    data = request.get_json()
    cart_collection.update_one({"id": item_id}, {"$set": {"quantity": data["quantity"]}})
    return jsonify({"message": "Cart updated"})

# delete item from cart (delete)    
@app.route('/cart/<int:item_id>', methods=['DELETE'])
def delete_from_cart(item_id):
    cart_collection.delete_one({"id": item_id})
    return jsonify({"message": "Item deleted from cart"}), 200

# registration route
@app.route('/register', methods=['GET''POST'])
def register():
   if request.method == 'POST':
       # handle registration logic here
       username=request.form['username']
       email=request.form['email']
       password=request.form['password']

       existing_user = db.users.find_one({"email": email})
       if existing_user:
           return jsonify({"message": "User already exists"}), 400
       return jsonify({"message": "User registered successfully"})

if __name__ == '__main__':
    app.run(debug=True)

