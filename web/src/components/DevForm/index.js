import React, { useState, useEffect } from 'react';


import './styles.css';

function DevForm({ onSubmit }) {
    const [github_username, setUsername] = useState('');
    const [techs, setTechs] = useState('');

    const [lat, setLatitude] = useState('');
    const [lng, setLongitude] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                setLatitude(latitude);
                setLongitude(longitude);
            },
            (error) => {
                console.log(error)
            },
            {
                timeout: 30000,
            }
        );
    }, []);

    function resetFields() {
        setUsername('');
        setTechs('');
    }

    async function handleSubmit(e) {
        e.preventDefault();

        await onSubmit({
            github_username,
            techs,
            lat,
            lng
        });

        resetFields();
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-block">
                <label htmlFor="github_username">Usuário do GitHub</label>
                <input
                    name="github_username"
                    id="github_username"
                    required
                    value={github_username}
                    onChange={e => setUsername(e.target.value)}
                />
            </div>

            <div className="input-block">
                <label htmlFor="techs">Tecnologias</label>
                <input
                    name="techs"
                    id="techs"
                    required
                    value={techs}
                    onChange={e => setTechs(e.target.value)}
                />
            </div>

            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="lat">Latitude</label>
                    <input
                        type="number"
                        name="lat"
                        id="lat"
                        required
                        value={lat}
                        onChange={e => setLatitude(e.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="lng">Longitude</label>
                    <input
                        type="number"
                        name="lng"
                        id="lng"
                        required
                        value={lng}
                        onChange={e => setLongitude(e.target.value)}
                    />
                </div>
            </div>

            <button type="submit">Salvar</button>
        </form>
    );
}

export default DevForm;