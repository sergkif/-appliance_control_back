const express = require('express')
const Ovens = require('../models/Ovens')
const WashingMachines = require('../models/WashingMachines')
const UserWashingMachines = require('../models/UserWashingMachines')
const UserOvens = require('../models/UserOvens')


const router = express.Router()

router.get('/getAllAppliances', async (req, res) => {
  try {
      const userWashingMachines = await UserWashingMachines.find()
      const userOvens = await UserOvens.find()

      res.status(200).send([ ...userWashingMachines, ...userOvens ])
  } catch (error) {
      res.status(500).send(error)
  }
})

router.post('/getAppliance', async (req, res) => {
  const { _id } = req.body
  try {
    const userWashingMachine = await UserWashingMachines.findOne({_id})
    const userOven = await UserOvens.findOne({_id})

    if (userWashingMachine) res.status(200).send(userWashingMachine)
    else if(userOven) res.status(200).send(userOven)
    else return res.status(404).send({error: 'There is no such an appliance.'})
} catch (error) {
    res.status(500).send(error)
}
})

router.post('/addAppliance', async (req, res) => {
  const { type, model, name } = req.body
  try {
      let appliance
      if (type === "oven") {
        appliance = await Ovens.findOne({ model })

        const { _id, ...forNewOven } = appliance._doc

        const newOven = {
          ...forNewOven,
          appliance_id: _id,
          name
        }

        const userOven = new UserOvens(newOven)
        await userOven.save()

      } else if (type === "washing_machine") {
        appliance = await WashingMachines.findOne({ model })

        const { _id, ...forNewMachine } = appliance._doc

        const newMachine = {
          ...forNewMachine,
          appliance_id: _id,
          name
        }

        const userWashingMachine = new UserWashingMachines(newMachine)
        await userWashingMachine.save()
      } else {
        return res.status(404).send({error: 'There is no appliance with of that model.'})
      }
      if (appliance) res.status(200).send(appliance)
      else throw new Error({ error: 'Something went wrong' })
  } catch (error) {
      res.status(500).send(error)
  }
})

router.post('/changeAppliance', async (req, res) => {
  const { type, _id, name } = req.body
  try {
    let result
    if (type === "oven") {
      result = await UserOvens.findOneAndUpdate({ _id }, { name }, { new: true })
    } else if (type === "washing_machine") {
      result = await UserWashingMachines.findOneAndUpdate({ _id }, { name }, { new: true })
    } else {
      return res.status(404).send({error: 'There is no such appliance registered in app.'})
    }
    if (result) res.status(200).send(result)
    else throw new Error({ error: 'Something went wrong' })
  } catch (error) {
    res.status(500).send(error)
  }
})

router.post('/controlAppliance', async (req, res) => {
  const { _id, type, power, choosen_program, grill_on } = req.body

  try {
    let result
    if (type === "oven") {
      result = await UserOvens.findOneAndUpdate({ _id }, { power, choosen_program, grill_on }, { new: true })
    } else if (type === "washing_machine") {
      result = await UserWashingMachines.findOneAndUpdate({ _id }, { power, choosen_program }, { new: true })
    } else {
      return res.status(404).send({error: 'There is no such appliance registered in app.'})
    }
    console.log(result)
    if (result) res.status(200).send(result)
    else throw new Error({ error: 'Something went wrong' })
  } catch (error) {
    res.status(500).send(error)
  }
})

router.post('/deleteAppliance', async (req, res) => {
  const { type, _id } = req.body
  try {
    let result
    if (type === "oven") {
        result = await UserOvens.deleteOne({ _id })
    } else if (type === "washing_machine") {
        result = await UserWashingMachines.deleteOne({ _id })
    } else {
      return res.status(404).send({error: 'There is no such appliance registered in app.'})
    }

      if (result.ok && result.deletedCount) res.status(200).send()
      else throw new Error({ error: 'Something went wrong' })
  } catch (error) {
      res.status(500).send(error)
  }
})

module.exports = router