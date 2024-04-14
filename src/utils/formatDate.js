export const formatDate = (
    dateString,
    dayOfWeekDisplayed = true,
    dayDisplayed = true,
    monthDisplayed = true,
    yearDisplayed = true
) => {
    // Analyse la chaîne de date pour obtenir l'année, le mois et le jour
    const [year, month, day] = dateString.split("-");

    // Crée un objet de date avec les valeurs obtenues
    const date = new Date(year, month - 1, day);

    // Obtient le nom du jour de la semaine
    const days = [
        "Dimanche",
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi",
    ];
    const dayOfWeek = days[date.getDay()];

    // Obtient le nom du mois
    const months = [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
    ];
    const monthName = months[date.getMonth()];

    // Retourne la date formatée
    return `${dayOfWeekDisplayed ? dayOfWeek : ""} ${dayDisplayed ? day : ""} ${
        monthDisplayed ? monthName : ""
    } ${yearDisplayed ? year : ""}`;
};
