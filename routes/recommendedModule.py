import pandas as pd
import numpy as np
from pymongo import MongoClient
import schedule
import time
def recommendations():
    # Define the connection and collection names
    client = MongoClient('you db conn here')
    cart_collection_name = 'carts'
    product_collection_name = 'products'
    recommended_collection_name = 'recommendedproducts'

    # Connect to the database and get the cart and product collections
    db = client['test']
    cart_collection = db[cart_collection_name]
    product_collection = db[product_collection_name]

    # Get the cart and product documents and convert them to dataframes
    cart_documents = cart_collection.find()
    product_documents = product_collection.find()
    product_df = pd.DataFrame(product_documents)

    # Extract product ids from the cart and create the binary matrix
    cart_df = pd.DataFrame(cart_documents)
    cart_features = cart_df[['cartItems']]
    recommended_prod= db['recommendedproducts']
    recommended_prod_doc =  recommended_prod.find()
    docsss= pd.DataFrame( recommended_prod_doc)

    print(docsss)
    cart_item_ids = cart_features['cartItems'].apply(lambda x: [item['id'] for sublist in x for item in sublist])
    product_features = product_df[['id']]
    product_ids = product_df['id'].unique()
    matrix = np.zeros((len(cart_item_ids), len(product_ids)))
    for i, cart in enumerate(cart_item_ids):
        for j, product_id in enumerate(product_ids):
            if product_id in cart:
                matrix[i, j] = 1
    
    # Get the present product IDs and filter the product dataframe to get the present products
    present_products_indices = np.where(matrix == 1)[1]
    present_products_ids = product_ids[present_products_indices]
    present_products_df = product_df[product_df['id'].isin(present_products_ids)]

    # Insert the present products into the recommended products collection
    recommended_collection = db[recommended_collection_name]
    # recommended_collection.delete_many({})  
    # Clear the existing recommendations
    recommended_products = present_products_df.to_dict('records')
    existing_doc = recommended_collection.find_one({})
    if existing_doc is None:  # No document exists in the collection
        recommended_collection.insert_one({
            "recommendedProducts": recommended_products
        })
    else:
        recommended_collection.update_one(
            {},
            {"$set": {"recommendedProducts": recommended_products}},
           upsert=True
        )
    print("hello i am printing")
def job():
    recommendations()

schedule.every(1).minute.do(job)

while True:
    schedule.run_pending()
    time.sleep(1)