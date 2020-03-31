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

1. Récupérer tous les paquets mis dans la `package.json`

   ```
   yarn install (ou yarn)
   ```

2. Génération de la documentation dans le dossier `docs/`

   ```
   documentation build src/models/** -f html -o docs/
   ```

3. Se rendre ensuite dans le dossier généré `docs/`
4. Double cliquez sur `index.html`
   
   1. Ou [cliquez ici](./docs/index.html)

Link : http://52.28.87.45/?bucket=aws.rekognition.actualit.info&filename=Emirates-A380.jpg
Link : http://localhost:2000/api/imagerecognition?bucket=aws.rekognition.actualit.info&filename=emiratesa380.jpg
