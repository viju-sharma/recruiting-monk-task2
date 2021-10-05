const express = require("express");
const router = express.Router();
const axios = require("axios");



router.route("/getData").get((req, res)=>{
    axios
      .get("https://recruitingmonk-v2.azurewebsites.net/qna")
      .then(function (response) {
        console.log(response);
        res.json(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
})



module.exports = router;