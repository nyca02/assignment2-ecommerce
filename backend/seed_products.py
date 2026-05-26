import pymongo
import certifi
import os
from dotenv import load_dotenv

load_dotenv()

uri = os.getenv("MONGO_URI")
client = pymongo.MongoClient(uri, tlsCAFile=certifi.where())
db = client[os.getenv("DB_NAME")]

products_collection = db['products']

# clear existing products first
products_collection.delete_many({})

products = [
    {
        "id": 1,
        "name": "1025 Dokdo Cleanser - 150ml",
        "price": 19.99,
        "image": "/static/images/Cleanser.jpg",
        "category": "cleanser",
        "description": "A gentle hydrating cleanser"
    },
    {
        "id": 2,
        "name": "1025 Dokdo Toner - 200ml",
        "price": 24.99,
        "image": "/static/images/Dokdo Toner.jpg",
        "category": "toner",
        "description": "A refreshing hydrating toner"
    },
    {
        "id": 3,
        "name": "1025 Dokdo Serum - 50ml",
        "price": 29.99,
        "image": "/static/images/Dokdo Serum.jpg",
        "category": "serum",
        "description": "A concentrated hydrating serum"
    },
    {
        "id": 4,
        "name": "1025 Dokdo Cream - 50ml",
        "price": 34.99,
        "image": "/static/images/Dokdo Cream.jpg",
        "category": "cream",
        "description": "A rich moisturizing cream"
    },
    {
        "id": 5,
        "name": "1025 Dokdo Cleansing Oil - 100ml",
        "price": 24.99,
        "image": "/static/images/cleansingoil.jpg",
        "category": "cleanser",
        "description": "A gentle cleansing oil"
    },
    {
        "id": 6,
        "name": "1025 Dokdo Moisturizing Eye Cream - 30ml",
        "price": 29.99,
        "image": "/static/images/eyecream.jpg",
        "category": "cream",
        "description": "A hydrating eye cream"
    },
    {
        "id": 7,
        "name": "1025 Dokdo Moisturizing Cleansing Balm - 100ml",
        "price": 24.99,
        "image": "/static/images/cleansingbalm.jpg",
        "category": "cleanser",
        "description": "A nourishing cleansing balm"
    },
    {
        "id": 8,
        "name": "1025 Dokdo Cleansing Foam - 100ml",
        "price": 24.99,
        "image": "/static/images/cleansingfoam.jpg",
        "category": "cleanser",
        "description": "A gentle cleansing foam"
    },
    {
        "id": 9,
        "name": "1025 Dokdo Moisturizing Sheet Mask",
        "price": 4.99,
        "image": "/static/images/mask.jpg",
        "category": "mask",
        "description": "A hydrating sheet mask"
    },
    {
        "id": 10,
        "name": "1025 Dokdo Cleansing Gel - 100ml",
        "price": 24.99,
        "image": "/static/images/cleansinggel.jpg",
        "category": "cleanser",
        "description": "A refreshing cleansing gel"
    },
    {
        "id": 11,
        "name": "1025 Dokdo Peeling Gel - 100ml",
        "price": 29.99,
        "image": "/static/images/peelinggel.jpg",
        "category": "cleanser",
        "description": "A gentle peeling gel"
    },
    {
        "id": 12,
        "name": "1025 Dokdo Moisturizing Sunscreen - 50ml",
        "price": 29.99,
        "image": "/static/images/sunscreen.jpg",
        "category": "sunscreen",
        "description": "A lightweight moisturizing sunscreen"
    }
]

products_collection.insert_many(products)
print(f" {len(products)} products inserted successfully!")