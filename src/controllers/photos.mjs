import mongoose from 'mongoose';
import PhotoModel from '../models/photo.mjs';
import AlbumModel from '../models/album.mjs';

const Photos = class Photos {
  constructor(app, connect) {
    this.app = app;
    this.PhotoModel = connect.model('Photo', PhotoModel);
    this.AlbumModel = connect.model('Albums', AlbumModel);

    this.run();
  }

  deleteById() {
    this.app.delete('/photos/:id', (req, res) => {
      try {
        this.PhotoModel.findByIdAndDelete(req.params.id).then((photo) => {
          res.status(200).json(photo || {});
        }).catch(() => {
          res.status(500).json({
            code: 500,
            message: 'Internal Server error'
          });
        });
      } catch (err) {
        console.error(`[ERROR] photos/:id -> ${err}`);

        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }

  showById() {
    this.app.get('/photos/:id', (req, res) => {
      try {
        this.PhotoModel.findById(req.params.id).then((photo) => {
          res.status(200).json(photo || {});
        }).catch(() => {
          res.status(500).json({
            code: 500,
            message: 'Internal Server error'
          });
        });
      } catch (err) {
        console.error(`[ERROR] photos/:id -> ${err}`);

        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }

  async create() {
    this.app.post('/albums/:id/photo/', async (req, res) => {
      try {
        const photoModel = new this.PhotoModel(req.body);
        const photo = await photoModel.save();
        const idAlbum = req.params.id;
        const idPhoto = photo.id;
        console.log(photo, idPhoto, idAlbum);

        await this.AlbumModel.findByIdAndUpdate(
          idAlbum,
          { $push: { photos: idPhoto } },
          { new: true, useFindAndModify: false }
        ).then((album) => {
          console.log(album);
        });

        res.status(200).json(photo || {});
      } catch (err) {
        console.error(`[ERROR] photos/create -> ${err}`);

        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }

  updateById() {
    this.app.put('/photos/:id', (req, res) => {
      try {
        this.PhotoModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
          .then((photo) => {
            res.status(200).json(photo || {});
          })
          .catch(() => {
            res.status(500).json({
              code: 500,
              message: 'Internal Server error'
            });
          });
      } catch (err) {
        console.error(`[ERROR] photos/update/:id -> ${err}`);

        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }

  getAll() {
    this.app.get('/photos', (req, res) => {
      try {
        this.PhotoModel.find()
          .populate('album')
          .then((photos) => {
            res.status(200).json(photos || []);
          })
          .catch(() => {
            res.status(500).json({
              code: 500,
              message: 'Internal Server error'
            });
          });
      } catch (err) {
        console.error(`[ERROR] photos -> ${err}`);
        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }

  showPhotoByAlbumID() {
    this.app.get('/album/:id/photos', (req, res) => {
      try {
        const albumId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(albumId)) {
          return res.status(400).json({
            code: 400,
            message: 'Invalid album ID'
          });
        }
        return this.AlbumModel.findById(albumId)
          .then((album) => {
            if (!album) {
              return res.status(404).json({
                code: 404,
                message: 'Album not found'
              });
            }
            return res.status(200).json(album);
          })
          .catch((err) => {
            console.error(`[ERROR] Error fetching album ${albumId}: ${err.message}`, err);
            return res.status(500).json({
              code: 500,
              message: 'Internal Server Error'
            });
          });
      } catch (err) {
        console.error(`[ERROR] Unexpected error for album ${req.params.id}: ${err}`);
        return res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }

  run() {
    this.create();
    this.showById();
    this.deleteById();
    this.updateById();
    this.getAll();
    this.showPhotoByAlbumID();
  }
};

export default Photos;
