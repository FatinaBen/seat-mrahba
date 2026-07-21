---
name: design-ux-premium-seat-mrahba
description: Applique un niveau de design premium (hiérarchie visuelle, profondeur, identité marocaine subtile) au site vitrine et au mini-site invité de Seat & Mrahba. Ne s'applique PAS au dashboard admin, qui doit rester avant tout pratique et fonctionnel. À utiliser pour toute tâche touchant l'apparence du site vitrine ou du mini-site invité.
---

# Design premium — Seat & Mrahba

## Périmètre d'application — IMPORTANT
Ce skill s'applique UNIQUEMENT à :
- **Le site vitrine** (présentation/vente du service aux prospects)
- **Le mini-site invité** (généré via le QR code, ce que voient les invités)

Ce skill NE s'applique PAS au **dashboard admin** (l'outil interne utilisé
uniquement par le porteur du projet). Le dashboard doit rester pratique,
clair et fonctionnel — pas d'exigence de design premium dessus, la priorité
y est l'ergonomie et la rapidité d'usage au quotidien, pas l'esthétique.

## Posture à adopter : designer professionnel, pas générateur par défaut
Aborde chaque tâche visuelle comme le ferait un designer UX/UI senior spécialisé
dans l'événementiel haut de gamme (mariages, luxe) — pas comme un générateur qui
produit la solution la plus statistiquement probable. Un rendu "générique IA" se
reconnaît toujours à l'**absence de parti-pris** : tout est propre, mais rien n'est
choisi délibérément. L'objectif ici est l'inverse : chaque écran doit refléter une
direction visuelle assumée.

Avant de coder une interface, formuler (au moins mentalement) :
- Quelle est LA pièce visuelle forte de cet écran ? (jamais plusieurs éléments qui
  se disputent l'attention en même temps)
- Quel contraste de tailles je crée entre le plus important et le reste ? (pas 3
  tailles proches et interchangeables)
- Qu'est-ce que je choisis de NE PAS faire, pour que ce qui reste ressorte ?

## Interdits explicites — solutions "par défaut IA" à ne jamais utiliser
- Dégradé bleu/violet ou gris/blanc générique
- Police Inter, Roboto, Arial ou Space Grotesk comme police principale
- Grille de cartes toutes identiques, toutes de même poids visuel
- Boutons/composants sans personnalité (arrondi générique, ombre par défaut)
- Une seule taille de respiration entre tous les blocs (le rythme doit varier
  selon l'importance du contenu, pas être uniforme partout)

## Principes non négociables

### 1. Profondeur, pas de fond plat
Ne jamais se contenter d'un dégradé uni en fond. Toujours composer avec au moins
un des éléments suivants :
- Superposition de calques (image/texture + overlay dégradé semi-transparent)
- Ombres légères et cohérentes sur les éléments qui doivent se détacher (cartes,
  boutons, blocs de contenu)
- Léger effet de grain ou texture subtile en fond quand aucune photo n'est fournie
  (jamais un aplat de couleur pur)

### 2. Fond image/logo — comportement obligatoire
- L'image ou le logo uploadé par l'utilisateur sert de fond visuel **global** sur
  tout le mini-site (pas seulement l'écran d'accueil)
- Toujours poser un **overlay dégradé semi-transparent** (couleurs du thème
  sélectionné) par-dessus l'image, pour garantir la lisibilité du texte sur
  n'importe quelle photo
- **Fallback par défaut (décidé) : texture simple** — grain léger, effet papier
  ou tissu subtil. Jamais un dégradé plat uni. Ne pas utiliser de motif
  géométrique (zellige/moucharabieh) comme fond par défaut — ces motifs sont
  réservés à des éléments décoratifs ponctuels (séparateurs, bordures), pas au
  fond principal

### 3. Hiérarchie typographique réelle
- **Décidé : titre en Cormorant Garamond, texte courant en sans-serif sobre**
  (type Inter/Jost — à choisir parmi les options déjà disponibles dans le
  dashboard, mais toujours une police différente du titre)
- Ne jamais appliquer une seule police à tous les niveaux de texte
- Respecter une échelle de tailles cohérente (titre principal / sous-titre / corps
  de texte / mentions légères), pas des tailles arbitraires

### 4. Rythme et espacement
- Espacements généreux entre les sections (le mini-site ne doit jamais paraître
  compressé ou surchargé)
- Alignement centré pour les contenus cérémoniels (accueil, plan de table) —
  garde une sobriété élégante, évite le bruit visuel
- Marges cohérentes entre mobile et desktop — priorité mobile (les invités
  consultent depuis leur téléphone en scannant le QR code)

### 5. Identité marocaine — subtile, jamais folklorique
Réservée aux **éléments décoratifs ponctuels** (séparateurs de section, bordures,
petits motifs en filigrane) — pas au fond principal, qui utilise une texture
simple (voir section 2) :
- S'inspirer de motifs géométriques type zellige ou moucharabieh, mais de façon
  **épurée et minimaliste** — un fin motif en filigrane, pas un pattern chargé
- Toujours en camaïeu de la couleur du thème choisi (jamais une couleur qui jure)
- Le motif ne doit jamais nuire à la lisibilité du texte par-dessus

### 6. Micro-interactions
- Transitions douces au scroll (fade-in léger des sections, pas d'animation brusque)
- Feedback visuel discret sur les interactions (recherche du nom, résultat du
  plan de table qui apparaît) — jamais de state visuellement pauvre (ex. affichage
  brut sans transition)

## Ce qu'il ne faut jamais faire
- Un fond uni sans texture ni profondeur (le défaut actuel à corriger)
- Une seule police appliquée à tous les niveaux de texte
- Un motif marocain trop chargé ou trop saturé (effet "kitsch" à éviter absolument
  — le positionnement est premium/épuré, pas folklorique)
- Négliger le rendu mobile au profit du rendu desktop

## À garder en tête pour le dashboard (pas seulement le mini-site)
Le dashboard de personnalisation doit, à terme, permettre de **voir l'effet des
réglages en direct** (aperçu live) plutôt que de régler à l'aveugle. Si un aperçu
live n'est pas encore implémenté, le signaler comme limitation plutôt que de
prétendre que le réglage suffit à garantir un bon rendu.

## Référence
Voir MEMORY.md section "Design & personnalisation" pour l'historique des constats
et décisions (notamment l'audit de la page Design du dashboard, session du 17/07).
