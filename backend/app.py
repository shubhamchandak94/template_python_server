__version__ = "0.1"

from flask import Flask
from flask import request
from flask import jsonify

app = Flask(__name__)

def bad_request(message):
    response = jsonify({'message': message})
    response.status_code = 400
    return response

@app.route("/")
def hello_world():
    return "Hello, World! You have reached the template website."

@app.route("/version")
def version():
    return jsonify({'version': __version__})

@app.route("/substring", methods=['POST'])
def substring():
    data = request.get_json()
    try:
        string = data["string"]
    except:
        return bad_request("Can't access string in request JSON.")
    try:
        start = int(data["start"])
    except:
        return bad_request("Can't access start in request JSON.")
    try:
        end = data["end"]
    except:
        return bad_request("Can't access end in request JSON.")
    
    if not ((0 <= start < len(string)) and (0 <= end <= len(string))):
        return bad_request('Incorrect start and/or end index')

    return jsonify({'substring': string[start:end]})
