import os
from together import Together
import time
import threading
import numpy as np
import whisper
from queue import Queue
from rich.console import Console
import pyttsx3
import torch
from dotenv import load_dotenv


load_dotenv()  # Load environment variables from .env file

class SmartAssistant:
    def __init__(self, name : str ):
        '''
        Initalize class 
        '''
        self.name = name
        self.client = Together(api_key=os.getenv('TOGETHER_API_KEY'))
        self.console = Console()
        self.stt = whisper.load_model("base.en")
        self.data_queue = None
        self.messages = []
    
    def cb(self, indata, frames, time, status):
        '''
        Callback for audio full buffer
        
        '''
        if status:
            self.console.print(status)
        self.data_queue.put(bytes(indata))
    
    def record_audio(self, stop_event, data_queue)->None:
        """
        TODO: Move this to front end - different sound device will be used 

        Captures audio data from the user's microphone and adds it to a queue for further processing.

        Args:
            stop_event (threading.Event): An event that, when set, signals the function to stop recording.
            data_queue (queue.Queue): A queue to which the recorded audio data will be added.

        Returns:
            None
        """
        #leve this code as reference for now. Will need to be updated when this is ported to client
        # self.data_queue = data_queue
        # with sd.RawInputStream(samplerate=16000, 
        #                        dtype="int16", channels=1, callback=self.cb
        # ):
        #     while not stop_event.is_set():
        #         time.sleep(0.1)


    def transcribe(self, audio_np: np.ndarray) -> str:
        """
        Transcribes the given audio data using the Whisper speech recognition model.

        Args:
            audio_np (numpy.ndarray): The audio data to be transcribed.

        Returns:
            str: The transcribed text.
        """
        if torch.cuda.is_available():
            fp = True
        else:
            fp = False
        result = self.stt.transcribe(audio_np, fp16=fp)  
        text = result["text"].strip()
        return text


    def ask_llm(self,text: str) -> str:
        """
        Generates a response to the given text using the llama3 language model with together api.

        Args:
            text (str): The input text to be processed.

        Returns:
            str: The generated response.
        """
        self.messages.append({"role": "user", "content": text})
        response = self.client.chat.completions.create(
        model="meta-llama/Llama-3-8b-chat-hf",
        messages=self.messages
    )
        #get the response from the assistant 
        assistant_response = response.choices[0].message.content
        self.messages.append({"role": "assistant", "content": assistant_response})

        return assistant_response
    
    
    def tts(self, text, voice_index = 0):
        '''
        text to speech engine 
        arguments: 
        text : text string to interpolate 
        voice_index : index into MS sapi5 voices list 

        '''
        # Initialize the TTS engine
        engine = pyttsx3.init('sapi5')

        # Set properties (optional)
        rate = engine.getProperty('rate') 
        engine.setProperty('rate', rate -20)  # Slow down the speech rate
      
        voices = engine.getProperty('voices')
        engine.setProperty('voice', voices[voice_index].id)  # Slow down the speech rate
        
        volume = engine.getProperty('volume')
        engine.setProperty('volume', volume + 0.25)  # Increase the volume
        # Set the text to be spoken
        engine.say(text)
        # Play the speech
        engine.runAndWait()

    def tts_thread(self,text):
        global tts_thread 
        tts_thread = threading.Thread(target=self.tts, args=(text,))
        tts_thread.daemon = True
        tts_thread.start()

    def print_to_console(self, text: str): 
        '''
            prints string to annotated console
            TODO: make apart of a gui
        '''
        self.console.print(text)
    
    def write_to_console(self,text: str): 
        '''
            gets user input from annotated console
            TODO: make apart of a gui
        '''
        self.console.input(text)
    def get_console_status(self,text:str): 
        '''
            gets user status from annotated console
            TODO: make apart of a gui
            arugments: 
            text: text string to write to console
        '''
        return self.console.status(text,spinner="clock")
