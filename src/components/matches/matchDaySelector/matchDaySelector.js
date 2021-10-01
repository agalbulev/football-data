import React, { useState, useEffect } from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";

const MatchDaySelector = ({ count, current, onChange }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selected, setSelected] = useState(1);

    useEffect(() => {
        setSelected(current);
    }, [current])

    const toggle = () => {
        setDropdownOpen(dropdownOpen => !dropdownOpen);
    }

    const select = round => {
        setSelected(round);

        if (onChange) {
            onChange(round);
        }
    }

    let i = 0;
    const rounds = [];

    if (count) {
        while (i !== count) {
            rounds.push(i + 1);
            i++;
        }
    }

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle className="dropdown-toggle">
                Кръг {selected}
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu">
                {
                    rounds && rounds.length !== 0 &&
                    rounds.map(round => (
                        <DropdownItem
                            key={round}
                            active={selected === round}
                            onClick={() => select(round)}
                        >
                            Кръг {round}
                        </DropdownItem>
                    ))
                }
            </DropdownMenu>
        </Dropdown>
    )
}

export default MatchDaySelector
