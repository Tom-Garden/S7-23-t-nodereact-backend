import Donation from "../models/donations.js";
import Project from "../models/projects.js";
import User from "../models/users.js";

const projection = { createdAt: 0, updatedAt: 0, __v: 0, avaliable: 0 };

const getDonationByUser = async (req, res) => {
  //Recibe el id del usuario del que se queiren conocer las donaciones realizadas
  const { id } = req.params;
  try {
    const donation = await Donation.find({ userId: { $eq: `${id}` } });

    if (donation) {
      res.status(200).json(donation);
    } else {
      res.status(404).json({ message: "Donaciones no encontradas" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar las donaciones solicitadas" });
  }
};

//Nueva donacion
const postDonation = async (req, res) => {
  //Recibe los campos obligatorios para la creación de una donación (inclido el comentario)
  const donation = new Donation(req.body);

  // var allProjects = await Project.find({}, {projection});

  let projectByName = await Project.findById(donation.projectId);

  try {
    const amount = {
      parcialAmount:
        parseInt(donation.amount) + parseInt(projectByName.parcialAmount),
    };

    //Actualiza el parcialAmount del proyecto
    const updateProject = await Project.findByIdAndUpdate(
      { _id: donation.projectId },
      amount,
      {
        new: true,
      }
    );

    //Actualiza el estado de la donación cuando pago ok
    // const updateCompletion = await Donation.findByIdAndUpdate(
    //     {_id : donation._id.valueOf()},
    //     {completed: 'completed'},
    //     {new: true}
    // )
    donation.completed = "completed";

    const newDonation = await donation.save();

    res.status(201).json(newDonation);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// acceptWorkDonation
const acceptWorkDonation = async (req, res) => {
  //Recibe el Id de la donación de tiempo que se quiere aceptar
  const { id } = req.params;
  // Viene en un JSON como: {"completed": "accepted"} o "rejected"
  const acceptReject = req.body;
  try {
    const acceptedDonation = await Donation.findByIdAndUpdate(
      { _id: id },
      { completed: `${acceptReject.completed}` },
      { new: true }
    );
    res.status(200).json(acceptedDonation);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const completed = async (req, res) => {
  const { id } = req.params;
  try {
    const donation = await Donation.findByIdAndUpdate(
      { _id: id },
      { completed: "completed" },
      { new: true }
    );
    const project = await Project.findById(donation.projectId, projection);
    const amount = {
      parcialAmount:
        parseInt(donation.amount) + parseInt(project.parcialAmount),
    };
    const updateProject = await Project.findByIdAndUpdate(
      { _id: donation.projectId },
      amount,
      {
        new: true,
      }
    );

    res.redirect(302, "https://s7-23-t-nodereact.vercel.app/exito2");
  } catch (error) {
    res.json(error);
  }
};

const failure = async (req, res) => {
  //Recibe el Id de la donación de tiempo que se quiere aceptar
  const { id } = req.params;
  let donation = await Donation.findById({ _id: id });
  let projectByName = await Project.findById(donation.projectId);

  try {
    const amount = {
      parcialAmount:
        parseInt(projectByName.parcialAmount) - parseInt(donation.amount),
    };
    console.log(amount);
    //Actualiza el parcialAmount del proyecto
    const updateProject = await Project.findByIdAndUpdate(
      { _id: donation.projectId },
      amount,
      {
        new: true,
      }
    );

    const rejectedDonation = await Donation.findByIdAndDelete({ _id: id });

    res.redirect(302, "https://s7-23-t-nodereact.vercel.app/");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export {
  getDonationByUser,
  postDonation,
  acceptWorkDonation,
  failure,
  completed,
};
