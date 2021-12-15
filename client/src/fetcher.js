import config from './config.json'

const getYelpResults = async (term, location, openNow, price) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/yelp/search?term=${term}&location=${location}&open_now=${openNow}&price=${price}`, {
        method: 'GET',
    })
    if (res.status != 200) {
        return 'error'
    } else {
        return res.json()
    }
}

const getLogin = async(username, password) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/login?username=${username}&password=${password}`, {
        method: 'GET',
    })
    if (res.status !== 200) {
         return {
            msg: "username and/or password is incorrect",
            isLoggedIn: false
        }

    } else {
        return {isLoggedIn: true, results: res.json()}
    }
}

const getYelpRestaurant = async(id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/yelp/details?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getYelpReviews = async(id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/yelp/reviews?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getRestaurants = async(cuisine, borough, seatingInterest, criticalFlag, qualifyAlcohol, grade) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/restaurant?cuisine=${cuisine}&borough=${borough}&seatingInterest=${seatingInterest}&criticalFlag=${criticalFlag}&qualifyAlcohol=${qualifyAlcohol}&grade=${grade}`, {
        method: 'GET',
    })
    return res.json()
}

const updateLiked = async(name, address, username, restaurant_id, likeOrDislike) => {
    name = encodeURIComponent(name)
    var res = await fetch(`http://${config.server_host}:${config.server_port}/restaurant/liked?name=${name}&address=${address}&username=${username}&restaurant_id=${restaurant_id}&likeOrDislike=${likeOrDislike}`, {
        method: 'GET',
    })
    return res.json()
}

const getLiked = async(username) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/liked?username=${username}`, {
        method: 'GET',
    })
    return res.json()
}

const getDisliked = async(username) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/disliked?username=${username}`, {
        method: 'GET',
    })
    return res.json()
}


const getRecommended = async(username) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/recommended?username=${username}`, {
        method: 'GET',
    })
    return res.json()
}
const getRegister = async(username, password, email) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/register?username=${username}&password=${password}&email=${email}`, {
        method: 'GET',
    })
    console.log(res.status)
    if (res.status !== 200) {
         return {
            isRegistered: false,
            results: res.json()
        }
    } else {
        return {isRegistered: true, results:res.json()}
    }
}

const getMapRestaurants = async() => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/map`, {
        method: 'GET',
    })
    if (res.status !== 200) {
         return {
            msg: "Cannot load Restaurants!",
         }
    } else {
        return {results:res.json()}
    }
}

const addRestaurant = async(name, lat, long) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/map/add?name=${name}&longitude=${long}&latitude=${lat}`, {
        method: 'POST',
    })
    if (res.status !== 200) {
         return {
            msg: "Cannot add Restaurant!",
         }
    } else {
        return {msg: "Restaurant added! Go back to map."}
    }
}

export {
    getYelpResults,
    getYelpReviews,
    getLogin,
    getRegister,
    getRestaurants,
    getMapRestaurants,
    getLiked,
    getDisliked,
    getYelpRestaurant,
    updateLiked,
    getRecommended
}
