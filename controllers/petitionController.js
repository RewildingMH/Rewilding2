const Petition = require('../models/Petition')
const path = require('path')


const petitionController = {
  addPetition: (req, res) => {
    //PARA AGREGAR UNA NUEVA PETICIÓN ES OBLIGATORIO ENVIAR FOTO
    const { title, destination, description, limitDate, goal } = req.body
    const { name, profilePicture, _id } = req.user
    const file = req.files.file
    file.mv(path.join(__dirname, '../client/build/assets/petitionsPictures/' + file.md5), error => {
      if (error) {

        return res.json({ response: error })
      }
    })

    const petitionsPicturesLocation = `/assets/petitionsPictures/${file.md5}`


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
      limitDate,
      goal
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
    const { name, profilePicture, _id } = req.user

    try {
      const response = await Petition.findOneAndUpdate(
        { _id: petId },
        {
          $push: {
            reasons: {
              name,
              profilePicture,
              reason,
              userId: _id
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
  },
  addVisit: async (req, res) => {

    try {
      const response = await Petition.findOneAndUpdate(
        { _id: req.body.petId },
        {
          $inc: {
            visits: 1
          },
        },
        { new: true }
      )
      res.json({
        success: true,
        response,
      })
    } catch (error) {
      res.json({
        success: false,
        error
      })
    }
  }
}

module.exports = petitionController