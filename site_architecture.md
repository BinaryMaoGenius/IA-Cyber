# Architecture du Site Web Éducatif - Cybersécurité et IA au Mali

## Structure Générale du Site

### 1. Page d'Accueil
- **Hero Section** : Titre principal, sous-titre explicatif, bouton d'appel à l'action
- **Aperçu des Sections** : Cartes visuelles présentant les deux domaines principaux (Cybersécurité et IA)
- **Statistiques Clés** : Chiffres sur la cybersécurité et l'IA au Mali/Afrique
- **Témoignages** : Citations courtes d'utilisateurs ou d'experts

### 2. Section Cybersécurité
#### 2.1 Introduction à la Cybersécurité
- Qu'est-ce que la cybersécurité ?
- Pourquoi c'est important au Mali ?
- Statistiques locales

#### 2.2 Menaces Courantes
- Phishing (hameçonnage)
- Logiciels malveillants
- Arnaques en ligne spécifiques au Mali
- Rançongiciels
- Usurpation d'identité

#### 2.3 Bonnes Pratiques
- Mots de passe sécurisés
- Authentification à deux facteurs
- Navigation sécurisée
- Sauvegardes
- Mise à jour des systèmes

#### 2.4 Simulateur d'Attaque
- Interface interactive pour apprendre en jouant
- Scénarios basés sur des cas réels maliens
- Scores et badges de progression

#### 2.5 Quiz Cybersécurité
- Questions à choix multiples
- Scénarios pratiques
- Feedback immédiat avec explications

### 3. Section Intelligence Artificielle
#### 3.1 Introduction à l'IA
- Qu'est-ce que l'IA ?
- Types d'IA (IA faible vs forte)
- Histoire et évolution

#### 3.2 Usages Éthiques
- Principes de l'IA responsable
- Applications bénéfiques
- Exemples concrets au Mali et en Afrique

#### 3.3 Opportunités au Mali
- Secteurs d'application (agriculture, santé, éducation)
- Initiatives locales
- Potentiel de développement

#### 3.4 Dangers et Défis
- Biais algorithmiques
- Perte d'emplois
- Surveillance de masse
- Désinformation

#### 3.5 Quiz IA
- Questions sur les concepts clés
- Études de cas éthiques
- Scénarios d'usage responsable

### 4. Ressources et Outils
#### 4.1 Vidéos Éducatives
- Tutoriels courts (2-5 minutes)
- Témoignages d'experts maliens
- Démonstrations pratiques

#### 4.2 Conseils Pratiques
- Fiches pratiques téléchargeables
- Checklists de sécurité
- Guides d'utilisation responsable de l'IA

#### 4.3 Glossaire
- Définitions des termes techniques
- Recherche et filtrage

### 5. À Propos
- Mission du site
- Équipe (fictive mais crédible)
- Partenaires et sources
- Contact

### 6. Navigation et Fonctionnalités Transversales
- Menu de navigation responsive
- Barre de recherche
- Système de progression (badges, scores)
- Mode sombre/clair
- Partage sur réseaux sociaux
- Accessibilité (contraste, taille de police)

## Architecture Technique

### Structure des Fichiers
```
/src
  /components
    /common (Header, Footer, Navigation)
    /cybersecurity (composants spécifiques)
    /ai (composants spécifiques)
    /interactive (Quiz, Simulator)
  /pages
    Home.jsx
    Cybersecurity.jsx
    AI.jsx
    Resources.jsx
    About.jsx
  /assets
    /images
    /videos
    /icons
  /styles
    globals.css
    components.css
  /data
    quiz-data.js
    content.js
```

### Technologies Utilisées
- **Frontend** : React avec Tailwind CSS
- **Icons** : Lucide React
- **Animations** : CSS transitions et Framer Motion
- **Responsive** : Mobile-first design
- **Accessibilité** : ARIA labels, contraste élevé

### Fonctionnalités Interactives
1. **Quiz Engine** : Système de questions-réponses avec scoring
2. **Simulateur d'Attaque** : Interface de jeu éducatif
3. **Système de Progression** : Badges et niveaux
4. **Recherche** : Filtrage du contenu
5. **Favoris** : Sauvegarde locale des sections préférées

