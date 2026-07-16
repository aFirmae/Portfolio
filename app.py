from flask import Flask, render_template, send_from_directory, redirect, request, make_response
import os
import json
from dotenv import load_dotenv
load_dotenv()
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import pyotp

app = Flask(__name__, template_folder='templates')

# Initialize Limiter
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["50 per minute", "5 per second"],
    storage_uri="memory://"
)

VERSION = '1.0.8'
LEETCODE_USERNAME = 'aFirma'

@app.route('/')
def home():
    return render_template('index.html', version=VERSION, leetcode_username=LEETCODE_USERNAME)

# Serve assets folder
@app.route('/assets/<path:filename>')
@limiter.exempt
def custom_static(filename):
    return send_from_directory(os.path.join(app.root_path, 'public', 'assets'), filename)

@app.route('/documents/<path:filename>')
@limiter.exempt
def serve_documents(filename):
    return send_from_directory(os.path.join(app.root_path, 'public', 'documents'), filename)

@app.route('/docs')
def docs():
    # Check if user has the authorization cookie
    if request.cookies.get('docs_access') == 'true':
        return render_template('docs.html', version=VERSION)
    
    return render_template('docs_auth.html', version=VERSION)

@app.route('/docs/auth', methods=['POST'])
@limiter.limit("10 per minute")
def docs_auth():
    otp_code = request.form.get('otp_code')
    totp_secret = os.environ.get("TOTP_SECRET")
    
    if not otp_code:
        return render_template('docs_auth.html', version=VERSION, error="Missing authentication code.")
        
    if not totp_secret:
        return render_template('docs_auth.html', version=VERSION, error="Server configuration error: TOTP secret missing.")
        
    totp = pyotp.TOTP(totp_secret)
    
    # Verify the code (allows 1 period before/after for slight time drift)
    if totp.verify(otp_code, valid_window=1):
        # Create a response that redirects to /docs
        resp = make_response(redirect('/docs'))
        # Set a cookie valid for 1 day (86400 seconds)
        resp.set_cookie('docs_access', 'true', max_age=86400, httponly=True, secure=False)
        return resp
    else:
        # Re-render with error
        return render_template('docs_auth.html', version=VERSION, error="Invalid code. Please try again.")


# Serve specific root files
@app.route('/resume')
@limiter.exempt
def resume():
    try:
        return send_from_directory(os.path.join(app.root_path, 'public', 'assets'), 'Resume_Nilashis_Saha.pdf')
    except Exception:
        return redirect("/assets/Resume_Nilashis_Saha.pdf")

@app.route('/gallery')
def gallery():
    return render_template('gallery.html', version=VERSION)

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html', version=VERSION), 404

@app.errorhandler(429)
def ratelimit_handler(e):
    return render_template('429.html', version=VERSION), 429

if __name__ == '__main__':
    app.run(debug=True, port=5000)
