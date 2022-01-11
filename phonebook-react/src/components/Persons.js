import React from 'react'

const Persons = ({ persons, keyword, deletion}) => {

    return (
        <div>
            {persons.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase()))
                .map(p => (
                    <li style={{ listStyle: 'none' }} key={p.id}>
                        {p.name} {p.number}
                    <button onClick={() => deletion(p.id)}>delete</button>
                    </li>
                ))}
        </div>
    )
}

export default Persons