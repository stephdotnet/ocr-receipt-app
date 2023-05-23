const system = {
  'system.save': 'Enregister',
  'system.delete': 'Supprimer',
  'system.confirm': 'Confirmer',
  'system.cancel': 'Annuler',
  'system.accept_permissions': 'Veuillez accepter les permissions',
};

const pages = {
  'home.title': 'OCR Receipt',
  'home.caption': 'Scannez ou importez votre ticket de caisse.',
  'home.file.error': "Une erreur est survenue lors de l'importation du fichier.",
  'home.upload.from_gallery': 'Charger depuis la gallerie',
  'home.upload.from_camera': 'Prendre en photo',
  'home.upload.cta': 'Ajouter un fichier',
  'home.send.caption': 'Envoyez votre ticket de caisse pour analyse.',
  'home.send.cta': 'Envoyer',
  'receipt.no_found': 'Aucun ticket de caisse trouvé.',
  'receipt.date_caption': 'Le {{date}}',
  'product.dialog.delete.title': 'Confirmation de suppression',
  'product.dialog.delete.content': 'Etes-vous sûr de vouloir supprimer ce produit ?',
  'login.email': 'Email',
  'login.password': 'Mot de passe',
  'login.submit': 'Se connecter',
};

export default {
  ...system,
  ...pages,
};
