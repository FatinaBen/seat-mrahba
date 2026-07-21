# Seat & Mrahba

## C'est quoi
Service digital pour événements au Maroc (mariages, corporate).
Un seul QR code, affiché à l'entrée de l'événement, scanné par tous les invités.
Le QR mène vers un mini-site événement (plan de table, menu, programme, galerie photo).

## Formules
- **Formule 1 (Essentielle)** : mini-site personnalisé + plan de table digitalisé
- **Formule 2 (Complète)** : Formule 1 + menu (PDF) + programme (PDF) + galerie photo
- **Option transversale** : personnalisation du support physique du QR code — sur devis, quelle que soit la formule

## Les 3 briques du produit
1. **Site vitrine** — présentation/vente du service (déjà fait à ~90%, modifications ponctuelles à venir, non listées pour l'instant)
2. **Dashboard** — outil interne, utilisé UNIQUEMENT par moi (pas par le client). Le client envoie ses infos via formulaire + Excel, je saisis/importe dans le dashboard.
3. **Site invité (mini-site généré)** — accessible via le QR unique, généré à partir des données du dashboard

## Règles importantes à ne jamais casser
- Le dashboard est mon outil (admin), pas celui du client final.
- Menu et Programme = **upload de PDF (designé sur Canva)**, PAS de texte généré/saisi automatiquement. Le dashboard doit permettre l'upload d'un fichier PDF par section, affiché tel quel (viewer PDF) sur le mini-site.
- Menu/Programme/Galerie = **toggles actif/inactif** dans le dashboard, selon la formule du client.
- Plan de table = recherche par **Nom + Prénom** (barre de recherche) → affichage d'un **plan de salle visuel global**, avec la table de l'invité mise en couleur différente + texte en haut "Vous êtes à la table X". Ne pas remplacer par une simple liste texte.
- Import du plan de table se fait via **fichier Excel** (voir template dans MEMORY.md), génération automatique des tables à partir de ce fichier.
- Ne pas ajouter de complexité non demandée (pas de compte invité, pas de connexion invité — le parcours doit rester simple : scan → recherche nom → résultat).

## Exigence design : niveau "premium", pas juste fonctionnel
- Le mini-site et le dashboard doivent viser un rendu haut de gamme (mariage, événement soigné), pas un template générique.
- La personnalisation ne doit PAS se limiter à couleur + police + arrondis : ce sont des réglages superficiels qui ne suffisent pas à un rendu premium (constat après test réel, session du 17/07).
- Toute image de couverture/logo uploadée sert de **fond visuel global sur tout le mini-site** (pas seulement l'écran d'accueil), avec un **overlay** (dégradé semi-transparent, couleurs du thème) posé par-dessus pour garantir la lisibilité du texte.
- Prévoir un rendu par défaut soigné (texture/motif discret) quand aucune image n'est uploadée — jamais un simple fond dégradé plat.
- Le dashboard de personnalisation doit tendre vers un **aperçu en direct** du rendu (preview live), pas des réglages à l'aveugle.
- Voir MEMORY.md section "Design & personnalisation" pour le détail des constats et décisions en cours.

## Structure du mini-site invité (scroll vertical, dans cet ordre)
1. Écran d'accueil : "Bienvenue à [nom événement]"
2. Plan de table (recherche + plan visuel)
3. Sections actives selon toggles : Menu / Programme / Galerie
4. Footer : contact (email + Instagram)

## État d'avancement
Voir MEMORY.md pour le détail complet des décisions produit et le suivi des sessions de dev.

## Convention de travail
- Avant toute modification de structure ou de logique existante, résumer ce qui va changer et pourquoi.
- Toujours mettre à jour MEMORY.md (section "Journal des sessions") en fin de session de travail importante.
- Ne pas régénérer de zéro une partie qui fonctionne déjà — corriger/ajuster seulement ce qui est demandé.
