# mdc-audio-tools

To install from local git clone:
```shell
npm install
npm run install-locally
```

## Split Stereo
Splits single stereo audio files into separate files for the _left_ and _right_ channels.

For example, `audio.wav` is split into `audio-L.wav` and `audio-R.wav`.
Currently, the output format is always WAV.

Usage:
```
split-stereo <file-glob-pattern>
```