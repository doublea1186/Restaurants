from flask import Flask
from flask.templating import render_template
from flask_wtf.csrf import CSRFProtect
from flask_cors import CORS  # comment this on deployment
from flask_caching import Cache
from datetime import date
import pymysql
from Handlers.LoginHandler import LoginHandler
from Handlers.YelpHandler import YelpHandler
from Handlers.RestaurantHandler import RestaurantHandler
from Handlers.CovidSafetyHandler import CovidSafetyHandler
from Handlers.MapHandler import MapHandler
from Handlers.LikedRestaurantsHandler import LikedRestaurantHandler
from Handlers.RecommendedHandler import RecommendedHandler


def create_app():
    app = Flask(__name__)
    csrf = CSRFProtect()
    app.secret_key = 'super secret key'
    csrf.init_app(app)
    app.config.update(
        SESSION_COOKIE_SECURE=True,
        SESSION_COOKIE_HTTPONLY=True,
        SESSION_COOKIE_SAMESITE='Lax',
    )
    cache = Cache(app, config={'CACHE_TYPE': 'simple'})
    CORS(app)
    return app, cache


api_key = 'xpI0mrYcpaLv9R_-e5Kk9Vt0jIowGu_9jTPZ4ohga9JaZKXW05iGIom3hHHum4yDYQXqPKuR74RpBmQCNjpgiIUR78S71ExkKXWeP3czk6O1TqqFoqliir_TGQR6YXYx'
app, cache = create_app()
login_handler = LoginHandler()
yelp_handler = YelpHandler(api_key)
restaurant_handler = RestaurantHandler()
covidsafety_handler = CovidSafetyHandler()
map_handler = MapHandler()
likedRestaurantHandler = LikedRestaurantHandler()
recommendedHandler = RecommendedHandler()


@cache.cached(50)
@app.route('/')
def hello_world():
    return date.today().strftime("%m/%d/%Y")

@cache.cached(50)
@app.route('/recommendation')
def recommend():
    return date.today().strftime("%d/%m/%Y")

@cache.cached(50)
@app.route('/login', methods=['GET', 'POST'])
def login():
    return login_handler.login_route()

@cache.cached(50)
@app.route('/restaurant', methods=['GET', 'POST'])
def restaurant():
    return restaurant_handler.restaurant_route()

@cache.cached(50)
@app.route('/restaurant/liked', methods=['GET', 'POST'])
def restaurant_liked():
    return restaurant_handler.restaurantupdatelikes_route()

@cache.cached(50)
@app.route('/covidsafety', methods=['GET', 'POST'])
def covidsafety():
    return covidsafety_handler.covidsafety_route()

@cache.cached(50)
@app.route('/logout')
def logout():
    return login_handler.logout_route()

@cache.cached(50)
@app.route('/register', methods=['GET', 'POST'])
def register():
    return login_handler.register_route()

@cache.cached(50)
@app.route('/yelp/search')
def yelp_search():
    return yelp_handler.business_search()

@cache.cached(50)
@app.route('/yelp/details')
def yelp_details():
    return yelp_handler.business_details()

@cache.cached(50)
@app.route('/yelp/reviews')
def yelp_reviews():
    return yelp_handler.business_reviews()

@cache.cached(50)
@app.route('/pythonlogin/home')
def home():
    login_handler.home_route()

@cache.cached(50)
@app.route('/map', methods=['GET'])
def load_map():
    return map_handler.get_all_restaurants()

@app.route('/liked', methods=['GET', 'POST'])
def liked():
    return likedRestaurantHandler.likedRestaurants_route()

@cache.cached(50)
@app.route('/disliked', methods=['GET', 'POST'])
def disliked():
    return likedRestaurantHandler.dislikedRestaurants_route()

@cache.cached(50)
@app.route('/recommended', methods=['GET', 'POST'])
def recommended():
    return recommendedHandler.recommended_route()

if __name__ == '__main__':
    app.run()