import sys
import joblib
import numpy as np


_, product_name, company_name, product_type, base_price, days_to_expiry, inventory, demand = sys.argv

model = joblib.load("model.pkl")
product_encoder = joblib.load("product_encoder.pkl")
company_encoder = joblib.load("company_encoder.pkl")
category_encoder = joblib.load("category_encoder.pkl")


encoded_product = product_encoder.transform([product_name])[0]
encoded_company = company_encoder.transform([company_name])[0]
encoded_category = category_encoder.transform([product_type])[0]


input_array = np.array([[encoded_product, encoded_company, encoded_category,
                         float(base_price), int(days_to_expiry),
                         int(inventory), int(demand)]])


predicted_price = model.predict(input_array)[0]
print(round(predicted_price, 2))
