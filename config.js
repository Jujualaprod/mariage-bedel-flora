/* =====================================================================
   CONFIGURATION DE L'INVITATION — Bedel & Flora
   ---------------------------------------------------------------------
   C'est ici que vous modifiez TOUS les textes du site.
   Gardez les guillemets "..." et les virgules. N'utilisez pas le
   caractère < dans vos textes. Enregistrez, puis rechargez la page.
   ===================================================================== */

window.INVITATION = {

  /* ---------- LES MARIÉS ---------- */
  couple: {
    prenom1: "Bedel",
    prenom2: "Flora",
    initiales: "B&F",              // affiché sur le cachet de cire
    hashtag: "#BedelEtFlora"
  },

  /* ---------- LA DATE ---------- */
  date: {
    // Date et heure du compte à rebours (heure de la Côte d'Ivoire = +00:00).
    // À MODIFIER si l'heure de début est différente.
    iso: "2026-12-05T10:00:00+00:00",
    court: "05 · 12 · 2026",
    longue: "Samedi 5 décembre 2026"
  },

  /* ---------- L'ENVELOPPE D'OUVERTURE ---------- */
  ouverture: {
    indice: "Une invitation vous attend",
    bouton: "Ouvrir notre invitation",
    carteSurtitre: "Mariage"
  },

  /* ---------- 1. ACCUEIL ---------- */
  accueil: {
    photo: "photos/accueil.jpg",
    surtitre: "Nous nous marions",
    lieu: "Gagnoa · Côte d'Ivoire",
    phrase: "Nous avons la joie de vous inviter à célébrer le plus beau jour de notre vie, entourés de celles et ceux que nous aimons.",
    compteur: {
      jours: "Jours",
      heures: "Heures",
      minutes: "Minutes",
      secondes: "Secondes",
      termine: "C'est aujourd'hui ! Merci d'être à nos côtés."
    },
    defiler: "Défiler"
  },

  /* ---------- 2. NOTRE HISTOIRE ---------- */
  // Le champ "date" est facultatif : laissez "" pour ne rien afficher,
  // ou écrivez par exemple "Mars 2020".
  histoire: {
    surtitre: "Notre histoire",
    titre: "Deux chemins, une même route",
    intro: "Quelques étapes qui nous ont menés jusqu'à ce grand jour.",
    etapes: [
      {
        date: "",
        label: "La rencontre",
        titre: "Quand nos chemins se croisent",
        texte: "Un regard, un sourire, et la sensation que quelque chose de simple et d'évident venait de commencer."
      },
      {
        date: "",
        label: "Le premier rendez-vous",
        titre: "Le début d'une évidence",
        texte: "Un peu de timidité, beaucoup de rires, et déjà la certitude de vouloir se revoir."
      },
      {
        date: "",
        label: "La demande",
        titre: "Un « oui » du fond du cœur",
        texte: "Une question, une émotion immense, et la promesse de construire ensemble toute une vie."
      }
    ]
  },

  /* ---------- 3. GALERIE ---------- */
  // Remplacez les fichiers dans le dossier "photos" en gardant les mêmes noms,
  // ou changez les chemins ci-dessous. Vous pouvez en mettre de 4 à 6.
  galerie: {
    surtitre: "Galerie",
    titre: "Nos plus beaux instants",
    intro: "",
    photos: [
      { src: "photos/galerie-1.jpg", alt: "Bedel et Flora, souvenir 1" },
      { src: "photos/galerie-2.jpg", alt: "Bedel et Flora, souvenir 2" },
      { src: "photos/galerie-3.jpg", alt: "Bedel et Flora, souvenir 3" },
      { src: "photos/galerie-4.jpg", alt: "Bedel et Flora, souvenir 4" },
      { src: "photos/galerie-5.jpg", alt: "Bedel et Flora, souvenir 5" }
    ]
  },

  /* ---------- 4. LE PROGRAMME ---------- */
  // Les horaires ci-dessous sont des exemples : adaptez-les.
  // "lieu" est facultatif (laissez "" pour ne rien afficher).
  programme: {
    surtitre: "Le programme",
    titre: "La journée du 5 décembre",
    intro: "",
    moments: [
      {
        heure: "09h00",
        titre: "Arrivée des invités",
        lieu: "Mairie de Gagnoa",
        texte: "Installez-vous et retrouvez-vous avant le début de la cérémonie."
      },
      {
        heure: "10h00",
        titre: "Cérémonie à la mairie",
        lieu: "Mairie de Gagnoa",
        texte: "Nous échangeons nos consentements devant la loi, entourés de nos proches."
      },
      {
        heure: "11h00",
        titre: "Fin de la cérémonie à la mairie",
        lieu: "",
        texte: "Un moment pour féliciter les mariés avant de rejoindre la suite de la journée."
      },
      {
        heure: "11h30",
        titre: "Séance photos",
        lieu: "Hôtel FOHIMAT, Gagnoa",
        texte: "De 11h30 à 12h00, immortalisons ensemble ces instants de joie."
      },
      {
        heure: "13h00",
        titre: "Bénédiction",
        lieu: "Église évangélique des AD de Babré, Temple Béthel",
        texte: "De 13h00 à 14h00, une bénédiction pour sceller notre union devant Dieu."
      },
      {
        heure: "14h00",
        titre: "Réception",
        lieu: "Église évangélique des AD de Babré, Temple Béthel",
        texte: "De 14h00 à 18h00, partageons un moment de convivialité au même endroit."
      }
    ]
  },

  /* ---------- 5. LE LIEU ---------- */
  // "recherche" = ce qui est tapé dans Google Maps. Pour être plus précis,
  // remplacez-le par l'adresse exacte ou le nom exact du lieu sur Google Maps.
  lieu: {
    surtitre: "Le lieu",
    titre: "Où nous retrouver",
    intro: "Trois lieux pour une même journée, tous à Gagnoa.",
    bouton: "Ouvrir l'itinéraire",
    lieux: [
      {
        onglet: "Mairie",
        nom: "Mairie de Gagnoa",
        role: "Cérémonie civile",
        adresse: "Gagnoa, Côte d'Ivoire",
        recherche: "Mairie de Gagnoa, Côte d'Ivoire"
      },
      {
        onglet: "Hôtel",
        nom: "Hôtel FOHIMAT",
        role: "Séance photos",
        adresse: "Gagnoa, Côte d'Ivoire",
        recherche: "6.1593191995501915, -5.945404089303234"
      },
      {
        onglet: "Église",
        nom: "Église évangélique des AD de Babré, Temple Béthel",
        role: "Bénédiction et réception",
        adresse: "Babré, Gagnoa, Côte d'Ivoire",
        recherche: "6.14308649530553, -5.941952444862792"
      }
    ]
  },

  /* ---------- 6. TENUE ---------- */
  tenue: {
    surtitre: "Tenue",
    titre: "Élégance & couleurs",
    texte: "Nous vous invitons à vous habiller avec élégance, dans les teintes de notre journée.",
    couleurs: [
      { nom: "Bordeaux",  hex: "#6e1423" },
      { nom: "Beige",     hex: "#e3d2b8" },
      { nom: "Champagne", hex: "#c9ab7d" }
    ],
    note: "Merci de laisser le blanc à la mariée."
  },

  /* ---------- 7. CONFIRMER MA PRÉSENCE ---------- */
  rsvp: {
    surtitre: "Confirmer ma présence",
    titre: "Serez-vous des nôtres ?",
    texte: "Votre présence sera notre plus beau cadeau. Merci de nous confirmer votre venue avant le",
    dateLimite: "05 Décembre 2026",
    bouton: "Confirmer ma présence",
    // Collez ici le lien de votre formulaire (Google Forms, par exemple).
    lien: "https://docs.google.com/forms/d/e/1FAIpQLSf-QqE-Ab14hLfqo0H5eBQoE7eSxm8i4bNs7_oBARxBkoTR-g/viewform?usp=publish-editor",
    // Facultatif : numéro WhatsApp avec l'indicatif, sans + ni espaces (ex. "2250700000000").
    // Laissez "" pour ne rien afficher.
    whatsapp: "",
    contactTexte: "Une question ? Écrivez-nous sur WhatsApp"
  },

  /* ---------- 8. PIED DE PAGE ---------- */
  pied: {
    merci: "Merci de faire partie de notre histoire"
  }
};
