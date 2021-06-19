Running the server using docker based on the instructions [here](https://github.com/ivanpanshin/flask_gunicorn_nginx_docker) and [here](https://towardsdatascience.com/how-to-deploy-ml-models-using-flask-gunicorn-nginx-docker-9b32055b3d0). The actual backend Python code is in [`flask_app/app.py`](flask_app/app.py) and any additional requirements should be added to [`flask_app/requirements.txt`](flask_app/requirements.txt). You might also want to update the number of `worker_processes` in [`nginx/nginx.conf`](nginx/nginx.conf) and in the command in [`docker-compose.yml`](docker-compose.yml).

I tested it on a Google Compute Engine with Debian linux (with http enabled in firewall). In addition, I tested on my MacBook with localhost.

Docker installation instructions follow:

— [Docker installation](https://docs.docker.com/engine/install/ubuntu/)

— [Make Docker run without root](https://docs.docker.com/engine/install/linux-postinstall/)

— [Docker Compose installation](https://docs.docker.com/compose/install/)

Once Docker is installed, simply run 
```
sudo bash run_docker.sh 
```

You can test using the provided frontend after changing the backend address or using curl (http://35.192.143.7 is the external IP address for my Google Compute Engine instance):

GET
```
curl http://35.192.143.7/version
```
Response is
```
{"version":"0.1"}
```
POST

curl -X POST \
  http://35.192.143.7/substring \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{"string": "Shubham Chandak", "start": 0, "end": 7}'
```
Response is
```
{"substring":"Shubham"}
```
