import User from "../models/users.js";
import { findElement, findOneElement } from "../utils/users.utils.js";

const userProfile = async (req, res) => {
  const query = req.query;
  const profile = await findElement(query);
  try {
    if (profile) {
      res.json(profile);
    } else {
      res.status(404).json({ message: "Perfil no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al buscar el perfil" });
  }
};
const newUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const editUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userUpdate = await User.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json(userUpdate);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const data = await User.deleteOne({ _id: id });
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
async function updateFullAccount(req, res) {
  try {
    const user = await User.findById(req.params.id);

    // Verifica si el usuario tiene todos los campos requeridos
    const isFullAccount = !!user.name && !!user.userName && !!user.email && !!user.celphone &&  !!user.information &&  !!user.role;

    if (isFullAccount) {
      user.fullAcount = true;
      await user.save();

      return res.status(200).json({ message: 'Cuenta Completa' });
    }

    return res.status(400).json({ message: 'Cuenta incompleta' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
}



export { userProfile, newUser, editUser, deleteUser, updateFullAccount};
