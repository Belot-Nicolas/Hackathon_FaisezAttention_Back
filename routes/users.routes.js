const connection = require("../db-config");
const router = require("express").Router();
const users = require('../models/users.model');
const argon2 = require("argon2");
const Joi = require ('joi');
const { generateJwt } = require('../utilis/auth');
const checkJwt = require ('../middlewares/checkJwt');

const { findUserByEmail, insertUser} = require('../models/users.model')

//je protège ma route tant que l'utilisateur n'est pas connecté
// router.get('/', checkJwt, (req, res) => {
router.get('/', (req, res) => {
    connection.query('SELECT * FROM users', (err, result) => {
      if (err) {
        res.status(500).send('Error retrieving users from database');
      } else {
        res.json(result);
      }
    });
  });

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  connection.query(
    'SELECT * FROM users WHERE id_user = ?',
    [userId],
    (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving user from database');
      } else {
        if (results.length) res.json(results[0]);
        else res.status(404).send('User not found');
      }
    }
  );
});

router.get('/email/:email', (req, res) => {
  const userEmail = req.params.email;
  connection.query(
    // 'SELECT * FROM users WHERE email = ?',
    'SELECT * FROM users as u INNER JOIN game_session as s ON u.id_user=s.id_user INNER JOIN games as g ON s.id_game=g.id_game WHERE u.email = ?',
    [userEmail],
    (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving user from database');
      } else {
        if (results.length) res.json(results);
        else res.status(404).send('User not found');
      }
    }
  );
});

//reprendre les colonnes de la table users
const userSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  avatar: Joi.string().required(),
  role:Joi.string().required()
})
const userSchemaLogin = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
})

//lors de la création d'un user
router.post('/', async (req, res) => {
  const { value, error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error);
  }

  //vérifie si user existe
  //await permet d'être sur d'avoir un retour de vérif user
   
  const [[existingUser]] = await findUserByEmail(value.email);
    if(existingUser) {
      return res.status(409).json({
      message : "l'utilisateur existe déjà",
      })
  }

  //étape de l'encryptage (éléments de l'entité= le bolean est repenté par un chiffre 0/1= true /false))
  const hashedPassword = await argon2.hash(value.password);
  await insertUser(value.firstname, value.lastname, hashedPassword, value.email, value.avatar, value.role);

  //génération du token
  const jwtKey = generateJwt(value.email);
  return res.json({
    //le token qui s'affichera dans Postman
    credentials: jwtKey,
  })

})

//vérification des Données utilisateurs (login dashboard)
router.post('/login', async (req,res) => {
  const { value, error} = userSchemaLogin.validate(req.body);
  if(error){
    return res.status(400).json(error);
  }
  
  const [[existingUser]] = await findUserByEmail(value.email);
  if(!existingUser) {
    return res.status(403).json({
      message : 'email ou le mot de passe ne correspondent pas'
    })
  }

  const verified = await argon2.verify(existingUser.password, value.password)

  if(!verified) {
    return res.status(403).json({ 
      message : 'email ou le mot de passe ne correspondent pas'
    })
  }

    const jwtKey = generateJwt(value.email);
  return res.json({
    credentials : jwtKey
  })
})

router.put('/:id', async (req, res) => {
  const userExist = await users.findOne(req.params.id);
  if (userExist) {
      const userExist = await users.update(req.body, req.params.id);
      if (userExist) {
          return res.status(200).json({...userExist, ...req.body});
      } else {
          return res.sendstatus(500).send('Error updating user')
      }
  }
  else {
      res.status(404).send('user not found');
  }
});


module.exports = router;