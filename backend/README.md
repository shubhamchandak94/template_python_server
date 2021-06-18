
Prerequisites: 
- Python 3 should be installed.
- Add any dependencies to requirements.txt (some already listed)

Step 1: create virtual environments and install dependencies
```
pip3 install virtualenv
python3 -m venv backend_env
source backend_env/bin/activate
pip3 install -r requirements.txt
```

Step 3: run server as described in `app.py` on port 5000.
```
export FLASK_APP=app
flask run -p 5000
```
If the code is updated, you need to run the second command again. There are ways to auto-reload during development, see [this page](https://stackoverflow.com/questions/16344756/auto-reloading-python-flask-app-upon-code-changes).

To allow other computers on network to access the server, replace second line by
```
flask run -p 5000 -h 0.0.0.0
```
and replace `localhost` with the server address in step 4.

Step 4: test with curl

GET
```
curl localhost:5000/version
```
Response is
```
{"version":"0.1"}
```

POST
```
curl -X POST \
  localhost:5000/substring \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{"string": "Shubham Chandak", "start": 0, "end": 7}'
```

Response is
```
{"substring":"Shubham"}
```

Step 5:
Deploy using [uwsgi](https://uwsgi-docs.readthedocs.io/en/latest/WSGIquickstart.html#deploying-flask)
```
uwsgi --http-socket :5000 \
      --plugin python3 \
      --wsgi-file app.py \
      --callable app \
      -H backend_env \
      --master \
      --enable-threads
```