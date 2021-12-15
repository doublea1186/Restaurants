import bcrypt
from datetime import date
import geocoder
import pymysql
import re
from flask import make_response, request, session, render_template, redirect, url_for, abort, jsonify


class LoginHandler:
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

    def login_route(self):
        data = request.args

        if 'username' in data and 'password' in data:
            username = data.get('username')
            password = data.get('password')
            db = self.create_connection()
            with db:
                with db.cursor() as cursor:
                    query = 'SELECT * FROM User WHERE username = "{}"'.format(username)
                    cursor.execute(query)
                    
                    account = cursor.fetchone()
                    if account and bcrypt.checkpw(password.encode('utf8'), account['password'].encode('utf8')):
                        session['loggedin'] = True
                        session['id'] = account['email']
                        session['username'] = account['username']

                        return jsonify({
                            "username": username,
                            "password": password
                        })
                    else:
                        response = jsonify({'message': 'username or password is incorrect'})
                        response.status_code = 404
                        return response
        else:
            response = jsonify({'message': 'username or password is incorrect'})
            response.status_code = 404
            return response

    def logout_route(self):
        session.pop('loggedin', None)
        session.pop('id', None)
        session.pop('username', None)
        return redirect(url_for('login'))

    def register_route(self):
        data = request.args
        msg = ''
        if 'username' in data and 'password' in data and 'email' in data:
            username = data.get('username')
            password = data.get('password')
            password = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt()).decode('utf8')
            email = data.get('email')
            creation_date = date.today().strftime("%Y-%m-%d")
            city = geocoder.ip('me').city
            db = self.create_connection()
            cursor = db.cursor()
            query = 'SELECT * FROM User WHERE username = "{}" or email = "{}" '.format(username, email)
            cursor.execute(query)
            account = cursor.fetchone()
            if account:
                msg = 'Account already exists !'
                response = jsonify({'message': msg})
                response.status_code = 404
                return response
            elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
                msg = 'Invalid email address !'
                response = jsonify({'message': msg})
                response.status_code = 404
                return response
            elif not re.match(r'[A-Za-z0-9]+', username):
                msg = 'Username must contain only characters and numbers !'
                response = jsonify({'message': msg})
                response.status_code = 404
                return response
            elif not username or not password or not email:
                msg = 'Please fill out the form !'
                response = jsonify({'message': msg})
                response.status_code = 404
                return response
            else:
                query = 'INSERT INTO User VALUES ("{}", "{}", "{}", str_to_date("{}", "%Y-%m-%d"), "{}")' \
                    .format(username, email, password, creation_date, city)
                print(query)
                cursor.execute(query)
                db.commit()
                msg = 'You have successfully registered !'
                response = jsonify({'message': msg})
                response.status_code = 200
                return response
        else:
            msg = 'Please fill out the form !'
            response = jsonify({'message': msg})
            response.status_code = 404
            return response

    def home_handler(self):
        if 'loggedin' in session:
            return render_template('home.html', username=session['username'])
        return redirect(url_for('login'))