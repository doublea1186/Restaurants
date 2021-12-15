import bcrypt
from datetime import date
import pymysql
from flask import make_response, jsonify

class MapHandler:
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

    def get_all_restaurants(self): 
            db = self.create_connection()
            with db:
                with db.cursor() as cursor:
                    query = """SELECT R.name, latitude, longitude
                    FROM Restaurant R
                    LEFT JOIN (SELECT name, grade FROM InspectionScores) I
                    ON R.name = I.name
                    WHERE grade = 'A'
                    LIMIT 1500"""
                    cursor.execute(query)
                    data = cursor.fetchall()
                    print(jsonify(data))
                    return jsonify(data)

    def add_restaurant(self, res, name, longitude, latitude):
        db = self.create_connection()
        with db:
            with db.cursor() as cursor:
                query = """INSERT INTO Restaurants(name, latitude, longitude)
                    VALUES ( %s, %s, %s )""".format(name, latitude, longitude)
                cursor.execute(query)
                data = cursor.fetchall()
                return data