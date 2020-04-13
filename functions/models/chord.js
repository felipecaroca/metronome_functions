class Chord {
  createChord(data){
    return {
      name: data.name,
      duration: data.duration
    }
  }
}

exports.Chord =  Chord