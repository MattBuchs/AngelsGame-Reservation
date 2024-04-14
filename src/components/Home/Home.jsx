import DayManage from "../ManageCalendar/DayManage.jsx";
import DayTable from "../Table/DayTable.jsx";
import ChooseRoom from "../ChooseRoom/ChooseRoom.jsx";

export default function Home() {
    return (
        <div>
            <h2>Réservez votre Escape Game !</h2>
            <p>
                Les réservations s’effectuent en ligne, jusqu’à 3 mois à
                l’avance.
            </p>
            <p>Les disponibilités sont mises à jour en temps réel</p>
            <ChooseRoom />
            <DayManage />
            <DayTable />
        </div>
    );
}
