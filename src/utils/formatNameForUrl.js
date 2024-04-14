export const formatNameForUrl = (name) => {
    // Supprime les accents et autres caractères spéciaux
    const normalized = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    // Convertit en minuscules et remplace les espaces par des tirets
    const urlFriendlyName = normalized.toLowerCase().replace(/\s+/g, "-");
    return urlFriendlyName;
};
