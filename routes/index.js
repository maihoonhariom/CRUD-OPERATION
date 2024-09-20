const express = require("express");
const router = express.Router();
const User = require("../modeles/userSchema");

router.get("/",function(req,res){
    res.render("index");
})

router.get("/create",function(req,res){
    res.render("create");
})


router.post("/save",async (req,res)=>{
    try {
        const userdata = new User(req.body);
        await userdata.save();
        res.render("index");
    } catch (error) {
        res.status(500).send(error.message);
    }
})

router.get("/read", async (req,res)=>{
    try {
        const users = await User.find();
        res.render("read",{users:users});

    } catch (error) {
        console.log(`error in reading data ${error.message}`)
    }
})

router.get("/delete/:id", async (req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect("/read");
    } catch (error) {
        console.log(`delete me error hai ${error.message}`)
    }
})

router.get("/update/:id", async (req,res)=>{
    try {
        const upUser = await User.findById(req.params.id).select("+password");
        res.render("update", {user: upUser});
    } catch (error) {
        console.log(`update page error ${error.message}`);
    }
})
router.post("/update/:id", async (req,res)=>{
    try {
        await User.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/read");
    } catch (error) {
        console.log(`post update error ${error.message}`);
    }
})

module.exports = router;