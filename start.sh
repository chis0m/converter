# sudo docker build -t converter:latest .
sudo docker stop $(docker ps -a -q) || true && sudo docker rm $(docker ps -a -q) || true
sudo docker run --rm -v  $(pwd):/app -d -p 5000:5000 --name convert converter

# script to run container endlessly and debug the exiting container
# sudo docker run -v  $(pwd):/app -d -p 5000:5000 --name con converter /bin/sh -c "while true; do sleep 2; df -h; done"