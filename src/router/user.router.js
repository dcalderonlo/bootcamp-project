import express from "express";
import { userModel } from "../model/user.model.js";

export const userRouter = express.Router();

userRouter.post('/', async (req, res) => {
  const createdUser = await userModel.create(req.body)
  res.status(200).send(createdUser)
})

// userRouter.get('/', async (req, res) => {
//   const users = await userModel.find({})
//   res.status(200).send(users)
// })

userRouter.get('/', async (req, res) => {
  try {
    const { gender } = req.query;

    if (gender) {
      const users = await userModel.find({ gender });
      res.status(200).send(users);
    } else {
      const users = await userModel.find({});
      res.status(200).send(users);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

userRouter.get("/:id", async (req, res) => {
  const user = await userModel.findOne({ _id: req.params.id });
  res.status(200). send(user);
})

// userRouter.patch("/:id", async (req, res) => {
//   const updatedUser = await userModel.findOneAndUpdate(
//     { _id: req.params.id },
//     req.body,
//     {
//       new: true,
//     }
//   );
//   res.status(200).send(updatedUser);
// })

userRouter.patch("/:id", async (req, res) => {
  const userId = req.params.id;
  // Validar si el formato del ID es válido
  if (!userId || !/^[0-9a-fA-F]{24}$/.test(userId)) {
    // Si el formato del ID no es válido, responde con un código 422 Unprocessable Entity
    return res.status(422).send({ error: "Unprocessable Entity - Invalid user ID format" });
  }
  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      req.body,
      {
        new: true,
      }
    );

    if (!updatedUser) {
      const newUser = new userModel({
        _id: userId,
        ...req.body,
      });
      const savedUser = await newUser.save();
      return res.status(201).send(savedUser);
    }
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// userRouter.delete("/:id", async (req, res) => {
//   const deletedUser = await userModel.findOneAndDelete({ _id: req.params.id });
//   res.status(200). send(deletedUser);
// })

userRouter.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  // Validar si el formato del ID es válido
  if (!userId || !/^[0-9a-fA-F]{24}$/.test(userId)) {
    // Si el formato del ID no es válido, responde con un código 400 Bad Request
    return res.status(400).send({ error: "Invalid user ID format" });
  }
  try {
    const deletedUser = await userModel.findOneAndDelete({ _id: userId });
    if (!deletedUser) {
      return res.status(204).end();
    }
    res.status(200).send(deletedUser);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});
