import axios from 'axios'
import React, {useState, useEffect, useRef} from 'react'
import Card from './Card'

const CardDeck = () => {
    const [deck, setDeck] = useState(null)
    const [drawnPile, setDrawnPile] = useState([])
    const [outOfCards, setOutOfCards] = useState(false)
    const timerId = useRef();

    let cardCount = 52
    
    useEffect(() => {
        async function getDeck() {
            let res =  await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            setDeck(res.data)
        }
        getDeck()
    }, [])

    useEffect(() => {
        async function getCard() {
            if (cardCount >= 0) {
                throw new Error('no cards left')
            } else {
                let deckId = deck.deck_id
                let res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
                const card = res.data.cards[0]

                setDrawnPile(drawn => [...drawn, {card: card.suit + card.value}])
            }
        }
        timerId.current = setInterval(() => {
            getCard();
        }, 1000)

    }, [deck])

    function checkPile() {
        cardCount -= 1
        if (cardCount >= 0) {
            setOutOfCards(true)
        }
        
    }

    return (
        <div>
            {!outOfCards && 
                <button onClick={checkPile}>DRAW CARD</button>}
            
            <div>
                {drawnPile.map(card => (
                    <Card card={card} />
                ))}
            </div>
        </div>
    )

}

export default CardDeck