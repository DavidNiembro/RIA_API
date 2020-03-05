Installation commonInstance + Déploiement API-AWS
1. Connexion SSH
 ssh -i P:/.ssh/[SSH KEY] [IP]
2. Update des sources
sudo apt update
3. Install Nginx
sudo apt-get install nginx -> install nginx
Vérifier l'installation

ps aux | grep nginx
Vérifier que le port 80 est ouvert

netstat -tulpn |grep :80
Pour vérifier si Nginx fonctionne correctement, ouvrez un navigateur et rentrez l'ip du serveur. vous devrez arriver sur la page d'accueil de Nginx

4. Run Nginx on startup
sudo systemctl enable nginx
5. Install NodeJS
cd ~
-sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt install nodejs
sudo apt install build-essential
6. Install PM2
sudo npm install pm2@latest -g
Launch PM2 on server boot

pm2 startup systemd
after the above command copy the last line outputed and run it

example:

sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u [user] --hp /home/[user]
save the config:

pm2 save
start the service:

sudo systemctl start pm2-sammy
7. Configure Nginx as a reverse proxy for NodeJS
Edit /etc/nginx/sites-availables/default or your site if you created a new one

server {
...
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
...
}
replace 3000 by the port you are using in your NodeJS App

8. Deploy api-AWS
Install git

apt install git 
pull repo

git clone https://github.com/DavidNiembro/RIA_API.git
Install dependencies and build

npm install
npm run build 
Run your app

pm2 start dis/index.js
Check if everything is working , open a browser and go to the ip of your server

9. Enable HTTPS
https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-nginx-in-ubuntu-16-04