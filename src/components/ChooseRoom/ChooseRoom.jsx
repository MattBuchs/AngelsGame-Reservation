import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatNameForUrl } from "../../utils/formatNameForUrl";

export default function ChooseRoom({ roomName }) {
    const navigate = useNavigate();
    const { roomsData } = useSelector((state) => state.rooms);

    const handleChange = (e) => {
        const value = e.target.value;

        if (!value) return navigate("/");
        navigate(`/room/${value}`);
    };

    return (
        <div>
            <select
                name="rooms"
                id="room-select"
                onChange={handleChange}
                value={roomName}
            >
                <option value="">Toutes les salles</option>
                {roomsData &&
                    roomsData.map((room) => (
                        <option
                            key={room.room_id}
                            value={formatNameForUrl(room.name)}
                        >
                            {room.name}
                        </option>
                    ))}
            </select>
        </div>
    );
}
