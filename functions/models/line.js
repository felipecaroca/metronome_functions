let {Chord} = require('./chord')
class Line {
  createLine(line){
    let lineList = []
    line.forEach(chord=>{
      let tmp = new Chord()
      lineList.push(tmp.createChord(chord))
    })
    return lineList
  }
}

exports.Line = Line