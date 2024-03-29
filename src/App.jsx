import Table from "./components/Table/Table.jsx";
import ManageCalendar from "./components/ManageCalendar/ManageCalendar.jsx";

function App() {
    return (
        <div>
            <h1>Réserver votre salle !</h1>
            <ManageCalendar />
            <Table />
        </div>
    );
}

export default App;
