# 🧙‍♂️ Poudlard's Portal

## 📝 Présentation
Poudlard's Portal est une application web moderne permettant de gérer l'école de sorcellerie Poudlard. Cette application permet aux élèves et au personnel de l'école d'accéder à différentes fonctionnalités selon leurs rôles.

## 🛠️ Technologies utilisées
- **Frontend** : React, TypeScript, Vite, SCSS
- **Backend** : Node.js, Express, PostgreSQL
- **Authentification** : JWT (JSON Web Tokens)

## 📋 Fonctionnalités
- Authentification des utilisateurs (élèves et personnel)
- Gestion des rôles (élève, professeur, directeur, etc.)
- Consultation des matières et des cours
- Gestion des maisons (Gryffondor, Serpentard, etc.)
- Gestion des salles et des emplois du temps

## 🚀 Installation

### Prérequis
- Node.js (v18 ou supérieur)
- PostgreSQL (v14 ou supérieur)
- npm ou yarn

### Étapes d'installation

1. **Cloner le projet**
```bash
git clone [URL_DU_REPO]
cd HarryPotter
```

2. **Initialiser la base de données**
```bash
# Se connecter à PostgreSQL
psql -U postgres

# Créer la base de données
CREATE DATABASE poudlard;

# Créer l'utilisateur
CREATE USER poudlard WITH PASSWORD 'poudlard';

# Donner les droits
GRANT ALL PRIVILEGES ON DATABASE poudlard TO poudlard;

# Se connecter à la base de données
\c poudlard

# Exécuter le script d'initialisation
\i projet/backend/init.sql
```

3. **Installer les dépendances du backend**
```bash
cd projet/backend
npm install
```

4. **Installer les dépendances du frontend**
```bash
cd ../frontend
npm install
```

5. **Démarrer les serveurs**

Dans un terminal (Backend) :
```bash
cd projet/backend
npm run dev
```

Dans un autre terminal (Frontend) :
```bash
cd projet/frontend
npm run dev
```

## 🔑 Conventions de code

### Général
- Utiliser l'anglais pour le code et les commentaires
- Utiliser des noms explicites pour les variables et fonctions
- Commenter le code complexe
- Respecter l'indentation (2 espaces)

### Frontend
- **Composants React** : PascalCase (ex: `Header.tsx`)
- **Fichiers SCSS** : kebab-case (ex: `header.scss`)
- **Variables SCSS** : kebab-case (ex: `$primary-color`)
- **Fonctions** : camelCase (ex: `handleClick`)
- **Props** : camelCase (ex: `onClickHandler`)

### Backend
- **Routes** : kebab-case (ex: `/wizard-roles`)
- **Variables** : camelCase (ex: `wizardId`)
- **Fonctions** : camelCase (ex: `getWizardById`)
- **Tables** : snake_case (ex: `wizard_role`)

### Git
- **Branches** : 
  - `main` : branche principale
  - `develop` : branche de développement
  - `feature/*` : nouvelles fonctionnalités
  - `bugfix/*` : corrections de bugs
  - `hotfix/*` : corrections urgentes

- **Commits** :
  - Format : `type(scope): description`
  - Types : feat, fix, docs, style, refactor, test, chore
  - Exemple : `feat(auth): add login functionality`

## 👥 Rôles et permissions

### Élèves
- Consulter leur emploi du temps
- Voir les informations de leur maison
- Consulter la liste des professeurs

### Professeurs
- Gérer leurs cours
- Voir la liste des élèves
- Gérer les notes

### Directeur
- Gérer tout le personnel
- Gérer les maisons
- Gérer les salles

## 📚 Structure du projet

```
projet/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── styles/
│   │   └── ...
│   └── package.json
└── backend/
    ├── index.js
    ├── init.sql
    └── package.json
```

## 🔍 Tests
Pour lancer les tests :
```bash
# Frontend
cd projet/frontend
npm test

# Backend
cd projet/backend
npm test
```

## 📝 Documentation
La documentation de l'API est disponible via Swagger à l'adresse : `http://localhost:3000/api-docs`

## 🤝 Contribution
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'feat: Add AmazingFeature'`)
4. Push la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence
Ce projet est sous licence MIT.
