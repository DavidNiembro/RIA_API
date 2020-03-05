1. Cloner le répertoire GitHub 

   ```
   git clone https://github.com/DavidNiembro/RIA_API.git
   ```

2. Se rendre dans dossier 

   ```
   cd RIA_API
   ```

3. Installer les dépendances

   ```
   npm install 
   ```

4. Modifier le fichier `configExemple.json` avec les accès Amazon 

5. Lancer ensuite le serveur node js

   ```
   node index.js
   ```



#### Générer la documentation 

1. Installation de ESDoc 

   ```bash
   npm install --save-dev esdoc esdoc-standard-plugin
   ```

2. Création d'un fichier .esdoc.json à la racine du projet

   ```bash
   touch .esdoc.json 
   nano .esdoc.json 
   ```

   1. Contenu du fichier 

   ```bash
   {
     "source": "./src",
     "destination": "./docs",
     "plugins": [
       {"name": "esdoc-standard-plugin"}
     ]
   }
   ```

3. Génération de la documentation 

   ```bash
   ./node_modules/.bin/esdoc
   ```

Link : http://52.28.87.45/?bucket=aws.rekognition.actualit.info&filename=Emirates-A380.jpg
Link : http://localhost:2000/api/imagerecognition?bucket=aws.rekognition.actualit.info&filename=emiratesa380.jpg
