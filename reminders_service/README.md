# Reminders Service

Reminders Service est un microservice développé avec **Symfony 7** et **PHP 8.2**. Il fournit une API REST pour la
gestion des rappels, permettant de créer, lister et générer des rappels pour les utilisateurs.

## Fonctionnalités

- **Générer des rappels automatiques**
- **Lister les rappels pour un utilisateur**
- **Supprimer des rappels**

---

## Installation

### Prérequis

- **PHP 8.2** ou version supérieure
- **Composer** (Gestionnaire de dépendances PHP)
- **SQLite3** (Base de données légère et rapide)

### Étapes d'installation

1. **Cloner le dépôt**
    - Et entrer dans le dossier du projet
      ```bash
      git clone https://github.com/votre-utilisateur/reminders-service.git
      cd reminders-service
      ```

2. **Installer les dépendances**
   ```bash
   composer install
   ```

3. Configurer la base de données
    - Copier le fichier d’exemple d’environnement et le modifier si nécessaire
   ```bash
   cp .env .env.local
   ```

    - Par défaut, la base de données est configurée pour SQLite :
   ```bash
   DATABASE_URL=sqlite:///%kernel.project_dir%/var/reminders.db
   ```

4. Appliquer les migrations
   ```bash
   php bin/console doctrine:migrations:migrate
   ```

5. Lancer le serveur de développement
   ```bash
   symfony serve
   ```

L’API sera disponible à l’adresse suivante : http://127.0.0.1:8000/

## Tests

- Lancer les tests fonctionnels

   ```bash
   php bin/phpunit
   ```
