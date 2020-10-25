
// exports.createUser = async (req, res) => {
//   try{
//     const {email, password, pseudo, avatar} = req.body;
//     const hashPassword = await bcrypt.hash(password, 10)
//     const user = new User({
//      email: email,
//      pseudo: pseudo,
//      password: hashPassword,
//      avatar: avatar,
//      index:true,
//      unique:true
//    })
//    user.save();
//    res.status(200).send(user)
//   }
//   catch(error){
//     next(error);
//   }
// }



// app.post('/login', async(req, res)=> {
//   const userEmail = await User.findOne({email : req.body.email}) 
//   if(!userEmail) res.sendStatus(403).json('mauvais email')
//   if(userEmail) {
//     const match = bcrypt.compare(req.body.password, userEmail.password)
//     if(!match) res.json('mauvais mot de passe').sendStatus(403)  
//       req.login(userEmail)
//       res.status(200).json('il est connecté')
//   } 
// })


// app.get('/logout', () => {
//     req.logout();
//     res.sendStatus(200).json('déconnecté')
// })