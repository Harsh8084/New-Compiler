const { exec } = require("child_process");
const fs = require('fs');
const { v4: uuid } = require("uuid");
const path = require('path');
const outputPath = path.join(__dirname, "outputs");
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}
const executeCpp = (filepath) => {

    //353c4281-4c7f-4e32-a5d5-eada54471645.cpp
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.exe`);
    return new Promise((resolve, reject) => {
        exec(`g++ ${filepath} -o ${outPath} && cd ${outputPath} && .\\${jobId}.exe`, (error, stdout, stderr) => {
            if (error) {
                reject({ error, stderr });
            }

            if (stderr) {
                reject(stderr);
            }
            resolve(stdout);
        });
    });

};
module.exports = {
    executeCpp,
};