const Reservation = require('../models/reservation');

exports.createReservation = (req, res, next) => {
    delete req.body._id;
    var reservation = new Reservation({
      ...req.body
    });
    reservation.save()
      .then(() => res.status(201).json({ message: 'Objet enregistréeeee !'}))
      .catch(error => res.status(400).json({ error }));
  };

  exports.getAllReservations = (req, res, next) => {
    Reservation.find()
      .then(reservation => {res.status(200).json(reservation)})
      .catch(error => res.status(400).json({ error }));
  };

    exports.getOneReservation = (req, res) => {
      Reservation.findById(req.params.id)
      .populate("idVoiture")
      .populate('idClient')
      .exec((err,reservation) => {
          res.status(200).json(reservation);
        })
    };
    
    exports.modifyReservation = (req, res, next) => {
        Reservation.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet modifié !'}))
          .catch(error => res.status(400).json({ error }));
      }

      exports.deleteReservation = (req, res, next) => {
        Reservation.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      };

      exports.deleteAllReservation = (req, res, next) => {
        Reservation.deleteMany({})
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      };

      exports.deleteAllReservations = (req, res, next) => {
        Reservation.deleteMany({})
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      };


      exports.getManyReservations = (req, res, next) => {
        Reservation.find({ idVoiture: req.params.id })
          .then(reservation => res.status(200).json(reservation))
          .catch(error => res.status(404).json({ error }));
      };

    //   exports.getManyReservationsByvoitureAndDate = (req, res, next) => {
    //     Reservation.find({ idVoiture: req.params.id, idClient: req.params.id2})
    //       .then(reservation => res.status(200).json(reservation))
    //       .catch(error => res.status(404).json({ error }));
    //   };

          