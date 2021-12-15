import bcrypt
from datetime import date
import geocoder
import pymysql
import re
import json
from flask import make_response, request, session, render_template, redirect, url_for, jsonify


class RestaurantHandler:
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
    
    def restaurantupdatelikes_route(self):
        if request.method == "GET":
            name = request.args['name']
            address = request.args['address']
            username = request.args["username"]
            restaurant_id = request.args["restaurant_id"]
            likeOrDislike = request.args["likeOrDislike"]
            db = self.create_connection()
            with db:
                with db.cursor() as cursor:
                    query = 'SELECT * FROM LikedRestaurants WHERE name = "{}" AND username = "{}" AND address = "{}"'.format(name, username, address)
                    cursor.execute(query)
                    entry = cursor.fetchone()
                    if entry:
                        query = """UPDATE LikedRestaurants SET is_liked = {} 
                        WHERE name = "{}" AND username = ("{}") AND address = ("{}")""".format(likeOrDislike, name, username, address)
                        cursor.execute(query)
                        db.commit()
                        msg = 'You have successfully updated liked!'
                        response = jsonify({'message': msg})
                        response.status_code = 200
                        return response
                    else:
                        query = """INSERT INTO LikedRestaurants VALUES 
                        ("{}", "{}", "{}", "{}", "{}")""".format(name, address, username, restaurant_id, likeOrDislike)
                        cursor.execute(query)
                        db.commit()
                        msg = 'You have successfully liked!'
                        response = jsonify({'message': msg})
                        response.status_code = 200
                        return response
        return pymysql.NULL

    #endpoint for search
    def restaurant_route(self):
        if request.method == "GET":
            cuisine = request.args['cuisine']
            borough = request.args['borough']
            seatingInterest = request.args['seatingInterest']
            if (request.args['criticalFlag']) :
                criticalFlag = request.args['criticalFlag']
            else :
                criticalFlag = 'critical'
            qualifyAlcohol = request.args['qualifyAlcohol']
            if (request.args['grade']) :
                grade = request.args['grade']
            else :
                grade = 'a'
            db = self.create_connection()
            with db:
                with db.cursor() as cursor:
                    print("before the query")
                    query = """SELECT R.name, R.address, LR.likes, R.borough, R.cuisine, R.critical_flag, R.seating_interest, 
                    R.phone, R.qualify_alcohol, R.latitude, R.longitude, R.identify, I.grade, I.inspection_date 
                    FROM Restaurant R 
                    LEFT JOIN InspectionScores I ON R.name = I.name 
                    LEFT JOIN (
                        SELECT name, address, SUM(is_liked) AS likes FROM LikedRestaurants
                        GROUP BY name, address
                    ) LR ON R.name = LR.name and R.address = LR.address
                    WHERE cuisine LIKE '%{}%' AND borough LIKE '%{}%' AND seating_interest LIKE '%{}%' 
                    AND critical_flag = '{}' AND qualify_alcohol LIKE '%{}%' 
                    AND grade = '{}'""".format(cuisine, borough, seatingInterest, criticalFlag, qualifyAlcohol, grade)
                    cursor.execute(query)
                    data = cursor.fetchall()
                    print(jsonify(data))
                    return jsonify(data)
        return pymysql.NULL
