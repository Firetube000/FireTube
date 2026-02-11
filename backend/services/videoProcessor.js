'use strict';

const ffmpeg = require('fluent-ffmpeg');

/**
 * Video Processor for transcoding and HLS streaming.
 */
class VideoProcessor {
    constructor(inputFile) {
        this.inputFile = inputFile;
    }

    /**
     * Transcodes video to desired format.
     * @param {string} outputFile - The output file path.
     * @param {string} format - The desired format (e.g., 'mp4').
     */
    transcode(outputFile, format) {
        return new Promise((resolve, reject) => {
            ffmpeg(this.inputFile)
                .toFormat(format)
                .on('end', () => resolve(`Transcoding finished: ${outputFile}`))
                .on('error', (err) => reject(`Error: ${err.message}`))
                .save(outputFile);
        });
    }

    /**
     * Generates HLS streaming files.
     * @param {string} outputDir - The directory for HLS output.
     */
    generateHLS(outputDir) {
        return new Promise((resolve, reject) => {
            ffmpeg(this.inputFile)
                .outputOptions('-f hls')
                .output(`${outputDir}/output.m3u8`)
                .on('end', () => resolve(`HLS generation finished: ${outputDir}`))
                .on('error', (err) => reject(`Error: ${err.message}`))
                .run();
        });
    }
}

module.exports = VideoProcessor;
