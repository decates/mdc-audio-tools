#!/usr/bin/env node
import Ffmpeg from "fluent-ffmpeg";
import glob from "glob";
import * as Path from "path";

console.log("Splitting stereo channels into separate files...");

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

    const outputLeftFilename = input.filenameWithoutExtension + "-L" + ".wav";
    const outputRightFilename = input.filenameWithoutExtension + "-R" + ".wav";
    const outputTestFilename = input.filenameWithoutExtension + "-OUT" + ".wav";
    const output = {
        filename: outputTestFilename,
        path: Path.join(input.directory, outputTestFilename),
        directory: input.directory
    };
    // ffmpeg -i stereo.wav -filter_complex \
    // "[0:0]pan=1|c0=c0[left]; \
    //  [0:0]pan=1|c0=c1[right]" \
    // -map "[left]" left.wav -map "[right]" right.wav
    var command = Ffmpeg(input.path);
    command.addOption('-f', 'null')  // set format to null
    command.complexFilter("[0:0]pan=1|c0=c0[left]; [0:0]pan=1|c0=c1[right]");
    command
        .output(outputLeftFilename)
        .map(`[left]`)
        .toFormat('wav')
        .output(outputRightFilename)
        .map(`[right]`)
        .toFormat('wav')
        .run();
    // command.addOutput(output.path);
    // command.run();
    console.log(`${input.filename} -> ${outputLeftFilename} and ${outputRightFilename}`);
});
console.log("Done.")


