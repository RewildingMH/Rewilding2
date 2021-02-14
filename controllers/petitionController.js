const Petition = require('../models/Petition')

const petitionController = {
  addPetition: (req, res) => {
    const { title, destination, description, limitDate } = req.body.petition
    const { name, profilePicture, _id } = req.user
    const petitionSave = new Petition({
      title,
      author: {
        name,
        profilePicture,
        idUser: _id
      },
      destination,
      desc: description,
      picture: profilePicture,
      limitDate
    })
    petitionSave.save()
      .then(petitionSaved => {
        return res.json({ success: true, response: petitionSaved })
      })
      .catch(error => {
        return res.json({ success: false, error })
      })
  },

  getPetitions: async (req, res) => {
    try {
      const data = await Petition.find()
      res.json({
        success: true,
        response: data
      })
    } catch (error) {
      res.json({
        success: false,
        response: error
      })
    }

  },

  signPetition: async (req, res) => {
    const { petId, reason } = req.body.userSign
    const { name, profilePicture } = req.user

    try {
      const response = await Petition.findOneAndUpdate(
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
        response
      })
    } catch (error) {
      res.json({
        success: false,
        response: error,
      })
    }
  }
}

module.exports = petitionController