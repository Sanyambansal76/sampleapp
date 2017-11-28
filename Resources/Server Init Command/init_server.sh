sudo apt-get update
sudo apt-get install python-virtualenv
sudo apt-get install git

# Apache Settings
sudo apt-get install apache2
sudo apt-get install libapache2-mod-wsgi
sudo a2dismod autoindex
sudo a2enmod rewrite

sudo apt-get install libpq-dev python-dev
mkdir sampleapp
cd sampleapp
git clone https://github.com/Sanyambansal76/sampleapp.git
cd /home/ubuntu/sampleapp/
virtualenv venv
source venv/bin/activate
cd sampleapp
pip install -r requirements.txt
