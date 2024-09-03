
from smartAssistant import SmartAssistant  # Import the custom class
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# Initialize the SmartAssistant class
assistant = SmartAssistant("JARVIS")

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/get_response', methods=['POST'])
def get_response():
    if request.content_type != 'application/json':
        return jsonify({'error': 'Content-Type must be application/json'}), 400
    
    data = request.json
    if data is None or 'prompt' not in data:
        return jsonify({'error': 'Invalid input'}), 400

    prompt = data['prompt']
    response = assistant.ask_llm(prompt)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
