import Table from "./components/Table/Table.jsx";
import ManageCalendar from "./components/ManageCalendar/ManageCalendar.jsx";

function App() {
    return (
        <div>
            <h1>Réservez votre Escape Game !</h1>
            <p>
                Les réservations s’effectuent en ligne, jusqu’à 3 mois à
                l’avance.
            </p>
            <p>Les disponibilités sont mises à jour en temps réel</p>
            <ManageCalendar />
            <Table />
        </div>
    );
}

export default App;
