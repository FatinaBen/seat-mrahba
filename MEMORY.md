# Seat & Mrahba — Mémoire projet

Ce fichier contient toutes les décisions produit détaillées, à consulter par Claude Code
quand un détail précis est nécessaire (référencer avec @MEMORY.md si besoin).
CLAUDE.md contient les règles courtes ; ce fichier contient le "pourquoi" et le détail.

---

## 1. Concept général

Seat & Mrahba est un service qui remplace/digitalise le plan de table papier classique
lors d'un événement (mariage, événement corporate) au Maroc, via un QR code unique
affiché à l'entrée du lieu. Tous les invités scannent le même QR code en arrivant.

Le porteur du projet (moi) gère tout côté back-office : je reçois les infos du client
via un formulaire, je les saisis dans mon dashboard, et le système génère automatiquement
le mini-site final + le QR code correspondant.

## 2. Formules commerciales

**Formule 1 — Essentielle**
- Mini-site événement personnalisé
- Plan de table digitalisé

**Formule 2 — Complète**
Tout ce qu'il y a dans la Formule 1, plus :
- Menu (document PDF designé)
- Programme / déroulé (document PDF designé)
- Galerie photo partagée (upload par les invités)

**Option transversale (disponible sur les deux formules)**
- Personnalisation du support physique du QR code (carton, panneau, etc.)
- Toujours facturée séparément, sur devis

## 3. Parcours invité (mini-site)

Site en scroll vertical, dans cet ordre :
1. Écran d'accueil : "Bienvenue au mariage / événement de [nom]"
2. Section plan de table :
   - Barre de recherche : l'invité tape son Nom + Prénom
   - Résultat : plan de salle visuel global affiché
   - La table de l'invité ressort en couleur différente des autres
   - Texte affiché en haut : "Vous êtes à la table X"
3. Sections optionnelles (selon activation dans le dashboard) :
   - Menu (PDF affiché)
   - Programme (PDF affiché)
   - Galerie photo ("Partagez vos moments" — upload par les invités)
4. Footer : contact (email, Instagram)

## 4. Dashboard (outil interne, pas client-facing)

Catégories déjà en place (à peaufiner, pas à refaire) :

1. **Infos événement**
   - Nom des mariés / nom de l'événement
   - Alimente le texte d'accueil du mini-site

2. **Plan de table**
   - Import d'un fichier Excel (voir template ci-dessous)
   - Génération automatique du plan de table visuel à partir de l'Excel

3. **Toggles de sections**
   - Menu : actif/inactif
   - Programme : actif/inactif
   - Galerie : actif/inactif
   - Ces toggles déterminent quelles sections apparaissent sur le mini-site, selon
     la formule achetée par le client

4. **Menu & Programme — IMPORTANT**
   - Ce ne sont PAS des champs de texte à remplir manuellement
   - Ce sont des **fichiers PDF designés sur Canva** par moi, cohérents avec
     l'identité visuelle/personnalisation de l'événement
   - Le dashboard doit permettre d'**uploader un PDF** pour chacune de ces sections
   - Le mini-site affiche le PDF tel quel (viewer intégré), pas de mise en page
     générée automatiquement

5. **Galerie photo**
   - Simple toggle actif/inactif
   - Si actif : section invités avec upload de photos ("Partagez vos moments")

6. **Génération finale**
   - Le dashboard génère le mini-site final + le QR code correspondant

## 5. Template Excel — Plan de table

Colonnes actuelles retenues :

| Colonne | Description |
|---|---|
| Nom | Nom de l'invité |
| Prénom | Prénom de l'invité |
| N° Table | Numéro de la table assignée |
| Capacité table | Nombre de places pour cette table (répété par ligne, ou onglet séparé "Tables") |

Décisions :
- Le nombre de tables et leur numérotation sont définis par le client via l'Excel
  (ex. tables 1 à 20 → génère 20 tables sur le plan visuel)
- La capacité par table est incluse pour permettre plus tard un visuel plus réaliste
  (places restantes / table pleine), même si non exploité immédiatement
- Reste à trancher plus tard : format exact du template (fichier unique vs onglets
  séparés "Invités" et "Tables"), gestion des tables rondes/rectangulaires si besoin
  visuel plus poussé

## 5bis. Personnalisation visuelle du mini-site — fond d'écran global

Constat (session du 17/07) : la première version générée de l'écran d'accueil
(dégradé terracotta uni + texte centré) est trop plate, ne fait pas "site premium".
La personnalisation actuelle du dashboard (couleur principale/secondaire/boutons,
police, arrondis) ne pilote que des variables superficielles, pas la composition
visuelle — insuffisant pour un rendu haut de gamme.

Décisions :
- Le dashboard permet déjà l'upload d'un **logo ou d'une photo** (ex. photo du couple,
  logo d'entreprise pour un événement corporate)
- Cette image sert de **fond visuel global sur tout le mini-site** (pas seulement
  l'écran d'accueil) : accueil, plan de table, menu, galerie — pour une cohérence
  visuelle de bout en bout
