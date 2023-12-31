import { useState, useEffect } from 'react'
import './index.css'
import Square from './components/Square'
import patterns from './utilz/patterns'

function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""])
  const [player, setPlayer] = useState('O')
  const [result, setResult] = useState({ winner: 'none', state: 'none' })

  useEffect(() => {
    checkWin()
    checkTie()
    if (player == 'X') {
      setPlayer('O')
    } else {
      setPlayer('X')
    }
  }, [board])

  useEffect(() => {
    if (result.state != 'none') {
      alert(`Game Finished! ${result.winner} won!`)
    }
  })

  const chooseSquare = (square) => {
    setBoard(board.map((val, i) => {
      if (i == square && val == '') {
        return player
      }
      return val
    }))
  }

  const checkWin = () => {
    patterns.forEach((currentPattern) => {
      const firstPlayer = board[currentPattern[0]]
      if (firstPlayer == '') return
      let foundWinningPattern = true
      currentPattern.forEach((i) => {
        if (board[i] != firstPlayer) {
          foundWinningPattern = false
        }
      })
      if (foundWinningPattern) {
        setResult({ winner: player, state: 'Won' })
      }
    })
  }

  const checkTie = () => {
    let filled = true
    board.forEach((square) => {
      if (square == '') {
        filled = false
      }
    })

    if (filled) {
      setResult({winner: 'No one', state: 'Tie'})
    }
  }

  return (
    <div className='app-container'>
      <div className="board">
        <div className="row">
          <Square val={board[0]} chooseSquare={() => {chooseSquare(0)}}/>
          <Square val={board[1]} chooseSquare={() => {chooseSquare(1)}}/>
          <Square val={board[2]} chooseSquare={() => {chooseSquare(2)}}/>
        </div>
        <div className="row">
          <Square val={board[3]} chooseSquare={() => {chooseSquare(3)}}/>
          <Square val={board[4]} chooseSquare={() => {chooseSquare(4)}}/>
          <Square val={board[5]} chooseSquare={() => {chooseSquare(5)}}/>
        </div>
        <div className="row">
          <Square val={board[6]} chooseSquare={() => {chooseSquare(6)}}/>
          <Square val={board[7]} chooseSquare={() => {chooseSquare(7)}}/>
          <Square val={board[8]} chooseSquare={() => {chooseSquare(8)}}/>
        </div>
      </div>
    </div>
  )
}

export default App
