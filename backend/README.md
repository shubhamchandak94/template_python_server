
Prerequisites: 
- Git, Python 3 and pip should be installed (`sudo apt-get install git build-essential python3-pip`).
- Add any dependencies to requirements.txt (some already listed)
- If you want to use nginx, then it should be installed using on Linux as follows and the firewall should be set (based on [this page](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04)):
```
sudo apt-get update -y
sudo apt-get install nginx ufw -y
sudo ufw allow ssh
sudo ufw allow 'Nginx HTTP'
sudo ufw enable
```
You can check the status of the firewall by running:
```
sudo ufw status
```
and the output should look like:
```
Status: active
To                         Action      From
--                         ------      ----
Nginx HTTP                 ALLOW       Anywhere
Nginx HTTP (v6)            ALLOW       Anywhere (v6)
```

Step 1: create virtual environments and install dependencies (if the second command doesn't work, try `sudo apt install python3-venv`)
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

To allow other computers (on the network) to access the server, replace second line by
```
flask run -p 5000 -h 0.0.0.0
```
and replace `localhost` with the server address in step 4 (and in frontend).

In addition you might need to change the firewall settings to accept traffic.

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
Deploy using [Gunicorn](https://docs.gunicorn.org/en/latest/run.html)
```
gunicorn --workers 4 --bind :5000 app:app --log-level debug
```

You might need to change the firewall settings to accept traffic at the port.

Step 6:
Deploy using [Gunicorn and nginx](https://faun.pub/deploy-flask-app-with-nginx-using-gunicorn-7fda4f50066a)

Deactivate virtual environment:
```
deactivate
```

Look at the [`app.service`](app.service) file and update the following fields as relevant:
- Description
- User
- WorkingDirectory
- Environment
- ExecStart (change the path to gunicorn and the number of workers)

Next copy the file:
```
sudo cp app.service /etc/systemd/system/
``` 

Start Gunicorn service and enable it to start at boot:
```
sudo systemctl start app
sudo systemctl enable app
```
You should now see a file named `app.sock` in this directory.

Now we come to final step, configuring nginx to connect the web address to the socket.

Update the `nginx-app` file with the correct path to the sock file and copy it to:
```
sudo cp nginx-config /etc/nginx/sites-available/app
```
Now enable the site
```
sudo ln -s /etc/nginx/sites-available/app /etc/nginx/sites-enabled
```
Finally restart the nginx process with 
```
sudo systemctl restart nginx
```
And you are ready to go! Note that the port is now 80 which need not be specified because it is the default http port.

