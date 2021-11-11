# HP du site web du CORP

Projet pour la page d'acceuil et la page d'informations du site web du CORP. Ces pages ont été dévelopées en utilisant [Gridsome](https://gridsome.org/), un framework pour générer des site statiques performants.

## Prérequis

### 1. Installer un IDE, [Visual Studio Code](https://code.visualstudio.com/)

### 2. Installer [Git](https://gitforwindows.org/)

### 3.  Installer la version LTS de [Node.js](https://nodejs.org/en/)

## Installer le projet

### 1. Installer la CLI Gridsome
`npm install --global @gridsome/cli`

### 2. Cloner le projet
`git clone https://github.com/zgmrvn/corp-gridsome.git corp-gridsome`

## Développement
Dans le répertoire du projet, exécuter cette commande

`gridsome develop`

Le site sera accessible à l'adresse `localhost:8080`.

La page d'acceuil correspond au fichier `src/pages/Index.vue`. La page d'informations correspond au fichier `src/pages/AboutUs.vue`, son contenu est parsé depuis le fichier `src/content/about-us.md`.

## Build
Pour générer les fichiers statiques des pages web, exécuter cette commande

`gridsome build`

Les fichiers seronts générés dans le dossier `dist`, à la racine du projet.
