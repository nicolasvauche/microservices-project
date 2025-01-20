# Microservices Project

Ce projet est une architecture de microservices permettant la gestion des tâches, des utilisateurs, et des rappels. Il
est composé de trois services distincts, chacun dédié à une responsabilité spécifique, une API passerelle, un frontend,
et d'un fichier `docker-compose` facilitant leur orchestration.

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

### 4. **API Gateway**

- **Langage** : JavaScript (Node.js)
- **Rôle** : Centralisation des appels et redirection vers les Services.
- **Port** : `3001`
- **Documentation** : Consultez le [README de l'API Gateway](./api_gateway/README.md).

### 5. **Frontend**

- **Langage** : JavaScript (Next.js)
- **Rôle** : Interface utilisateur.
- **Port** : `3002`
- **Documentation** : Consultez le [README de l'API Gateway](./microservices_frontend/README.md).

---

## Prérequis

- **Docker** : Version récente
- **Docker Compose** : Version récente

---

## Installation et exécution

### Étapes

#### 1. **Cloner le dépôt**

   ```bash
   git clone https://github.com/nicolasvauche/microservices-project.git
   cd microservices-project
   ```

#### 2. **Lancer les services avec Docker Compose**

   ```bash
   docker-compose up -d --build
   ```

#### 3. **Tester les services avec le Frotnend intégré**

- **Frontend :** http://localhost:3002

#### 4. **Structure des répertoires**

   ```plaintext
   /microservices-project
   ├── docker-compose.yaml
   ├── api_gateway/
   ├── frontend/
   ├── reminders_service/
   ├── tasks_service/
   └── users_service/
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
