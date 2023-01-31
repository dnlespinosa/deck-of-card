import React, {useState, useEffect, useRef} from 'react'

const Card = ({ card }) => {
    

    return (
        <div>
            <p>{card.card}</p>
        </div>
    )
}

export default Card