import inquirer from "inquirer";
import { image } from "qr-image";
import {appendFile, createWriteStream, writeFileSync} from "node:fs";

const prompt = inquirer.createPromptModule();

prompt([
    {
        name: 'url',
        message: 'Enter url in format {www.url.com}',
        type: 'input',
    }
]).then((e) =>{
    let img = image(e.url, {type: 'svg'});
    img.pipe(createWriteStream('qrCodes/'+ e.url +'.svg'));
    var link = e.url + "\n";
    appendFile("prompt.txt",link, (err) => {
        if(err) throw err;
        console.log("Saved");
    });
});