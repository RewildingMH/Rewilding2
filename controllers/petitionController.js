const Petition = require('../models/Petition')
const path = require('path')


const petitionController = {
  addPetition: (req, res) => {
    console.log(req.body)
    const { title, destination, description, limitDate } = req.body
    const { name, profilePicture, _id } = req.user
    const file = req.files.file


    file.mv(path.join(__dirname, '../frontend/public/assets/petitionsPictures/' + file.name), error => {
      if (error) {
        console.log(error)
        return res.json({ response: error })
      }
    })

    const petitionsPicturesLocation = `/assets/petitionsPictures/${file.name}`


    const petitionSave = new Petition({
      title,
      author: {
        name,
        profilePicture,
        idUser: _id
      },
      destination,
      desc: description,
      picture: petitionsPicturesLocation,
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
          },
          $addToSet: {
            signatures: {
              id: req.user._id
            },
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