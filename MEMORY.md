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

**Formule Essentielle**
- QR Code personnalisé
- Page web personnalisée
- Plan de table interactif
(Ne pas inclure : support par mail, accès illimité le jour J — jugés sans valeur
commerciale réelle, retirés de la présentation)

**Formule Premium**
Tout ce qu'il y a dans l'Essentielle, plus :
- Menu personnalisé
- Programme personnalisé (si le client en souhaite un — optionnel selon événement)
- Galerie photo
(Ne pas inclure : informations pratiques, carte et localisation, support
prioritaire — jugés non pertinents, retirés de la présentation)
Le site vitrine doit mettre en avant la personnalisation avancée (design
entièrement personnalisé, expérience plus immersive) comme argument de valeur
de cette formule par rapport à l'Essentielle.

**Il n'y a que 2 formules commerciales** (pas de 3ème formule "Signature" — décision
prise le 23/07 : supprimée du site vitrine)

**Option transversale (disponible sur les deux formules)**
- Personnalisation du support physique du QR code (plexiglas, bois, acrylique,
  métal, autres supports sur mesure)
- Toujours facturée séparément, sur devis
- Présentée sur le site vitrine comme une section dédiée ("Supports QR Code
  personnalisés"), pas comme une formule à part

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

## 5quater. Site vitrine — Hero et démonstration (session 23/07)

Décisions fermes après revue du site vitrine actuel :

**Hero (première section)**
- Supprimer tout mockup de téléphone/application avec emojis — donne une
  impression "application mobile" alors que ce n'est pas le positionnement
  du produit
- Remplacer par un visuel premium : QR code élégant, support de QR code
  (plexiglas/bois/papier haut de gamme), visuel de mariage raffiné, ou
  composition qui montre l'expérience sans passer par un téléphone
- Objectif : le visiteur doit comprendre immédiatement qu'il s'agit d'un QR
  code pour événements, pas d'une application

**Section démonstration ("Vivez l'expérience en direct")**
- Supprimer entièrement la section "Infos" (adresse, heure, contact,
  localisation) et ses textes — inutile car l'invité obtient ces infos
  ailleurs le jour J (le QR est scanné à l'entrée, il connaît déjà le lieu)
- Éviter tout mockup téléphone si possible ; si conservé, il doit reprendre
  exactement la palette du site (pas de cadre noir, pas de marron sur marron,
  bonne lisibilité)
- Nouvelle démonstration doit suivre le parcours réel dans cet ordre :
  1. Écran d'accueil avec titre + date, introduction élégante
  2. Champ de recherche nom/prénom
  3. Résultat : visuel de salle stylé (pas besoin d'un plan complet réaliste),
     "Vous êtes installé à la Table n°X" avec le numéro mis en couleur, plus
     une indication de zone (gauche/droite de la salle)
  4. Menu : exemple élégant (entrée/plat/dessert soigné)
  5. Programme : absent de cet exemple de démo (mais reste une option
     disponible pour de vrais clients dans la Formule Premium)
  6. Galerie : conservée, avec un texte d'accroche du type "Partagez les plus
     beaux moments de cette soirée"

**Reste du site vitrine — sections à garder sans modification**
L'hospitalité marocaine réinventée à l'ère digitale / Comment ça fonctionne /
Pour chaque célébration / Les grands moments méritent une attention aux
détails / Ce que nous vous promettons / Formulaire de contact (les
coordonnées email/WhatsApp du formulaire seront mises à jour plus tard, ne
pas y toucher pour l'instant)

**Ligne directrice générale (à rappeler à chaque session touchant le site
vitrine ou le mini-site) :** éviter tout effet "application mobile", interface
gadget, ou emoji. Le rendu doit rester sobre, luxueux, minimaliste, cohérent
avec un service haut de gamme dédié aux mariages/événements élégants.

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
- Décision : police de titre = **Playfair Display (version fine/light, grande
  taille, aérée)**, texte courant = sans-serif sobre. Choix fait après comparaison
  visuelle de 3 directions (Didot/Bodoni classique, Playfair Display fin,
  Cormorant retravaillé) — Playfair Display fin retenu comme le plus adapté au
  positionnement mariage/événementiel chaleureux (Didot jugé trop froid/couture)
- Décision : l'exigence de design premium s'applique au site vitrine et au
  mini-site invité uniquement — le dashboard admin doit rester pratique et
  fonctionnel, pas d'exigence esthétique dessus
- À faire : rédiger un skill design/UX premium pour Claude Code

### 23/07 — Refonte du contenu du site vitrine
- Diagnostic design appliqué : police titre remplacée par Playfair Display
  fine/aérée, corrections de contraste (titres illisibles sur fond sombre)
  et d'ordre visuel (titre → ligne décorative → texte)
- Brief complet de refonte de contenu rédigé par l'utilisateur : suppression
  du mockup téléphone/app dans le Hero, refonte de la démo d'expérience
  (suppression section Infos, parcours réel avec plan de table stylé),
  simplification des formules (suppression de la 3ème formule "Signature",
  listes de fonctionnalités précisées pour Essentielle/Premium)
- Ligne directrice ajoutée : éviter tout effet "application mobile"/gadget/emoji

### 10/09 — Simplification de l'offre commerciale (section Formules/Tarifs)
- Décision : suppression du système à 2 formules (Essentielle / Premium). Nouvelle
  structure à une seule offre à prix fixe : **Formule Mrahba, 690 DH**, incluant
  tout ce qui était auparavant réparti entre les deux formules (mini-site, page
  d'accueil personnalisée, import Excel, recherche invité, plan de table digital,
  QR code, support QR standard, mise en ligne, accompagnement) — prix unique, pas
  de variation selon le nombre d'invités
- Ajout d'un second bloc **Mrahba+** ("Personnalisez votre expérience") juste en
  dessous, présentant les prestations additionnelles à la carte, toutes **sur
  devis**, sans prix affiché individuellement : personnalisation graphique avancée,
  menu digital, programme de la soirée, menu + programme combinés, personnalisation
  des supports QR, demande personnalisée. CTA "Demander un devis" vers #contact
- Volontairement pas de prix par prestation Mrahba+ (juste une mention "Tarif sur
  devis" globale) pour éviter l'effet "on facture chaque fonctionnalité"
- Noms bannis pour l'offre : "Formule 1/2/3", "Basic/Premium/Gold" — remplacés par
  "Formule Mrahba" et "Mrahba+"
- Section "Supports QR Code" (id="supports", juste après, avec carrousel photos)
  laissée strictement inchangée : elle détaille déjà en profondeur la prestation
  "Personnalisation des supports QR" listée dans Mrahba+, pas besoin de dupliquer
- Fichier modifié : `src/components/Pricing.tsx` uniquement (section id="offres")

### 10/09 — Restructuration du dashboard admin (parcours en 8 étapes)
- Contexte : le dashboard existait déjà comme wizard à étapes (`EventWizard.tsx` +
  `StepXxx.tsx`), très proche de la nouvelle structure demandée — adapté, pas
  reconstruit.
- **Bug corrigé (le plus important) : le plan de table ne se reliait pas à
  l'Excel.** Après import, `guest.tableId` recevait le numéro brut de la colonne
  Excel (ex. "7"), alors que les `Table.id` sont des identifiants générés
  aléatoirement — la recherche invité ne trouvait donc jamais la bonne table sans
  placement manuel. Ajout de `linkGuestsToTables()` (`src/lib/admin/utils.ts`) qui
  crée/relie automatiquement les tables à partir des numéros présents dans
  l'Excel, appelée depuis `StepGuests.applyImport()`.
- **Second bug corrigé (trouvé en testant le premier) : la détection automatique
  des colonnes confondait "Nom" et "Prénom".** `detectField()` comparait dans les
  deux sens (`alias.includes(header)`), et l'alias "prénom" contient littéralement
  la sous-chaîne "nom" → la colonne Nom était captée par le champ Prénom, laissant
  `lastName` vide. Corrigé avec une passe de correspondance exacte en priorité,
  puis correspondance partielle dans un seul sens (en-tête ⊇ alias).
- Nouveau champ `Event.welcomeMessage` (message d'accueil éditable dans
  "Informations", affiché sous le titre du Hero quand aucun visuel Canva n'est
  importé).
- Nouvelle étape **Page d'accueil** (`StepHome.tsx`) : import PNG/JPG dédié pour le
  visuel Canva de l'écran d'accueil (déplacé hors de l'étape Design). Sur le site
  invité, ce visuel est maintenant affiché en entier (`object-fit: contain`),
  sans recadrage ni overlay de texte — décision qui **remplace** celle du 17/07
  ("image = fond global avec overlay") *spécifiquement pour ce visuel* : le Canva
  importé est un design fini, on ne superpose plus de texte généré dessus.
- **Programme** converti du mode texte libre vers le même principe que **Menu** :
  toggle + import PNG/JPG (`programmeImage`) + aperçu + remplacement, avec la
  saisie texte existante conservée comme option de secours si aucun visuel n'est
  importé (rien de supprimé).
- **Plan de table** : ajout d'un import optionnel de visuel Canva (`seatingImage`),
  strictement additif — la recherche continue de fonctionner via l'Excel avec ou
  sans ce visuel.
- **QR Code** devient sa propre étape (`StepQRCode.tsx`, ex-`StepPublish.tsx`,
  logique inchangée : génération, téléchargement PNG, lien, publication).
- **Aperçu du site** (`PhonePreview.tsx`) : l'ancien mockup avait divergé du vrai
  site (il affichait Date/Lieu que le site public n'a jamais affichés, pas de
  vraie recherche). Remplacé par un iframe du vrai `/event/[id]` (avec
  `?preview=1` pour voir un événement non publié) dans un cadre téléphone —
  aperçu garanti identique et interactif, plus de double maintenance.
- Nouvel ordre des 10 étapes : Informations → Page d'accueil → Invités → Plan de
  table → Menu → Programme → QR Code → Aperçu du site → Galerie → Personnalisation.
  Les 8 premières correspondent exactement au parcours demandé ; Galerie et
  Personnalisation (couleurs/typo) existaient déjà et fonctionnent, donc conservées
  en bonus plutôt que supprimées (à trancher si l'utilisatrice préfère les retirer).
- Testé de bout en bout avec Playwright : création événement → import Excel (Excel
  fourni en exemple dans la demande) → tables auto-créées → QR généré → aperçu
  iframe → recherche "Fatima" sur le site public → résultat "Table 7" correct.
- Fichiers modifiés : `src/lib/admin/types.ts`, `utils.ts`, `EventWizard.tsx`,
  `PhonePreview.tsx`, `StepGeneral.tsx`, `StepGuests.tsx`, `StepSeating.tsx`,
  `StepSections.tsx` (réduit à Galerie), `StepDesign.tsx` (cover retiré),
  `src/app/event/[id]/page.tsx`. Nouveaux : `StepHome.tsx`, `StepMenu.tsx`,
  `StepProgramme.tsx`, `StepQRCode.tsx` (remplace `StepPublish.tsx`).

### 11/09 — Dashboard admin utilisable sur mobile
- Contexte : le dashboard avait deux colonnes latérales à largeur fixe (menu
  principal ~220px + liste d'étapes du wizard ~224px) qui ne se repliaient
  jamais sur petit écran → débordement horizontal, contenu coupé (visible sur
  capture d'écran envoyée par l'utilisatrice).
- Menu principal (`Sidebar.tsx`) : devient un tiroir plein écran sur mobile
  (`<lg`), ouvert via un bouton hamburger dans une nouvelle barre mobile
  (`AdminShell.tsx`, composant client qui porte le state — `admin/layout.tsx`
  reste un composant serveur pour l'export `metadata`). Comportement desktop
  (colonne fixe repliable) inchangé.
- Liste d'étapes du wizard (`EventWizard.tsx`) : la colonne fixe devient
  `hidden lg:flex`. Sur mobile, une barre compacte (retour + nom + progression)
  ouvre/ferme la même liste en menu déroulant plutôt qu'une colonne permanente.
- **Bug trouvé en testant (lié à l'usage mobile) : recharger directement sur
  `/admin/events/[id]` rebondissait vers la liste des événements.** Le garde-fou
  "si événement introuvable → rediriger" se déclenchait avant que le
  `localStorage` ait fini d'être lu par `AdminProvider` (course entre deux
  `useEffect`). Sur mobile, les rechargements de page sont beaucoup plus
  fréquents (changement d'appli, gestion mémoire du navigateur) donc ce bug y
  est particulièrement gênant. Corrigé en ajoutant un flag `hydrated` au store
  (`store.tsx`), et en attendant ce flag avant de rediriger, dans
  `admin/events/[id]/page.tsx` et `admin/events/[id]/preview/page.tsx`.
- `PhonePreview.tsx` (cadre iframe) : largeur passée de fixe (320px) à
  responsive (`w-full`, max 320px) pour tenir sur tout écran.
- Ajustements ponctuels de mise en page mobile dans tous les `StepXxx.tsx`
  (paddings, `flex-wrap` sur les barres d'actions et la ligne de table du plan
  de table, grilles à une colonne) et dans `admin/events/page.tsx` (la liste
  d'événements passe à 3 colonnes visibles au lieu de 6 sur mobile — Date/
  Invités/Statut restent visibles à partir de `sm:`, ce qui laisse la place au
  nom de l'événement au lieu de le tronquer à 2 caractères).
- Testé à 390px de large (taille iPhone) sur tout le parcours (dashboard,
  liste, les 10 étapes, tiroir de menu, menu déroulant d'étapes) avec
  Playwright : aucun débordement horizontal détecté (`scrollWidth ===
  clientWidth` sur chaque écran).
- Fichiers modifiés : `Sidebar.tsx`, `EventWizard.tsx`, `PhonePreview.tsx`,
  `store.tsx`, `admin/layout.tsx`, `admin/events/page.tsx`,
  `admin/events/[id]/page.tsx`, `admin/events/[id]/preview/page.tsx`, tous les
  `StepXxx.tsx`. Nouveau : `AdminShell.tsx`.

### 11/09 — Import Excel : support du format "groupé par table"
- Contexte : le fichier Excel réel de l'utilisatrice (`Plan_de_table_exp.xlsx`,
  fourni) n'est PAS un tableau plat une-ligne-par-invité — c'est le format
  qu'elle utilise naturellement, probablement le plus courant en pratique :
  ```
  Table 1
  N°   Nom complet
  1    Maxime Bernard
  ...
  (ligne vide)
  Table 2
  ...
  ```
  Deux colonnes seulement (N° de siège + nom complet), une section par table.
  L'import existant (pensé pour un tableau plat Prénom/Nom/Table) confondait la
  ligne "Table 1" avec un en-tête de colonne — résultat inexploitable.
- Ajout de `parseGroupedByTableRows()` (`utils.ts`) : détecte ce format à partir
  des lignes brutes de la feuille (tableau de tableaux, pas les objets
  clé-valeur habituels) et en extrait directement prénom/nom (le nom complet est
  splitté sur le premier espace) + numéro de table.
- Détection automatique à l'import : si le format groupé est reconnu, on saute
  entièrement l'étape de correspondance des colonnes (elle n'a pas de sens ici)
  et on affiche directement un aperçu ("X tables, Y invités") avant import.
  Sinon, comportement inchangé (mapping de colonnes classique).
- Réutilise `linkGuestsToTables()` (déjà existant) pour créer/relier les vraies
  tables — même logique testée pour le format plat.
- Petite correction associée : les tables nouvellement créées à l'import
  prennent désormais la capacité réelle du nombre d'invités qui y sont placés
  (au lieu d'un défaut fixe de 8), pour éviter un affichage trompeur du type
  "10/8" quand les tables du fichier font plus de 8 personnes. Ne touche
  jamais la capacité d'une table déjà existante.
- Testé de bout en bout avec le fichier réel fourni (20 tables × 10 invités =
  200 invités) : détection, création des 20 tables à la bonne capacité (10),
  recherche invité publique correcte ("Zoé Morin" → Table 20, "Maxime Bernard"
  → Table 1, pas de confusion avec Table 10-19 malgré le préfixe partagé).
- Fichiers modifiés : `utils.ts` (nouvelle fonction + capacité auto),
  `StepGuests.tsx` (détection + nouveau panneau d'aperçu `GroupedImportPreviewPanel`,
  lecture des lignes brutes en plus des lignes-objets pour XLSX et CSV).

### 11/09 — Corrections page d'accueil invité + refonte Personnalisation
- **(1) Doublon de titre corrigé** : le champ "Nom de l'événement" (étape
  Informations, purement interne) s'affichait en sous-titre dupliqué sous le
  vrai titre du Hero, sur le site public. Supprimé du rendu public. Un nouveau
  champ dédié et toujours guest-facing, `displayTitle` ("Titre affiché aux
  invités", étape Page d'accueil), est désormais l'unique source du titre
  visible — y compris dans l'onglet navigateur (`document.title`). Le nom
  interne ne fuite plus nulle part côté invité.
- **(2) Texte du CTA de scroll dynamique** : "DÉCOUVREZ VOTRE ÉVÉNEMENT"
  (point de vue organisateur, adressé à l'invité) remplacé par un texte
  adapté au point de vue invité et au type d'événement (`event.type`,
  nouveau champ ajouté avec sélecteur dans l'étape Informations — ex.
  Mariage → "Découvrez notre mariage", Anniversaire → "Découvrez la fête",
  Générique → "Découvrez l'événement"), via `CTA_TEXT_DEFAULTS`. Reste
  surchargeable manuellement (`event.ctaText`).
- **(3) Refonte complète de la Personnalisation (`StepDesign.tsx`)** :
  - Bug corrigé : sélectionner un thème réécrivait toutes les valeurs
    personnalisées déjà saisies par le client. Séparation stricte
    thème (valeurs par défaut, `THEME_PRESETS`) / personnalisation
    (overrides qui persistent, `event.theme`) : un clic sur un thème ne
    fait plus que préremplir les champs custom via `updateTheme()`; les
    inputs lisent/écrivent toujours `event.theme`, jamais l'objet preset
    original. Une fois qu'une valeur est touchée manuellement, elle ne
    peut plus être écrasée que par un nouveau clic explicite sur un thème
    ou par "Réinitialiser au thème".
  - Nouvelle structure : Logo (placement Header/Hero/Filigrane +
    opacité/taille si filigrane) → Fond du site (couleur unie OU image
    uploadée + overlay clair/sombre réglable) → Thème de couleurs (presets
    inchangés, sert uniquement à préremplir) → Couleurs personnalisées
    (Principale/Secondaire/Boutons + nouveaux : Texte des boutons,
    Titres/Texte courant) → Typographie scindée en deux sélecteurs (Police
    des titres / Police du texte courant), élargie à 6 polices groupées
    par style (Élégante, Moderne, Manuscrite) via `FONT_OPTIONS` → Arrondis
    (inchangé) → Réinitialiser au thème / Enregistrer comme preset
    personnalisé réutilisable (persisté à part dans le localStorage).
    Aperçu en direct (`PhonePreview`, iframe débouncée) conservé et
    synchronisé avec ces réglages.
  - Chargement des polices Google passé d'un `@import` dans un `<style>`
    injecté au runtime à une balise `<link rel="stylesheet" precedence="…">`
    (hissée dans `<head>` par React 19) — mécanisme standard, plus fiable
    pour le préchargement navigateur. Non vérifiable visuellement dans cet
    environnement de test (le navigateur Playwright sandboxé n'a pas accès
    sortant à `fonts.googleapis.com` — `net::ERR_CONNECTION_RESET` côté
    proxy réseau du sandbox, confirmé identique avant/après ce changement
    et sur une requête `<link>` standard ; `curl` depuis la même machine
    atteint le même hôte sans problème). Fonctionnera normalement en
    production (Vercel, navigateurs réels sans ce proxy).
  - Bug pré-existant découvert et corrigé au passage : le titre du Hero
    s'affichait en noir au lieu de blanc à cause d'une règle CSS globale
    non "layered" (`h1{color:var(--deep)}` dans `globals.css`) qui prime
    sur les classes utilitaires Tailwind (`.text-white`) à cause de l'ordre
    des cascade layers, indépendamment de la spécificité. Corrigé par un
    style inline explicite sur le `<h1>` du Hero (les styles inline priment
    toujours).
  - Fichiers modifiés : `types.ts` (nouveaux champs Theme/Event, presets
    étendus, `FONT_OPTIONS`, `CTA_TEXT_DEFAULTS`), `utils.ts` (defaults),
    `StepGeneral.tsx` (type d'événement + CTA), `StepHome.tsx`
    (`displayTitle`), `StepDesign.tsx` (refonte complète), `PhonePreview.tsx`
    (inchangé fonctionnellement), `event/[id]/page.tsx` (rendu public :
    titre, CTA, styles calculés par thème, logo/fond/overlay, polices).

### 11/09 — Visuel Canva de la page Programme mal affiché (bande + fond blanc)
- Signalé : le visuel Canva importé sur l'étape Programme (`event.programmeImage`)
  s'affichait comme une petite image encartée (carte à largeur limitée,
  360px, coins arrondis, ombre) sous le label "Programme" / titre "Le
  déroulé de la journée" — au lieu de remplir tout l'écran comme la
  couverture de la page d'accueil (`event.theme.heroImage` dans `Hero`).
- Cause : `ProgrammeSection` traitait l'image comme un contenu de section
  classique (`width:100%` dans une carte `maxWidth:360` avec padding),
  alors que `Hero` traite sa couverture comme un visuel plein écran
  autonome (section `minHeight:100svh`, `object-fit:contain`, sans
  titre/label superposé — le visuel Canva porte déjà toute l'info).
- Correction : quand `event.programmeImage` est défini, `ProgrammeSection`
  bascule désormais sur la même branche de rendu que `Hero` avec image
  (section plein écran `minHeight:100svh`, fond `#1A0F08`, image
  `object-fit:contain`, sans label/titre superposés — le visuel est
  affiché "tel quel" comme annoncé dans l'étape Programme du dashboard).
  Le rendu texte (timeline horaire) reste inchangé quand aucun visuel
  n'est importé.
- Vérifié visuellement (Playwright, viewport mobile 390×844) : la section
  occupe exactement toute la hauteur/largeur de l'écran après le fix
  (avant : section plus haute que l'écran, image encartée avec bandeau
  blanc au-dessus et en dessous).
- Note : `MenuSection` (`event.menuImage`) a très probablement le même
  problème — pas corrigé ici car non demandé explicitement, à traiter en
  suivant le même correctif si besoin.
- Fichier modifié : `event/[id]/page.tsx` (`ProgrammeSection`).

### 11/09 — Même correctif appliqué au Menu + réordonnancement du parcours (Aperçu en étape 10)
- `MenuSection` (`event.menuImage`) avait exactement le même problème que
  `ProgrammeSection` (image encartée au lieu de plein écran) — même
  correctif appliqué : quand un visuel Canva est importé, section plein
  écran `100svh`, `object-fit:contain`, sans titre/label superposés.
  Comportement texte (liste du menu) inchangé en l'absence de visuel.
- Réordonnancement du parcours du builder : "Aperçu du site" passe de
  l'étape 8 à l'étape 10 (dernière), après Galerie (8) et Personnalisation
  (9) — logique : on prévisualise une fois tout le contenu ET le style en
  place, pas avant. Nouvel ordre : Informations → Page d'accueil → Invités
  → Plan de table → Menu → Programme → QR Code → Galerie →
  Personnalisation → Aperçu du site.
- Deux tableaux devaient rester synchronisés (même ordre, même longueur) :
  `BUILDER_STEPS_DEFAULT` (`types.ts`) et `STEPS` (`EventWizard.tsx`, liste
  de clés utilisée pour l'index courant/navigation) — les deux mis à jour.
  Aucune autre logique ne dépendait de l'ancien ordre (navigation
  suivant/précédent, progression, numérotation : tout dérive dynamiquement
  de ces tableaux, rien de codé en dur).
- Vérifié (Playwright) : ordre affiché dans la sidebar admin conforme,
  navigation "Suivant" depuis Personnalisation mène bien à Aperçu du site
  (dernière étape, bouton "Suivant" désactivé une fois dessus), rendu
  plein écran du visuel Menu conforme à Programme/Hero.
- Fichiers modifiés : `types.ts` (`BuilderStepKey`, `BUILDER_STEPS_DEFAULT`),
  `EventWizard.tsx` (`STEPS`), `event/[id]/page.tsx` (`MenuSection`).
