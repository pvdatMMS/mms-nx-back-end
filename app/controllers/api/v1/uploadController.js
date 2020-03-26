module.exports = {
    upload: (req, res) => {
        if (req.file)
          res.json({
            imageUrl: `images/uploads/${req.file.filename}`
          })
        else
          res.status("409").json("No Files to Upload.")
      }
}