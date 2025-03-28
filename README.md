# Projet Individuel - Valentin Saraiva

Ce projet est une application de formulaire réalisé dans le cadre d'un exercice pédagogique de Mastère 1 Expert developpement web à [Sophia Ynov Campus](www.ynov.com/campus/sophia) permettant la validation en temps réel des entrées utilisateur. Ce README vous guidera dans l'installation et l'utilisation de l'application.

## 🚀 Installation

Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé sur votre machine.

Clonez le dépôt et installez les dépendances avec npm :

```bash
npm install
```

## 🎯 Utilisation

### Démarrer l'application en local

Lancez le serveur de développement avec la commande :

```bash
npm start
```

L'application sera accessible à l'adresse : `http://localhost:3000/` (par défaut).

### Exécuter les tests

Pour exécuter les tests et valider le bon fonctionnement du projet :

```bash
npm test
```

## 🛠️ Vérification des données dans le localStorage

Après avoir soumis le formulaire, vous pouvez vérifier si les données ont été correctement enregistrées dans le **localStorage** en suivant ces étapes :

1. **Ouvrir les outils de développement du navigateur** :

   - Sur Google Chrome ou Edge : Appuyez sur `F12` ou faites un clic droit sur la page, puis sélectionnez **Inspecter**.
   - Allez dans l'onglet **Console**.

2. **Exécuter une commande dans la console** :

   - Tapez la commande suivante dans la console et appuyez sur Entrée :
     ```javascript
     console.log(localStorage.getItem("formData"));
     ```

3. **Vérifier les données affichées** :
   - Les données enregistrées dans le **localStorage** seront affichées sous forme de chaîne JSON

## 📦 Technologies utilisées

- **React** : Pour l'interface utilisateur
- **API Geo.Gouv** : Vérification des villes en France
- **Jest + Testing Library** : Pour les tests unitaires
- **GitHub Actions** : Automatisation du build et des tests
- **Jsoc** : Documentation du code

## 📚 Documentation

La documentation du projet est générée avec **JSDoc** et disponible à l'adresse suivante :  
[Documentation JSDoc](https://valentinsaraiva-mmi.github.io/my-app/docs/index.html)

## 📄 Licence

Ce projet est sous licence [MIT](https://choosealicense.com/licenses/mit/). Vous êtes libre de l'utiliser, le modifier et le partager

✉️ Pour toute question ou suggestion, n'hésitez pas à me contacter !
