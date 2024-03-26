import { getData } from "./features/rooms";
import spinner from "./assets/spinner.svg";
import { useDispatch, useSelector } from "react-redux";

function App() {
    const dispatch = useDispatch();
    const rooms = useSelector((state) => state.rooms);
    console.log(rooms);

    if (!rooms.roomsData && !rooms.loading && !rooms.error) {
        dispatch(getData());
    }

    let content;
    if (rooms.loading) {
        content = <img src={spinner} alt="Chargement en cours..." />;
    } else if (rooms.error) {
        content = <p className="text-red-600">Une erreur est survenue...</p>;
    } else if (rooms.roomsData) {
        content = rooms.roomsData.map((room) => (
            <div key={room.id}>
                <p>{room.name}</p>
                <img src={room.icon} alt="" className="w-6" />
            </div>
        ));
    }

    return <div>{content}</div>;
}

export default App;
