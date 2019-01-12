let initialState

export default class DataModel {
  constructor(input) {
    initialState = input.map(particle => {
      const regex = /((-| )\d+), ((-| )\d+)/g
      const [posStr, velStr] = particle.match(regex)
      const pos = posStr.split(',').map(comp => parseInt(comp))
      const vel = velStr.split(',').map(comp => parseInt(comp))
      return [pos,vel]
    })
    this.time = 0
  }

  setTime(time) {
    this.time = time
    return this
  }
  currentState() {
    this._currentState = initialState.map(point => {
      const [[posX, posY], [velX,velY]] = point
      return [posX + (this.time * velX), posY + (this.time * velY)]
    })
    return this._currentState
  }

  extremes() {
    const cs = this.currentState()
    return cs.reduce((a,b) => {
      const [[xMin,xMax],[yMin,yMax]] = a
      const [x,y] = b
      return [[Math.min(x, xMin), Math.max(x, xMax)],[Math.min(y, yMin),Math.max(y, yMax)]]
    }, [[cs[0][0],cs[0][0]], [cs[0][1],cs[0][1]]])
  }
}