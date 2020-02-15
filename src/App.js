import React, { useState, useEffect } from 'react'

import './App.css'

const getJson = json => {
  try {
    return JSON.parse(json)
  } catch (e) {
    return false
  }
}

const App = () => {
  const [input, setInput] = useState('')
  const [notes, setNotes] = useState([])

  const saveToLocal = data => {
    localStorage.setItem('notes', JSON.stringify(data))
  }

  const saveList = data => {
    saveToLocal(data)
    setNotes(data)
  }

  const addNote = () => {
    saveList([input, ...notes])
    setInput('')
  }

  const deleteNote = noteIndex => {
    const filterNotes = notes.filter((item, index) => index !== noteIndex)
    saveList(filterNotes)
  }

  const editNote = (index, value) => {
    // slow for large array length, splice would be quicker
    const newState = notes.map((item, subIndex) =>
      index === subIndex ? value : item
    )
    saveList(newState)
  }

  const keyDown = key => {
    if (key === 'Enter') {
      addNote()
    }
  }

  const changePos = (currentIndex, newIndex) => {
    if (newIndex >= 0) {
      const list = [...notes]
      const element = list[currentIndex]
      list.splice(currentIndex, 1)
      list.splice(newIndex, 0, element)
      saveList(list)
    }
  }

  useEffect(() => {
    const jsonNotes = getJson(localStorage.getItem('notes'))
    const parseNotes = jsonNotes ? jsonNotes : []
    setNotes(parseNotes)
  }, [])

  return (
    <div className="container">
      <div className="input__container">
        <input
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => keyDown(e.key)}
          value={input}
        />
        <button onClick={addNote}>Save</button>
      </div>
      <div className="notes__container">
        {notes.map((item, index) => (
          <div>
            <input
              key={index}
              className="notes__item"
              value={item}
              onClick={() => {}}
              onChange={e => editNote(index, e.target.value)}
            />
            <span className="delete__icon" onClick={() => deleteNote(index)}>
              x
            </span>
            <span
              className="up__icon"
              onClick={() => changePos(index, index - 1)}
            >
              ↑
            </span>
            <span
              className="down__icon"
              onClick={() => changePos(index, index + 1)}
            >
              ↓
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
