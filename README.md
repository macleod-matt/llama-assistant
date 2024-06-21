# Smart Assistant Using Together AI

## Overview

This Smart Assistant Python script is designed to create an interactive voice-based assistant using llama3 LLM model. It utilizes various libraries and APIs to capture audio, transcribe it, generate responses using a language model, and convert text responses back to speech. 

## Video Demo
TODO


## Features

- **Audio Capture**: Records audio input from the user's microphone.
- **Speech-to-Text**: Uses the Whisper model to transcribe audio input into text.
- **Language Model Integration**: Sends transcribed text to a language model via the Together API to generate a response.
- **Text-to-Speech**: Converts the generated text response back into speech using the `pyttsx3` library.
- **Console Interaction**: Provides visual feedback and interaction through the console using the `rich` library.

## Requirements

- Python 3.11 or greater
- `os`
- `together`
- `time`
- `threading`
- `numpy`
- `whisper`
- `sounddevice`
- `queue`
- `rich`
- `pyttsx3`
- `sys`
- `signal`

## Installation

1. Clone the repository:

```
git clone https://github.com/your-repo/smart-assistant.git
cd smart-assistant
```

2. Install the required packages:

```
pip install -r requirements.txt
```
### Using Together.ai

To use Together.ai for hosting the language model, follow these steps:

1. Sign up and obtain an API key from [Together.ai](https://together.xyz).
2. Set the API key in your environment:

    For Windows:
    ```
    set TOGETHER_API_KEY=your_api_key_here
    ```

    For Linux/macOS:
    ```
    export TOGETHER_API_KEY='your_api_key_here'
    ```

## Usage

Run the script using the following command:

```
python smart_assistant.py
```

### Interaction

1. Start the assistant and press `Enter` to begin recording.
2. Press `Enter` again to stop recording.
3. The assistant will process the audio, transcribe it, generate a response, and speak it back to you.

### Keyboard Interrupt

- Press `Ctrl+C` to exit the assistant at any time.

## Script Components

### SmartAssistant Class

- **Initialization**: Sets up the assistant with the necessary models and configurations.
- **Audio Recording**: Captures audio input from the microphone.
- **Transcription**: Converts audio input to text using Whisper.
- **Language Model Query**: Sends the transcribed text to the language model and retrieves the response.
- **Text-to-Speech**: Converts text responses to speech.
- **Console Interaction**: Provides feedback and interaction through the console.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
