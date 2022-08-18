import React from "react";
import { UilEllipsisH } from "@iconscout/react-unicons";
import { UilSearch } from "@iconscout/react-unicons";
import { UilLocationPoint } from '@iconscout/react-unicons';
import { UilMultiply } from '@iconscout/react-unicons';
import { toast } from "react-toastify";

export default function Header({ setQuery }) {

    const [city, setCity] = React.useState("");
    const [ isSearching, setIsSearching ] = React.useState(false);

    function handleInputChange() {
        if (city !== "") setQuery({ q: city });
    };

    const handleLocationClick = () => {
        if (navigator.geolocation) {
        toast.info("Fetching users location.");
        navigator.geolocation.getCurrentPosition((position) => {
            toast.success("Location fetched!");
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            setQuery({
            lat,
            lon,
            });
        });
        }
    }

    function handleClickSearch() {
        setIsSearching(prevIsSearching => (!prevIsSearching));
    };

    function handleKeyDown(event) {
        console.log(event.key);
        if (event.key === "Enter") {
            handleInputChange();
        } else if (event.key === "Escape") {
            handleClickSearch();
        }
    };

    return (
        <header>
            {
                isSearching ?
                <div className="header--search_container">
                    <input 
                        className="header--search_input" 
                        value={city}
                        onChange={(e) => {setCity(e.currentTarget.value);}}
                        onKeyDown={handleKeyDown}
                        type="text"
                        placeholder="Search for a city..." 
                    />
                    <div className="header--search_icons">
                        <UilLocationPoint className="header--icons" onClick={handleLocationClick} />
                        <UilSearch className="header--icons" onClick={handleInputChange} />
                        <UilMultiply className="header--icons" onClick={handleClickSearch} />
                    </div>
                </div> :
                <>
                    <UilEllipsisH className="header--buttons" />
                    <UilSearch className="header--buttons" onClick={handleClickSearch} />
                </>
            }
        </header>
    );
};