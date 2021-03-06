import { WEAPON_LIST } from "./consts";

import "./styles/WeaponSelector.css";

function WeaponSelector({ value, disabled, handleClick }) {
    const weapons = WEAPON_LIST;
    const buttons = weapons.map(weapon => {
        const isDisabled = disabled && disabled.includes(weapon);
        const imgPath = `${process.env.PUBLIC_URL}/img/filter/weapon_${weapon}.png`;
        return (
            <div
                className={`WeaponSelector-GlowRadio ${
                    isDisabled && "disabled"
                }`}
                data-name="weapon"
                data-value={weapon}
                key={weapon}
                onClick={!isDisabled ? handleClick : null}
            >
                <img
                    className={`WeaponSelector-GlowRadioIcon  ${
                        value === weapon ? "selected" : ""
                    } `}
                    src={imgPath}
                    alt={`${weapon}`}
                />
            </div>
        );
    });
    return <div className="WeaponSelector">{buttons}</div>;
}

export default WeaponSelector;
