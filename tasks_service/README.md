# Tasks Service

Tasks Service est un microservice développé avec **Django 5** et **Python 3.12**. Il fournit une API REST pour la
gestion des tâches (todo list), avec des fonctionnalités comme la création, la modification, la suppression, et la
récupération des tâches par utilisateur.

## Fonctionnalités

- **Créer une nouvelle tâche**
- **Lister toutes les tâches**
- **Lister les tâches d’un utilisateur spécifique**
- **Modifier une tâche**
- **Supprimer une tâche**

---

## Installation

### Prérequis

- **Python 3.12** ou version supérieure
- **pip** (Python Package Installer)
- **SQLite3** (généralement inclus avec Python)

### Étapes d'installation

1. **Cloner le dépôt**
    - Et entrer dans le dossier du projet
       ```bash
       cd tasks-service
      ```

2. **Créer un environnement virtuel**
   ```bash
   python -m venv env
   ```

3. **Activer l’environnement virtuel**
    - **Sur Linux/macOS**
      ```bash
      source env/bin/activate
      ```
    - **Sur Windows**
      ```bash
      env\Scripts\activate
      ```

4. **Installer les dépendances**
   ```bash
   pip install -r requirements.txt
   ```

5. **Configurer la base de données**
    - Appliquer les migrations
      ```bash
      python manage.py makemigrations
      python manage.py migrate
      ```

6. **Créer un superutilisateur (optionnel)**
    - Pour accéder à l’interface d’administration
      ```bash
      python manage.py createsuperuser
      ```

7. **Lancer le serveur de développement**
   ```bash
   python manage.py runserver
   ```

L’API sera disponible à l’adresse suivante : http://localhost:8000/

## Tests

- Lancer les tests

   ```bash
   python manage.py test
   ```
