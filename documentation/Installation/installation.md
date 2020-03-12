# Installation des outils 
Pour ce projet 2 environnements ont été utilisés:
- MacOS X version 10.15.2
- Windows 10

Les paquets à installer:
- NodeJs v13.6.0
- yarn v1.21.1
- mocha v7.1.0

Editeur de code :
- VSCode v1.42.1

Les dépendences utilisées dans le projets
- aws-sdk : ^2.617.0,
- express : ^4.17.1


## Installation du projet

1. Cloner le projet dans le dossier voulu

    ```bash
    git clone https://github.com/DavidNiembro/RIA_API.git
    ```

2. Se rendre dans le projet et installer les dépendances

    ```bash
    cd RIA_API 
    yarn install
    ```

3. Lancer le serveur nodejs
    ```bash
    node ./index.js
    ```
## Utiliser l'API

Rendez-vous sur un navigateur avec le lien suivant 
```bash
http://localhost:2000/api/imagerecognition?bucket=NOM_DU_BUCKET&filename=NOM_DE_L_IMAGE
```

## Tests
Pour lancer les tests, installez mocha

```bash
npm install mocha 
```

Pour appeler les tests :

```bash
yarn test
```