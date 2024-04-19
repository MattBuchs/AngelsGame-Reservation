import DayManage from "../../components/ManageCalendar/DayManage.jsx";
import DayTable from "../../components/Table/DayTable.jsx";
import ChooseRoom from "../../components/ChooseRoom/ChooseRoom.jsx";
import { useEffect } from "react";

export default function Home() {
    useEffect(() => {
        document.title = `Réservation Angel's Game`;
    }, []);

    return (
        <div>
            <section className="text-center mt-4">
                <h2 className="text-lg italic mt-1">
                    Réservez votre Escape Game !
                </h2>
                <p className="mt-2">
                    Les réservations s’effectuent en ligne, jusqu’à 3 mois à
                    l’avance.
                </p>
                <p>Les disponibilités sont mises à jour en temps réel</p>
            </section>
            <section className="text-center mt-10">
                <ChooseRoom />
            </section>
            <section className="flex justify-center">
                <DayManage />
            </section>
            <section className="flex flex-col items-center">
                <DayTable />
            </section>
        </div>
    );
}
