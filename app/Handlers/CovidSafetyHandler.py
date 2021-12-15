import bcrypt
from datetime import date
import geocoder
import pymysql
import re
from flask import make_response, request, session, render_template, redirect, url_for

class CovidSafetyHandler:
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

    #endpoint for search
    def covidsafety_route(self):
        if request.method == "POST":
            seating = request.form['seating']
            # search by author or book
            db = self.create_connection()
            with db:
                with db.cursor() as cursor:
                    #maybe have these queries have optional fields?
                    #add additional fields to query
                    query = "SELECT name FROM CovidSafety WHERE seating_interest LIKE '%{}%'".format(seating)
                    #query = 'SELECT * FROM CovidSafety'
                    cursor.execute(query)
                    data = cursor.fetchall()
                    return render_template('covid.html', data=data)
        return render_template('covid.html')