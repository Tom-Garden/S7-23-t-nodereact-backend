import Project from "../models/projects.js";
import Donation from "../models/donations.js";
import dotenv from "dotenv";
import mercadopago from "mercadopago";
dotenv.config();

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

const projection = { createdAt: 0, updatedAt: 0, __v: 0, avaliable: 0 };

const getProjects = async (req, res) => {
  //////buscamos los proyectos
  const { title, category, autor } = req.query;
  var allProjects = await Project.find({}, { projection });

  try {
    ///busqueda por nombre
    if (title) {
      let projectByName = await allProjects.filter((e) =>
        e.title.toLowerCase().includes(title.toLowerCase())
      );
      projectByName.length > 0
        ? res.status(200).json(projectByName[0])
        : res.status(404).json({ message: "Project not found" });
    }
    //busqueda por categoria
    else if (category) {
      const projectByCategory = await Project.find(
        { category: { $in: [`${category}`] } },
        { projection }
      );
      res.status(200).json(projectByCategory);
    }
    ////busqueda por creador
    else if (autor) {
      const projectByAutor = await Project.find({ autor: { $eq: `${autor}` } });
      res.status(200).json(projectByAutor);
    }
    ////GET a todos los proyectos
    else {
      allProjects.length > 0
        ? res.status(200).json(allProjects)
        : res.status(404).json({ message: "No cards" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
const getProjectById = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id, projection);
  res.status(200).json(project);
};
const postProject = async (req, res) => {
  const project = new Project(req.body);
  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const updateProject = async (req, res) => {
  const title = req.query.title;
  const data = req.body;
  //console.log(data)
  var allProject = await Project.find({}, { projection });
  try {
    let projectByName = allProject.filter((e) =>
      e.title.toLowerCase().includes(title.toLowerCase())
    );

    const forUpdateProject = await Project.findByIdAndUpdate(
      { _id: projectByName[0]._id },
      data,
      {
        new: true,
      }
    );
    console.log(forUpdateProject);
    res.json(forUpdateProject);
  } catch (error) {
    console.log(err.message);
  }
};
const PayCard = async (req, res) => {
  const { id } = req.query;
  const datos = req.body;
  try {
    if (datos.amount <= 0) {
      res.status(400).json({ amount: "Invalid" });
    }
    const donation = new Donation(datos);
    const project = await Project.findById(donation.projectId, projection);

    const newDonation = await donation.save();

    let preference = {
      transaction_amount: parseInt(datos.amount * 1.15), //sumo el 15% comision de ML
      items: [
        {
          id: project._id,
          title: project.title,
          unit_price: datos.amount,
          quantity: 1,
          payer: {
            email: datos.email,
            name: datos.nickname,
          },
        },
      ],
      back_urls: {
        success: `http://localhost:5000/api/donations/completed/${donation._id}`,
        failure: `http://localhost:5000/api/donations/failure/${donation._id}`,
        pending: "http://localhost:3000",
      },
      auto_return: "approved",
    };
    mercadopago.preferences
      .create(preference)
      .then(function (response) {
        res.status(200).json(response.body.init_point);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  } catch (error) {
    console.log(error);
  }
};

export { getProjects, postProject, getProjectById, updateProject, PayCard };
