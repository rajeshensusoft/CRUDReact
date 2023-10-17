import React, { useState } from 'react'

function TodoApp() {
    const [fatherName, setFatherName] = useState("Sanjay Kumar")
  return (
    <div>TodoApp
<form>
<label>Enter your name:
        <input type="text" />
      </label>
      <label>Enter your Father name:
        <input type="text" value={fatherName} onChange={(e)=> setFatherName(e.target.value)}/>
      </label>
</form>
    </div>

    
    
  )
}

export default TodoApp