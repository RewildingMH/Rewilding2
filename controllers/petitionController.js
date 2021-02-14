const Petition = require('../models/Petition')

const petitionController = {
  addPetition: (req, res) => {
    const { title, author, destination, desc, visits, picture, signatures, date, limitDate, comments } = req.body
    const petitionSave = new Petition({
      title, author, destination, desc, visits, picture, signatures, date, limitDate, comments
    })
    petitionSave.save()
      .then(petitionSaved => {
        return res.json({ success: true, response: petitionSaved })
      })
      .catch(error => {
        return res.json({ success: false, error })
      })
  },

  getPetitions: (req, res) => {
    const { title, author, destination, desc, visits, picture, signatures, date, limitDate, comments } = req.body

  }
}

module.exports = petitionController