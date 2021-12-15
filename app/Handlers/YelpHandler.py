import pandas as pd
import pymysql
from flask import make_response, request, session, render_template, redirect, url_for, jsonify
import requests
import json
from pandas.io.json import json_normalize


class YelpHandler:
    def __init__(self, api_key):
        self.headers = {'Authorization': 'Bearer %s' % api_key}

    def create_connection(self):
        db_user = 'CIS450550'
        db_password = 'CIS450550'
        db_host = 'restaurants.cftfvdzt8gl8.us-east-1.rds.amazonaws.com'
        db_name = 'RestaurantSearch'
        return pymysql.connect(host=db_host,
                               user=db_user,
                               password=db_password,
                               database=db_name,
                               cursorclass=pymysql.cursors.DictCursor)

    def xss_protection(self, template):
        response = make_response(template)
        response.headers['Content-Security-Policy'] = "default-src 'self'"
        return response

    def business_search(self):
        data = request.args
        term = data.get('term')
        location = data.get('location')
        open_now = data.get('open_now')

        if not data.get('price'):
            price = '1, 2, 3, 4'
        else:
            price = data.get('price')
            print(price)
            if price != '1' and price != '2' and price != '3' and price != '4' and price != '1,2,3,4':
                response = jsonify({'message': "You must specify price as either 1, 2, 3, 4"})
                response.status_code = 404
                return response

        if open_now:
            open_now = open_now.lower() == 'true'
        else:
            open_now = False

        if not term or not location:
            return "You must specify a term and location"
        else:
            url = 'https://api.yelp.com/v3/businesses/search'
            params = {'term': term,
                      'location': location,
                      'limit': 50,
                      'open_now': open_now,
                      'price': price}
        response = requests.get(url, headers=self.headers, params=params)
        parsed = json.loads(response.text)
        df = json_normalize(parsed['businesses'])
        df['distance'] = df['distance'].apply(lambda x: getMiles(x))
        df['location.display_address'] = df['location.display_address'].apply(lambda x: ' '.join(x))
        # df = df[df['name'].str.lower() == term]
        return json.dumps(json.loads(df.to_json(orient="records")))

    def business_details(self):
        url = 'https://api.yelp.com/v3/businesses/'
        data = request.args
        if not data.get('id'):
            return "Must provide business id"
        else:
            url += data.get('id')
            response = requests.get(url, headers=self.headers)
            parsed = json.loads(response.text)
            return parsed

    def business_reviews(self):
        url = 'https://api.yelp.com/v3/businesses/'
        data = request.args
        if not data.get('id'):
            return "Must provide business id"
        else:
            url += data.get('id') + '/reviews'
            response = requests.get(url, headers=self.headers)
            parsed = json.loads(response.text)
            return parsed

def getMiles(i):
    return i * 0.000621371192
