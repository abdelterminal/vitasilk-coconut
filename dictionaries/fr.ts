// French is the source of truth for the dictionary shape — `ar.ts` is typed
// against `Dict`, so the two files stay structurally locked together.
//
// Price-bearing strings are FUNCTIONS taking an already-formatted price. Never
// hardcode a price here: it would silently desync from `lib/config.ts`.
//
// POSITIONING FOR THIS SKU IS COCONUT-FIRST, AND THE ARGUMENT IS PENETRATION.
// Each Vitasilk page needs a spine of its own or the four cannibalise each
// other: 24K leads on luxury, Blue Silk on Moroccan argan, Coffee Extract on
// Amazon sourcing. This one leads on the one thing coconut oil does that other
// oils do not — its lauric acid has a small enough molecule to enter the hair
// shaft rather than sit on it. Sweet almond layers softness on top, the
// Brazilian protein rebuilds, and frizz control is the visible result.
//
// Keep that order everywhere: coconut penetrates → almond softens → protein
// rebuilds → frizz stops. The `problem` section's whole argument depends on it.
//
// The product name stays in Latin letters in both languages — "Coconut
// Smooth" is what is printed on the bottle the customer receives.

export const fr = {
  announce: "Livraison gratuite partout au Maroc — Paiement à la livraison",
  nav: { brand: "Vitasilk", cta: "Commander" },
  hero: {
    eyebrow: "Vitasilk Professional",
    title1: "Coconut",
    title2: "Smooth",
    subtitle:
      "L'huile de coco pénètre la fibre au lieu de la couvrir. L'amande douce l'adoucit, la protéine brésilienne la reconstruit — et les frisottis n'ont plus de prise. Sans formol.",
    cta: (price: string) => `Je commande — ${price}`,
    badge1: "0% Formol",
    badge2: "1 L — Format Salon",
    badge3: "Coco & Amande Douce",
    scroll: "Découvrir",
  },
  marquee: [
    "Huile de coco",
    "Huile d'amande douce",
    "Protéine brésilienne",
    "Complexe anti-frizz",
    "Sans formol",
    "Format salon 1 L",
  ],
  problem: {
    title: "La plupart des huiles ne rentrent jamais dans le cheveu. Elles restent dessus.",
    subtitle:
      "C'est pour ça qu'on peut enchaîner les bains d'huile sans rien changer en profondeur : le fer, le soleil, l'eau calcaire et la coloration vident la fibre, et une huile qui reste en surface ne la remplit pas. Elle fait briller un cheveu qui reste creux.",
    points: [
      "Frisottis qui repartent dès la première humidité",
      "Cheveux secs et rêches malgré les masques",
      "Longueurs ternes qui gonflent au lieu de tomber",
      "Pointes cassantes et démêlage difficile",
    ],
    promiseTitle: "La promesse Coconut Smooth",
    promise:
      "L'huile de coco est l'exception : son acide laurique a une molécule assez petite pour franchir l'écaille et nourrir la fibre de l'intérieur. L'amande douce vient assouplir, la protéine brésilienne comble les brèches, et le complexe anti-frizz referme l'ensemble. On nourrit d'abord en profondeur — la brillance suit toute seule.",
  },
  safety: {
    title: "Sans formol. Sans acide glyoxylique.",
    subtitle:
      "Un soin nourrissant professionnel que vous pouvez répéter sereinement, saison après saison.",
    items: [
      {
        title: "Sans formol",
        desc: "Pas de vapeurs irritantes pour les yeux ni pour les voies respiratoires.",
      },
      {
        title: "Sans acide glyoxylique",
        desc: "Aucune des substances mises en cause dans les lissages agressifs.",
      },
      {
        title: "Tous types de cheveux",
        desc: "Colorés, méchés, bouclés ou naturels — la coco nourrit sans alourdir.",
      },
    ],
  },
  ingredients: {
    eyebrow: "La formule",
    title: "La coco nourrit en profondeur, l'amande adoucit en surface",
    subtitle:
      "Six actifs qui travaillent dans l'ordre : nourrir le cœur de la fibre, puis la reconstruire, et refermer par-dessus.",
    items: [
      {
        name: "Huile de coco",
        desc: "Sa molécule d'acide laurique franchit l'écaille et nourrit la fibre de l'intérieur — là où les autres huiles s'arrêtent.",
      },
      {
        name: "Huile d'amande douce",
        desc: "Riche en vitamine E : elle assouplit la longueur et laisse un toucher velouté, sans effet gras.",
      },
      {
        name: "Protéine brésilienne",
        desc: "Hydrolysée pour pénétrer la fibre et en combler les brèches, au lieu de la couvrir.",
      },
      {
        name: "Complexe anti-frizz",
        desc: "Il referme l'écaille et lisse la surface : l'humidité n'a plus de prise sur le cheveu.",
      },
      {
        name: "Kératine",
        desc: "La protéine dont le cheveu est fait : elle redonne du corps et de la résistance.",
      },
      {
        name: "Panthénol",
        desc: "Pro-vitamine B5 : retient l'hydratation au cœur du cheveu, lavage après lavage.",
      },
    ],
  },
  benefits: {
    title: "Pourquoi il fait la différence",
    subtitle: "Une formule professionnelle pensée pour des résultats visibles et durables",
    // order matches ICONS[] in components/Benefits.tsx
    items: [
      {
        title: "Anti-frizz qui tient",
        desc: "L'écaille se referme : les frisottis se calment et le brushing tient bien plus longtemps.",
      },
      {
        title: "Nutrition en profondeur",
        desc: "La coco nourrit le cœur de la fibre, là où les huiles classiques restent en surface.",
      },
      {
        title: "Douceur d'amande",
        desc: "Un toucher velouté dès le premier rinçage, et un démêlage qui ne se bat plus.",
      },
      {
        title: "Format Salon 1 L",
        desc: "Le vrai format professionnel : des dizaines d'applications, des mois d'utilisation.",
      },
    ],
  },
  brandStory: {
    eyebrow: "Coco & Amande",
    title: "Deux huiles, deux rôles",
    subtitle:
      "La coco travaille à l'intérieur de la fibre, l'amande douce à l'extérieur. C'est cette division du travail qui fait la différence avec un bain d'huile ordinaire — et c'est pour ça que le résultat tient après le rinçage au lieu de partir avec.",
  },
  beforeAfter: {
    title: "Avant / Après",
    subtitle: "Faites glisser pour voir la transformation",
    before: "Avant",
    after: "Après",
  },
  howto: {
    title: "3 gestes, résultat salon",
    steps: [
      {
        title: "Lavez",
        desc: "Lavez avec un shampooing clarifiant, puis essorez sans sécher complètement.",
      },
      {
        title: "Appliquez",
        desc: "Appliquez le Coconut Smooth mèche par mèche, laissez poser 20 à 40 minutes.",
      },
      {
        title: "Rincez & coiffez",
        desc: "Rincez, séchez, puis passez le fer pour sceller. Admirez la douceur.",
      },
    ],
  },
  testimonials: {
    title: "Elles l'ont adopté",
    subtitle: "+12 000 clientes satisfaites au Maroc",
    items: [
      {
        name: "Salma — Casablanca",
        text: "J'ai fait des bains d'huile de coco pendant des années sans grand résultat. Là c'est autre chose : mes cheveux sont doux à l'intérieur, pas juste brillants dessus.",
      },
      {
        name: "Imane — Rabat",
        text: "Ce qui m'a bluffée c'est qu'il ne graisse pas. J'ai les cheveux fins et j'avais peur que ça les alourdisse — au contraire, ils ont plus de mouvement.",
      },
      {
        name: "Khadija — Marrakech",
        text: "Je suis coiffeuse et je l'utilise en cabine toute la journée. Aucune vapeur qui pique, et l'odeur de coco fait que mes clientes le réclament.",
      },
      {
        name: "Sara — Tanger",
        text: "Avec l'humidité de Tanger, mes cheveux gonflaient à peine sortie de chez moi. Depuis le Coconut Smooth, ils restent lisses toute la journée.",
      },
    ],
  },
  offer: {
    title: "Offre spéciale",
    subtitle: "Stock limité — profitez du prix spécial",
    unit: "Coconut Smooth — Coco & Amande Douce 1 L",
    save: (pct: number) => `Économisez ${pct}%`,
    freeDelivery: "Livraison gratuite",
    cod: "Paiement à la livraison",
    guarantee: "Satisfaite ou remboursée",
    countdown: { title: "L'offre expire dans", h: "Heures", m: "Minutes", s: "Secondes" },
    cta: "Commander maintenant",
  },
  form: {
    title: "Commandez maintenant",
    subtitle:
      "Remplissez le formulaire — nous vous appelons pour confirmer. Paiement à la livraison.",
    name: "Nom complet",
    namePh: "Votre nom et prénom",
    phone: "Téléphone",
    phonePh: "06 XX XX XX XX",
    city: "Ville",
    cityPh: "Votre ville",
    qty: "Quantité",
    total: "Total",
    submit: "Confirmer ma commande",
    sending: "Envoi en cours…",
    successTitle: "Commande reçue !",
    successText:
      "Merci ! Notre équipe vous appellera très vite pour confirmer la livraison.",
    errorTitle: "L'envoi a échoué",
    errorText:
      "Vérifiez votre connexion et réessayez, ou commandez directement sur WhatsApp — votre commande est conservée.",
    retry: "Réessayer",
    whatsapp: "Commander sur WhatsApp",
    errors: {
      name: "Veuillez entrer votre nom",
      phone: "Numéro de téléphone invalide",
      city: "Veuillez entrer votre ville",
    },
  },
  faq: {
    title: "Questions fréquentes",
    items: [
      {
        q: "Contient-il du formol ou de l'acide glyoxylique ?",
        a: "Non, ni l'un ni l'autre. Le Coconut Smooth est un soin nourrissant et anti-frizz : il reconstruit et discipline la fibre sans ces substances et sans vapeurs irritantes.",
      },
      {
        q: "Est-ce que ça alourdit les cheveux fins ?",
        a: "Non. C'est justement l'intérêt de l'huile de coco : elle entre dans la fibre au lieu de s'accumuler dessus, donc elle nourrit sans laisser de film gras. Sur cheveux fins, appliquez à partir des mi-longueurs et allégez la quantité.",
      },
      {
        q: "Est-ce un lissage ou un soin ?",
        a: "C'est un soin nourrissant à effet anti-frizz. Il discipline nettement les frisottis et facilite le coiffage, mais son rôle premier est de nourrir et reconstruire la fibre — pas de transformer une chevelure bouclée en cheveux raides.",
      },
      {
        q: "Convient-il aux cheveux colorés ?",
        a: "Oui, et c'est même là qu'il est le plus utile : la coloration vide la fibre et soulève l'écaille, exactement ce que cette formule vient nourrir et refermer. Elle ne dégrade pas la couleur.",
      },
      {
        q: "À quelle fréquence l'utiliser ?",
        a: "Une application toutes les 4 à 6 semaines suffit. Sur cheveux très secs ou très abîmés, deux applications à quinze jours d'intervalle pour démarrer, puis on espace.",
      },
      {
        q: "Comment se passe la livraison ?",
        a: "Livraison gratuite partout au Maroc en 24 à 48h. Vous payez uniquement à la réception de votre commande.",
      },
    ],
  },
  footer: {
    tagline: "La nutrition de la coco et la douceur de l'amande, chez vous.",
    rights: "© 2026 Vitasilk Professional. Tous droits réservés.",
  },
  sticky: { cta: "Commander" },
};

export type Dict = typeof fr;
