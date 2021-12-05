const scale = 5

fetch('/data')
  .then(response => response.json())
  .then(data => {
    const canvas = document.createElement('canvas')
    canvas.height = window.innerHeight - 100
    canvas.width = window.innerWidth - 100
    const ctx = canvas.getContext('2d')
    document.body.appendChild(canvas)
    ctx.fillStyle = 'black'
    data.forEach((generation, gIndex) => {
      generation.forEach((pot, pIndex) => {
        if (pot) ctx.fillRect(pIndex * scale, gIndex * scale, scale, scale)
      })
    })
  })