const db = require("../models");
const Comptes = db.comptes;
const Op = db.Sequelize.Op;
const Users = require("../controllers/user.controller")
const compteRepository = require("../repository/compte-repository")
exports.create = (req, res) => {
  console.log(req.body);

    if (!req.body.nom) {
      res.status(400).json({
        message: "Content can not be empty!"
      });
      return;
    }
    const compte = {

      nom: req.body.nom,
      description: req.body.description,
      userId: req.body.userId
  
    };

    Comptes.create( compte )
    .then( data => {
      console.log(req.body);
        if (req.body.userId){
          Users.findByPk(req.body.userId)
        
          .then(user => {
           data.setUser(user).then(() =>{
            res.send({message: "compte ok"})
           })
      });
     }
     else{
      data.setUser([id]).then(() =>{
        res.send({message: "compte ok"})
       })
     }
    } )
     .catch(err => {
        res.status(500).send({
          message:
            err.message || "error"
        });
      });
  };

  exports.findAll = (req, res) => {
    const nom = req.query.nom;
    var condition = nom ? { nom: { [Op.like]: `%${nom}%` } } : null;
    Comptes.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "error."
        });
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
    Comptes.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `error`
          });  
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error"
        });
      });
  };

exports.update = (req, res) => {
  try {
    const compte =  Comptes.findByPk(req.body.id);
    if (req.body.isSelect) {
      compte.update({ BrandId: req.body.isSelect });
    }
    compte.update(req.body);
    res.status(200).json({
      message: `Compte name ${compte.isSelect} updated`,
    });
  } catch (err) {
    res.json({ message: err.errors });
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;
    Comptes.destroy({
    where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Compte was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Compte with id=${id}. Maybe Compte was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Compte with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  
};


exports.addToComptes = async (req, res, next) => {
  try {
    const compte = await db.comptes.findOne({
      where: { UserId: req.userID },
    });

    
  } catch (err) {
    res.json({ message: err.errors });
  }
};