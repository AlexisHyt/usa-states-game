export interface Department {
  name: string;
  code: string;
  prefecture: string;
  largestCity: string;
}

export const departments: Department[] = [
  { name: "Ain", code: "01", prefecture: "Bourg-en-Bresse", largestCity: "Bourg-en-Bresse" },
  { name: "Aisne", code: "02", prefecture: "Laon", largestCity: "Saint-Quentin" },
  { name: "Allier", code: "03", prefecture: "Moulins", largestCity: "Montluçon" },
  { name: "Alpes-de-Haute-Provence", code: "04", prefecture: "Digne-les-Bains", largestCity: "Manosque" },
  { name: "Hautes-Alpes", code: "05", prefecture: "Gap", largestCity: "Gap" },
  { name: "Alpes-Maritimes", code: "06", prefecture: "Nice", largestCity: "Nice" },
  { name: "Ardèche", code: "07", prefecture: "Privas", largestCity: "Annonay" },
  { name: "Ardennes", code: "08", prefecture: "Charleville-Mézières", largestCity: "Charleville-Mézières" },
  { name: "Ariège", code: "09", prefecture: "Foix", largestCity: "Pamiers" },
  { name: "Aube", code: "10", prefecture: "Troyes", largestCity: "Troyes" },
  { name: "Aude", code: "11", prefecture: "Carcassonne", largestCity: "Narbonne" },
  { name: "Aveyron", code: "12", prefecture: "Rodez", largestCity: "Rodez" },
  { name: "Bouches-du-Rhône", code: "13", prefecture: "Marseille", largestCity: "Marseille" },
  { name: "Calvados", code: "14", prefecture: "Caen", largestCity: "Caen" },
  { name: "Cantal", code: "15", prefecture: "Aurillac", largestCity: "Aurillac" },
  { name: "Charente", code: "16", prefecture: "Angoulême", largestCity: "Angoulême" },
  { name: "Charente-Maritime", code: "17", prefecture: "La Rochelle", largestCity: "La Rochelle" },
  { name: "Cher", code: "18", prefecture: "Bourges", largestCity: "Bourges" },
  { name: "Corrèze", code: "19", prefecture: "Tulle", largestCity: "Brive-la-Gaillarde" },
  { name: "Corse-du-Sud", code: "2A", prefecture: "Ajaccio", largestCity: "Ajaccio" },
  { name: "Haute-Corse", code: "2B", prefecture: "Bastia", largestCity: "Bastia" },
  { name: "Côte-d'Or", code: "21", prefecture: "Dijon", largestCity: "Dijon" },
  { name: "Côtes-d'Armor", code: "22", prefecture: "Saint-Brieuc", largestCity: "Saint-Brieuc" },
  { name: "Creuse", code: "23", prefecture: "Guéret", largestCity: "Guéret" },
  { name: "Dordogne", code: "24", prefecture: "Périgueux", largestCity: "Périgueux" },
  { name: "Doubs", code: "25", prefecture: "Besançon", largestCity: "Besançon" },
  { name: "Drôme", code: "26", prefecture: "Valence", largestCity: "Valence" },
  { name: "Eure", code: "27", prefecture: "Évreux", largestCity: "Évreux" },
  { name: "Eure-et-Loir", code: "28", prefecture: "Chartres", largestCity: "Chartres" },
  { name: "Finistère", code: "29", prefecture: "Quimper", largestCity: "Brest" },
  { name: "Gard", code: "30", prefecture: "Nîmes", largestCity: "Nîmes" },
  { name: "Haute-Garonne", code: "31", prefecture: "Toulouse", largestCity: "Toulouse" },
  { name: "Gers", code: "32", prefecture: "Auch", largestCity: "Auch" },
  { name: "Gironde", code: "33", prefecture: "Bordeaux", largestCity: "Bordeaux" },
  { name: "Hérault", code: "34", prefecture: "Montpellier", largestCity: "Montpellier" },
  { name: "Ille-et-Vilaine", code: "35", prefecture: "Rennes", largestCity: "Rennes" },
  { name: "Indre", code: "36", prefecture: "Châteauroux", largestCity: "Châteauroux" },
  { name: "Indre-et-Loire", code: "37", prefecture: "Tours", largestCity: "Tours" },
  { name: "Isère", code: "38", prefecture: "Grenoble", largestCity: "Grenoble" },
  { name: "Jura", code: "39", prefecture: "Lons-le-Saunier", largestCity: "Dole" },
  { name: "Landes", code: "40", prefecture: "Mont-de-Marsan", largestCity: "Mont-de-Marsan" },
  { name: "Loir-et-Cher", code: "41", prefecture: "Blois", largestCity: "Blois" },
  { name: "Loire", code: "42", prefecture: "Saint-Étienne", largestCity: "Saint-Étienne" },
  { name: "Haute-Loire", code: "43", prefecture: "Le Puy-en-Velay", largestCity: "Le Puy-en-Velay" },
  { name: "Loire-Atlantique", code: "44", prefecture: "Nantes", largestCity: "Nantes" },
  { name: "Loiret", code: "45", prefecture: "Orléans", largestCity: "Orléans" },
  { name: "Lot", code: "46", prefecture: "Cahors", largestCity: "Cahors" },
  { name: "Lot-et-Garonne", code: "47", prefecture: "Agen", largestCity: "Agen" },
  { name: "Lozère", code: "48", prefecture: "Mende", largestCity: "Mende" },
  { name: "Maine-et-Loire", code: "49", prefecture: "Angers", largestCity: "Angers" },
  { name: "Manche", code: "50", prefecture: "Saint-Lô", largestCity: "Cherbourg-en-Cotentin" },
  { name: "Marne", code: "51", prefecture: "Châlons-en-Champagne", largestCity: "Reims" },
  { name: "Haute-Marne", code: "52", prefecture: "Chaumont", largestCity: "Saint-Dizier" },
  { name: "Mayenne", code: "53", prefecture: "Laval", largestCity: "Laval" },
  { name: "Meurthe-et-Moselle", code: "54", prefecture: "Nancy", largestCity: "Nancy" },
  { name: "Meuse", code: "55", prefecture: "Bar-le-Duc", largestCity: "Verdun" },
  { name: "Morbihan", code: "56", prefecture: "Vannes", largestCity: "Lorient" },
  { name: "Moselle", code: "57", prefecture: "Metz", largestCity: "Metz" },
  { name: "Nièvre", code: "58", prefecture: "Nevers", largestCity: "Nevers" },
  { name: "Nord", code: "59", prefecture: "Lille", largestCity: "Lille" },
  { name: "Oise", code: "60", prefecture: "Beauvais", largestCity: "Beauvais" },
  { name: "Orne", code: "61", prefecture: "Alençon", largestCity: "Alençon" },
  { name: "Pas-de-Calais", code: "62", prefecture: "Arras", largestCity: "Calais" },
  { name: "Puy-de-Dôme", code: "63", prefecture: "Clermont-Ferrand", largestCity: "Clermont-Ferrand" },
  { name: "Pyrénées-Atlantiques", code: "64", prefecture: "Pau", largestCity: "Pau" },
  { name: "Hautes-Pyrénées", code: "65", prefecture: "Tarbes", largestCity: "Tarbes" },
  { name: "Pyrénées-Orientales", code: "66", prefecture: "Perpignan", largestCity: "Perpignan" },
  { name: "Bas-Rhin", code: "67", prefecture: "Strasbourg", largestCity: "Strasbourg" },
  { name: "Haut-Rhin", code: "68", prefecture: "Colmar", largestCity: "Mulhouse" },
  { name: "Rhône", code: "69", prefecture: "Lyon", largestCity: "Lyon" },
  { name: "Haute-Saône", code: "70", prefecture: "Vesoul", largestCity: "Vesoul" },
  { name: "Saône-et-Loire", code: "71", prefecture: "Mâcon", largestCity: "Chalon-sur-Saône" },
  { name: "Sarthe", code: "72", prefecture: "Le Mans", largestCity: "Le Mans" },
  { name: "Savoie", code: "73", prefecture: "Chambéry", largestCity: "Chambéry" },
  { name: "Haute-Savoie", code: "74", prefecture: "Annecy", largestCity: "Annecy" },
  { name: "Paris", code: "75", prefecture: "Paris", largestCity: "Paris" },
  { name: "Seine-Maritime", code: "76", prefecture: "Rouen", largestCity: "Le Havre" },
  { name: "Seine-et-Marne", code: "77", prefecture: "Melun", largestCity: "Meaux" },
  { name: "Yvelines", code: "78", prefecture: "Versailles", largestCity: "Versailles" },
  { name: "Deux-Sèvres", code: "79", prefecture: "Niort", largestCity: "Niort" },
  { name: "Somme", code: "80", prefecture: "Amiens", largestCity: "Amiens" },
  { name: "Tarn", code: "81", prefecture: "Albi", largestCity: "Albi" },
  { name: "Tarn-et-Garonne", code: "82", prefecture: "Montauban", largestCity: "Montauban" },
  { name: "Var", code: "83", prefecture: "Toulon", largestCity: "Toulon" },
  { name: "Vaucluse", code: "84", prefecture: "Avignon", largestCity: "Avignon" },
  { name: "Vendée", code: "85", prefecture: "La Roche-sur-Yon", largestCity: "La Roche-sur-Yon" },
  { name: "Vienne", code: "86", prefecture: "Poitiers", largestCity: "Poitiers" },
  { name: "Haute-Vienne", code: "87", prefecture: "Limoges", largestCity: "Limoges" },
  { name: "Vosges", code: "88", prefecture: "Épinal", largestCity: "Épinal" },
  { name: "Yonne", code: "89", prefecture: "Auxerre", largestCity: "Auxerre" },
  { name: "Territoire de Belfort", code: "90", prefecture: "Belfort", largestCity: "Belfort" },
  { name: "Essonne", code: "91", prefecture: "Évry-Courcouronnes", largestCity: "Évry-Courcouronnes" },
  { name: "Hauts-de-Seine", code: "92", prefecture: "Nanterre", largestCity: "Boulogne-Billancourt" },
  { name: "Seine-Saint-Denis", code: "93", prefecture: "Bobigny", largestCity: "Saint-Denis" },
  { name: "Val-de-Marne", code: "94", prefecture: "Créteil", largestCity: "Créteil" },
  { name: "Val-d'Oise", code: "95", prefecture: "Cergy", largestCity: "Argenteuil" }
  // { name: "Guadeloupe", code: "971", prefecture: "Basse-Terre", largestCity: "Les Abymes" },
  // { name: "Martinique", code: "972", prefecture: "Fort-de-France", largestCity: "Fort-de-France" },
  // { name: "Guyane", code: "973", prefecture: "Cayenne", largestCity: "Cayenne" },
  // { name: "La Réunion", code: "974", prefecture: "Saint-Denis", largestCity: "Saint-Denis" },
  // { name: "Mayotte", code: "976", prefecture: "Mamoudzou", largestCity: "Mamoudzou" }
];