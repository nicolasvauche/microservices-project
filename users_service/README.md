# Users Service

Users Service est un microservice développé avec **Node.js 20** et **SQLite**. Il fournit une API REST pour la gestion des utilisateurs et l'authentification, avec des fonctionnalités telles que l'inscription, la connexion, la gestion des profils et la suppression de compte.

## Fonctionnalités

- **Inscription d'un utilisateur** avec hachage sécurisé des mots de passe.
- **Connexion** avec génération de tokens JWT.
- **Affichage des informations personnelles** pour l'utilisateur connecté.
- **Modification des informations personnelles** (nom et email).
- **Suppression du compte utilisateur**.
- **Lister les utilisateurs** (sauf soi-même).

---

## Installation

### Prérequis

- **Node.js 20** ou version supérieure
- **npm** (Node Package Manager)
- **SQLite3**

### Étapes d'installation

1. **Cloner le dépôt**
    - Et entrer dans le dossier du projet :
      ```bash
      cd users_service
      ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. Configurer les variables d’environnement
   - Dupliquez le fichier `.env-sample` et renommez-le en `.env` à la racine du projet et insérez le contenu suivant :
      ```bash
      NODE_ENV=development
      PORT=3000
      DB_FILE=./data/users.db
      JWT_SECRET=yourSuperSecretKey
      DB_LOGGING=true
      ```

4. Configurer la base de données
   - Le fichier SQLite sera automatiquement créé à la première exécution de l'application

5. Lancer le serveur de développement
   ```bash
   npm start
   ```

L’API sera disponible à l’adresse suivante : http://localhost:3000/

## Tests
   - Lancer les tests
      ```bash
      npm run test
      ```