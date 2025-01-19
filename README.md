# Microservices Project

Ce projet est une architecture de microservices permettant la gestion des tâches, des utilisateurs, et des rappels. Il
est composé de trois services distincts, chacun dédié à une responsabilité spécifique, et d'un fichier `docker-compose`
facilitant leur orchestration.

---

## Services

### 1. **Tasks Service**

- **Langage** : Python (Django)
- **Rôle** : Gestion des tâches (création, modification, suppression, récupération).
- **Port** : `8000`
- **Documentation** : Consultez le [README de Tasks Service](./tasks_service/README.md).

### 2. **Users Service**

- **Langage** : JavaScript (Node.js)
- **Rôle** : Gestion des utilisateurs et authentification.
- **Port** : `3000`
- **Documentation** : Consultez le [README de Users Service](./users_service/README.md).

### 3. **Reminders Service**

- **Langage** : PHP (Symfony)
- **Rôle** : Gestion des rappels automatisés.
- **Port** : `8001`
- **Documentation** : Consultez le [README de Reminders Service](./reminders_service/README.md).

---

## Prérequis

- **Docker** : Version récente
- **Docker Compose** : Version récente

---

## Installation et exécution

### Étapes

#### 1. **Cloner le dépôt**

   ```bash
   git clone https://github.com/votre-utilisateur/microservices-project.git
   cd microservices-project
   ```

#### 2. **Lancer les services avec Docker Compose**

   ```bash
   docker-compose up -d --build
   ```

#### 3. **Vérifier les services**

- **Tasks Service :** http://localhost:8000
- **Users Service :** http://localhost:3000
- **Reminders Service :** http://localhost:8001

#### 4. **Structure des répertoires**

   ```plaintext
   /microservices-project
   ├── docker-compose.yaml
   ├── tasks_service/
   ├── users_service/
   └── reminders_service/
   ```

#### 5. **Tests**

- Chaque service possède ses propres tests. Consultez les README spécifiques pour les instructions.

- Pour effectuer les tests dans l'environnement Docker entrez d'abord dans le conteneur du service que vous
  souhaitez tester :

  ```bash
  docker-compose exec [NOM_DU_SERVICE] /bash
  ```

#### 6. **Points clés de l'architecture**

- Orchestration avec Docker Compose : Tous les services sont conteneurisés et connectés via un réseau Docker commun.

- Indépendance des services : Chaque service utilise ses propres outils, bases de données et environnements de
  développement.

- Communication interservices : Les services communiquent via des requêtes HTTP en utilisant les noms des conteneurs
  comme hôtes.
