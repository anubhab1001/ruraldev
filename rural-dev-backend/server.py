from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS

# Email configuration
SMTP_CONFIG = {
    'server': os.getenv('SMTP_SERVER', 'smtp.gmail.com'),
    'port': int(os.getenv('SMTP_PORT', 587)),
    'email': os.getenv('EMAIL_ADDRESS'),
    'password': os.getenv('EMAIL_PASSWORD')
}

@app.route('/api/register', methods=['POST'])
def register_workshop():
    try:
        data = request.json
        
        # Validate required fields
        if not all([data.get('name'), data.get('email'), data.get('workshop')]):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Create email message
        msg = MIMEText(f"""
        New Workshop Registration:
        Name: {data['name']}
        Email: {data['email']}
        Workshop: {data['workshop']}
        
        Thank you for registering!
        """)
        
        msg['Subject'] = f"Workshop Registration: {data['workshop']}"
        msg['From'] = SMTP_CONFIG['email']
        msg['To'] = data['email']  # Send to user
        
        # Send confirmation copy to admin
        admin_msg = MIMEText(f"New registration: {data}")
        admin_msg['Subject'] = f"New Registration: {data['workshop']}"
        admin_msg['From'] = SMTP_CONFIG['email']
        admin_msg['To'] = SMTP_CONFIG['email']
        
        # Connect to SMTP server
        with smtplib.SMTP(SMTP_CONFIG['server'], SMTP_CONFIG['port']) as server:
            server.starttls()
            server.login(SMTP_CONFIG['email'], SMTP_CONFIG['password'])
            server.send_message(msg)  # To user
            server.send_message(admin_msg)  # To admin
            
        return jsonify({
            'success': True,
            'message': 'Registration successful! Check your email.'
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)