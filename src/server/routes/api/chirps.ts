import * as express from "express";
import db from "../../db/index";



const router = express.Router();

router.get("/:id?", async (req, res, next) => {
  let id = req.params.id;

  if (id) {
    try {
      res.json((await db.chirps.one(id))[0]);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  } else {
    try {
      res.json(await db.chirps.all());
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
});

router.post("/", async (req, res, next) => {
  let chirps = req.body;
  let id = req.params.id;
  try {
    res.json(await db.chirps.post(id, chirps.chirp, chirps.name));
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }

  res.sendStatus(200);
});

router.put("/:id", async (req, res, next) => {
  let id = req.params.id;
  let chirps = req.body;

  try {
    res.json(await db.chirps.update(chirps.chirp, chirps.name, id));
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
 
  res.sendStatus(200);
});

router.delete("/:id", async(req, res, next) => {
  let id = req.params.id;

  try {
    
    res.json(await db.chirps.delet(id));
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }

  res.sendStatus(200);
});

export default router;
