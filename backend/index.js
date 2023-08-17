const express = require("express");
const { generateFile } = require("./generateFile");
const { executeCpp } = require("./executeCpp");
const app = express();
const cors = require('cors');
//MiddleExpress
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
    return res.json({ hello: "world!" });
});
app.post("/run", async(req, res) => {

    const { language = 'cpp', code } = req.body;
    if (code === undefined) {
        return res.status(404).json({ success: false, error: "Empty code body" });
    }
    try {
        //need to generate a c++ file with content from the request
        const filePath = await generateFile(language, code);
        const output = await executeCpp(filePath);

        //we need to run the file and send the response


        res.json({ filePath, output });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});
app.listen(5000, () => {
    console.log('Listening on port 5000!');

});