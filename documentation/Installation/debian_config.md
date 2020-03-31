## Installation 

### Common Instance + Déploiement API-AWS

1. Connexion SSH
 
 ```bash
 ssh -i P:/.ssh/[SSH KEY] [IP]
 ```
 
2. Mettre à jour les sources

  ```bash
  sudo apt update
  ```

3. Installer Nginx

  ```bash
  sudo apt-get install nginx
  ```

  1. Vérifier l'installation

      ```bash
      ps aux | grep nginx
      ```

  2. Vérifier que le port 80 est ouvert

      ```bash
      netstat -tulpn | grep :80
      ```

      Pour vérifier si Nginx fonctionne correctement, ouvrez un navigateur et entrez l'ip du serveur. Vous devriez arriver sur la page d'accueil de Nginx.

4. Exécuter Nginx au lancement du serveur

  ```bash
  sudo systemctl enable nginx
  ```

5. Installer NodeJS

  ```bash
  cd ~
  -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
  sudo bash nodesource_setup.sh
  sudo apt install nodejs
  sudo apt install build-essential
  ```

6. Installer PM2

  ```bash
  sudo npm install pm2@latest -g
  ```

7. Lancer PM2 au lancement du serveur

   ```bash
   pm2 startup systemd
   ```

   1. Après le lancement de cette commande copiez, collez la commande ci-dessous

      ```bash
      sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u [user] --hp /home/[user]
      ```

   2. Sauver la configuration

      ```bash
      pm2 save
      ```

   3. Lancer le service

      ```bash
      sudo systemctl start pm2-sammy
      ```

8. Configurer Nginx comme proxy inverse pour NodeJS

   1. Editer `/etc/nginx/sites-availables/default` ou le fichier de configuration pour votre site si vous en avez un

      ```bash
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
      ```

   2. Remplacer `3000` par le port que vous utilisez dans votre app NodeJS 

9. Deployer `api-AWS`

   1. Installer `git`

      ```bash
      apt install git 
      ```

   2. Récupérer le répertoire

      ```bash
      git clone https://github.com/DavidNiembro/RIA_API.git
      ```

   3. Installer toutes les dépendances pour `build` l'application

      ```bash
      npm install
      npm run build 
      ```

10. Lancer votre application

    ```bash
    pm2 start dis/index.js
    ```

11. Contrôler que tout fonctionne normalement, ouvrez un navigateur et allez sur l'IP de votre serveur

12. [Permettre le HTTPS](https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-nginx-in-ubuntu-16-04)