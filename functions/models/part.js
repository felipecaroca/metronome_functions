let {Line} = require('./line')
class Part {
  createPart(data) {
    let lines = []
    data.lines.forEach(line=>{
      let tmp = new Line()
      lines.push(tmp.createLine(line))
    })
    return {
      name: data.name,
      active: data.active,
      from: data.from,
      to: data.to,
      // lines: lines
    }

  }
}

exports.Part = Part