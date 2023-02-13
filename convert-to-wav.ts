#!/usr/bin/env node
import Ffmpeg from "fluent-ffmpeg";
import glob from "glob";
import * as Path from "path";

console.log("Converting MP3s to WAVs...");

const globPattern = process.argv[2];

const matchingFiles = glob.sync(globPattern);
console.log(`Found ${matchingFiles.length} file${matchingFiles.length > 1 ? "s" : ""}.`);

matchingFiles.forEach((inputFilePath) => {
    const input = {
        filename: Path.basename(inputFilePath),
        path: inputFilePath,
        directory: Path.dirname(inputFilePath),
        filenameWithoutExtension: Path.basename(inputFilePath, Path.extname(inputFilePath))
    };

    const outputFilename = input.filenameWithoutExtension + ".wav";
    const output = {
        filename: outputFilename,
        path: Path.join(input.directory, outputFilename),
        directory: input.directory
    };
    var command = Ffmpeg(input.path);
    command.addOutput(output.path);
    command.run();
    console.log(`${input.filename} -> ${output.filename}`);
});
console.log("Done.")