- Un **overlay** (dégradé semi-transparent dans les couleurs du thème sélectionné)
  doit être posé par-dessus l'image pour garantir la lisibilité du texte quelle
  que soit la photo
- Le texte et les données restent générés dynamiquement (nom des mariés, plan de
  table, etc.) — seule l'image de fond change, pas la logique de génération

Points encore à trancher :
- Comportement par défaut si aucune image n'est uploadée (prévoir un fond soigné
  par défaut, pas le dégradé plat actuel — texture subtile ou motif discret)
- Gestion du recadrage/positionnement de l'image (writing pour mobile en priorité,
  la plupart des invités consultent depuis leur téléphone)
- Un skill design/UX premium reste à créer pour améliorer la hiérarchie visuelle
  globale (espacement, profondeur, éléments décoratifs) au-delà de cette fonctionnalité

## 5ter. Dashboard — page "Design" : audit et points à corriger (session 17/07)

Constat après visualisation de l'onglet Design du dashboard (étape 4/7 : Informations,
Invités, Plan de table, Design, Contenu, Aperçu, Publier) :

**Ce qui fonctionne déjà :**
- Upload d'une image de couverture (affichée "en plein écran" — à clarifier : Hero
  seul ou fond global, voir décision en 5bis : ce sera un fond global)
- Fallback logo si aucune photo de couverture n'est définie
- Thèmes de couleurs préconfigurés (Terracotta, Minimal, Maroc Chic, Olive,
  Black Luxury, Corporate) + couleurs personnalisées (principale/secondaire/boutons)

**Ce qui manque ou doit être amélioré :**
1. **Pas d'aperçu en direct (live preview)** du rendu pendant qu'on règle couleurs/
   police/arrondis — priorité haute, c'est ce qui permettrait de juger si le rendu
   est "premium" avant publication
2. **Réglage d'opacité/overlay manquant** sur l'image de couverture — nécessaire pour
   garantir la lisibilité du texte par-dessus une photo (voir décision 5bis)
3. **Les thèmes ne proposent que des couleurs**, pas de texture ou motif de fond
   discret (ex. zellige/moucharabieh stylisé) à utiliser quand il n'y a pas de
   photo personnalisée — actuellement le fond par défaut est un dégradé plat jugé
   trop générique
4. **Une seule police pour tout** le site (le sélecteur affiche "Mariage" avec
   Playfair Display / Cormorant Garamond / Inter au choix) — un rendu premium
   nécessite en général une séparation police de titre / police de texte courant
5. **"Arrondis"** = le rayon des angles (border-radius) des éléments (boutons,
   cartes, images) : Carré → Léger → Moyen → Arrondi → Pilule (arrondi maximal,
   type bouton capsule). Détail de style secondaire, à garder cohérent mais pas
   prioritaire par rapport aux points 1 à 4.

**Décisions tranchées (session du 17/07, suite) :**
- **Fond par défaut (sans photo uploadée)** : texture simple — grain léger, effet
  papier ou tissu subtil. Pas de motif géométrique zellige/moucharabieh en fond
  par défaut (réservé à des éléments décoratifs ponctuels/discrets si besoin,
  pas au fond principal).
- **Polices** : titre en **Cormorant Garamond**, texte courant en **sans-serif
  sobre** (à choisir parmi les options déjà disponibles type Inter/Jost — pas de
  police unique appliquée à tout le site).

## 6. Points volontairement non traités pour l'instant
- Modifications du site vitrine : à faire, mais pas encore listées (à ajouter ici
  dès qu'elles seront définies)
- Détail exact du template Excel (onglets, colonnes additionnelles) : à finaliser
- Pas de compte/connexion invité prévu — parcours doit rester : scan → recherche
  nom → résultat, sans friction supplémentaire

---

## 7. Journal des sessions

> À compléter à chaque session de travail importante sur Claude Code.
> Format : date, ce qui a été fait, décisions prises, points en suspens.

### [Date à compléter] — Session de cadrage initial
- Définition complète du concept, des formules, du parcours invité et de la
  structure du dashboard
- Décision : menu/programme en PDF uploadé, pas en texte généré
- Décision : Excel du plan de table inclut la capacité par table
- Création des fichiers CLAUDE.md et MEMORY.md

### 17/07 — Audit design du dashboard
- Constat : écran d'accueil généré (dégradé terracotta plat) jugé pas assez premium
- Décision : image/logo uploadé sert de fond visuel global sur tout le mini-site
  (pas seulement l'écran d'accueil), avec overlay pour la lisibilité du texte
- Audit de la page "Design" du dashboard : 5 points identifiés à améliorer
  (aperçu live manquant, pas de réglage d'overlay/opacité, thèmes = couleurs
  uniquement sans texture, une seule police pour tout, arrondis = détail secondaire)
- Décision : fond par défaut (sans photo) = texture simple (grain/papier/tissu
  léger), pas de motif zellige/moucharabieh en fond principal
- Décision : police de titre = Cormorant Garamond, texte courant = sans-serif sobre
- À faire : rédiger un skill design/UX premium pour Claude Code
