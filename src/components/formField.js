const FormField = (props) => {

//אבות טיפוס של פריטים בטופס הרשמה שלנו
    if (props.type === 'list') {
        return (
            <div className="field">
                <label>{props.name}</label>
                <datalist id={props.listId}>
                    {props.data.map(item => <option value={item.name}> {item.name} </option>)}
                </datalist>
                <input type="text" list={props.listId} onInput={(event) => { props.action(event.target.value) }} />
            </div>
        )
    }

    else if (props.type === 'file'){ //נוסף כאן תנאי לקבל רק קבצי jpeg
        return (
            <div className="field">
                <label>{props.name}</label>
                <input type={props.type} onChange={(event) => { props.action(event.target) }} />
                <img width="100px" src={props.targetImg} />
            </div>
        )
    }
/*
    else if (props.type ==='date'){
        return(
            <div className="field">
            <label>{"date"}</label>
            <DatePicker
            value={birthdate}
            defaultValue={new Date()}
            onChange={setbirthdate}
            minDate={new Date(1901, 1, 1)}
            maxDate={new Date()}
            placeholderText={"Select a date"}
            />
            </div>
        )
    }
*/

    else if (props.type === 'number'){
        return(
        <div className="field">
                <label>{props.name}</label>
                <input type={props.type} max="0599999999" onInput={(event) => { props.action(event.target.value) }} />
            </div>)
    }

    else {
        return (
            <div className="field">
                <label>{props.name}</label>
                <input type={props.type} onInput={(event) => { props.action(event.target.value) }} />
            </div>
        )
    }
}
export default FormField;