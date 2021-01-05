import React, {useState} from 'react';
import "./individualmarks.scss";
import data from "./data";
import SelectedTable from "./SelectedTable";


const studentsGroups = data.map((item, i) => {
    return (
        <option key={item.id} value={item.id}>
            Grupa: {item.id} {"----"} {item.subject}
        </option>
    )
})


const Form = () => {
    const [selectedOption, choicedSelectedOption] = useState(0);

    const handleChange = (e) => {
        choicedSelectedOption(e.target.value)
    }
    return (
        <>
            <div className="classChoice">
                <form>
                    <select value={selectedOption} onChange={handleChange}>
                        <option value={0}>WYBIERZ KLASĘ</option>
                        {studentsGroups}
                    </select>
                </form>
            </div>
            <div className="classTable">
                <SelectedTable selected={selectedOption}/>
            </div>
        </>
    );
};

export default Form;
