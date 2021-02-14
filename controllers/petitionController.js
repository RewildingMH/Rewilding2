const Petition = require('../models/Petition')

const petitionController = {
  addPetition: (req, res) => {
    const { title, author, destination, desc, visits, picture, signatures, date, limitDate, reasons } = req.body
    const petitionSave = new Petition({
      title, author, destination, desc, visits, picture, signatures, date, limitDate, reasons
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
    const { title, author, destination, desc, visits, picture, signatures, date, limitDate, reasons } = req.body

  },

  signPetition: async (req, res) => {
    const { petId, name, profilePicture, reason } = req.body
    console.log(req.body)

    try {
      await Petition.findOneAndUpdate(
        { _id: petId },
        {
          $push: {
            reasons: {
              name,
              profilePicture,
              reason,
            }
          }
        },
        { new: true }
      );
      res.json({
        success: true,
        respuesta: 'Petition signed'
      })
    } catch (error) {
      res.json({
        success: false,
        respuesta: error,
      })
    }
  }
}

module.exports = petitionController