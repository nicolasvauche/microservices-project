# Utilisez l'image PHP de base
FROM php:8.2-cli

# Installer les outils nécessaires pour compiler SQLite
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    wget \
    build-essential \
    pkg-config \
    libsqlite3-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Télécharger, compiler et installer SQLite
RUN wget https://www.sqlite.org/2025/sqlite-autoconf-3480000.tar.gz \
    && tar -xzf sqlite-autoconf-3480000.tar.gz \
    && cd sqlite-autoconf-3480000 \
    && ./configure --prefix=/usr/local \
    && make \
    && make install \
    && cd .. \
    && rm -rf sqlite-autoconf-3480000 sqlite-autoconf-3480000.tar.gz

# Ajouter SQLite aux variables d'environnement
ENV SQLITE_CFLAGS="-I/usr/local/include"
ENV SQLITE_LIBS="-L/usr/local/lib"

# Installer les extensions PHP après avoir mis à jour SQLite
RUN docker-php-ext-configure pdo_sqlite --with-pdo-sqlite=/usr/local \
    && docker-php-ext-install pdo pdo_sqlite zip

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers du projet
COPY . .

# Installer les dépendances avec Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && composer install

# Exposer le port pour le serveur Symfony
EXPOSE 8000

# Commande pour démarrer Symfony et exécuter les migrations
CMD ["sh", "-c", "php bin/console doctrine:migrations:migrate --no-interaction && php -S 0.0.0.0:8000 -t public"]
