import bcrypt
from datetime import date
import geocoder
import pymysql
import re
import json
from flask import make_response, request, session, render_template, redirect, url_for, jsonify


class LikedRestaurantHandler:
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

    def likedRestaurants_route(self):
        if request.method == "GET":
            username = request.args["username"]
            db = self.create_connection()
            with db:
                with db.cursor() as cursor:
                    query = """SELECT R.name, Likes.likes, R.address, R.borough, R.cuisine, R.critical_flag, R.seating_interest,
                    R.phone, R.qualify_alcohol, R.latitude, R.longitude, R.identify, I.grade, I.inspection_date FROM LikedRestaurants LR
                    JOIN (
                    SELECT name, address, SUM(is_liked) AS likes FROM LikedRestaurants
                    GROUP BY name, address
                    ) Likes ON LR.name = Likes.name and LR.address = Likes.address
                    JOIN User U on LR.username = U.username
                    JOIN Restaurant R on LR.name = R.name and LR.address = R.address
                    JOIN InspectionScores I ON R.name = I.name
                    WHERE U.username LIKE '{}'
                    AND LR.is_liked = true
                    """.format(username)
                    cursor.execute(query)
                    data = cursor.fetchall()
                    return jsonify(data)
        return pymysql.NULL

    def dislikedRestaurants_route(self):
        if request.method == "GET":
            print("disliked call")  
            username = request.args["username"]
            db = self.create_connection()
            with db:
                with db.cursor() as cursor:
                    query = """
                    SELECT R.name, Likes.likes, R.address, R.borough, R.cuisine, R.critical_flag, R.seating_interest,
                    R.phone, R.qualify_alcohol, R.latitude, R.longitude, R.identify, I.grade, I.inspection_date FROM LikedRestaurants LR
                    JOIN (
                    SELECT name, address, SUM(is_liked) AS likes FROM LikedRestaurants
                    GROUP BY name, address
                    ) Likes ON LR.name = Likes.name and LR.address = Likes.address
                    JOIN User U on LR.username = U.username
                    JOIN Restaurant R on LR.name = R.name and LR.address = R.address
                    JOIN InspectionScores I ON R.name = I.name
                    WHERE U.username LIKE '{}'
                    AND LR.is_liked = -1
                    """.format(username)
                    cursor.execute(query)
                    data = cursor.fetchall()
                    return jsonify(data)
        return pymysql.NULL



        

    