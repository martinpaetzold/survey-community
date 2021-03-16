import { useState, useEffect } from "react";
import axios from "./axios.js";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // console.log("use useEffect");
        let abort;

        (async () => {
            if (!query) {
                const { data } = await axios.get("/api/user/latest");
                console.log(data);
                if (!abort) {
                    setUsers(data);
                    console.log("data in find people", data);
                }
            } else {
                const { data } = await axios.get("/api/user/search/" + query);
                if (!abort) {
                    setUsers(data);
                    console.log("data in find people", data);
                }
            }
        })();

        return () => {
            console.log("Replace ${query} with " + query);
            abort = true;
        };
    }, [query]);

    return (
        <div>
            <h2>Find People</h2>
            <p>Bo...What was the name? Just try it.</p>
            <input
                placeholder="Search for.."
                onChange={(e) => setQuery(e.target.value)}
                className="profile-search-input"
            />
            <div>
                {users.map((users, idx) => (
                    <div key={idx} className="profile-search-results-wrap">
                        <Link to={"/user/" + users.id}>
                            {!users.profile_picture_url && (
                                <img
                                    src="../default-img.png"
                                    alt={`${users.firstname} ${users.lastname}`}
                                ></img>
                            )}
                            {users.profile_picture_url && (
                                <img
                                    src={users.profile_picture_url}
                                    alt={`${users.firstname} ${users.lastname}`}
                                ></img>
                            )}
                            <p>
                                {users.firstname} {users.lastname}
                            </p>
                        </Link>
                    </div>
                ))}
                {!users.length && query && <li>Sorry. Nothing found.</li>}
            </div>
        </div>
    );
}
