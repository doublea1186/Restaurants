import bcrypt
from datetime import date
import geocoder
import pymysql
import re
import json
from flask import make_response, request, session, render_template, redirect, url_for, jsonify


class RecommendedHandler:
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


    def recommended_route(self):
        if request.method == "GET":
            username = request.args["username"]
            db = self.create_connection()
            with db:
                with db.cursor() as cursor:
                    query = """SELECT R.name, R.address, LR.likes, R.borough, R.cuisine, R.critical_flag, R.seating_interest,
                        R.phone, R.qualify_alcohol, R.latitude, R.longitude, R.identify, I.grade, I.inspection_date FROM Restaurant R
                        LEFT JOIN InspectionScores I ON R.name = I.name
                        LEFT JOIN (
                        SELECT name, address, SUM(is_liked) AS likes FROM LikedRestaurants
                        GROUP BY name, address
                        ) LR ON R.name = LR.name and R.address = LR.address
                        WHERE EXISTS(
                        SELECT * FROM
                        (
                        SELECT DISTINCT name, address
                        FROM (
                        SELECT DISTINCT username
                        FROM (SELECT name, address
                        FROM LikedRestaurants
                        WHERE username = '{}') UserLR
                        JOIN LikedRestaurants LR ON UserLR.name = LR.name AND UserLR.address = LR.address
                        WHERE username <> '{}'
                        ) WhoLiked
                        JOIN LikedRestaurants REC ON WhoLiked.username = REC.username
                        ) R2 WHERE R.name = R2.name AND R.address = R2.address
                        )
                        ORDER BY likes DESC
                    """.format(username, username)
                    cursor.execute(query)
                    data = cursor.fetchall()
                    return jsonify(data)
        return pymysql.NULL
