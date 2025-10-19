# ...existing code...
import os
import sys
import logging
from mpxpy.mathpix_client import MathpixClient
from dotenv import load_dotenv

load_dotenv()

# Validate credentials before creating client / calling endpoints
app_id = os.getenv("MATHPIX_APP_ID")
app_key = os.getenv("MATHPIX_APP_KEY")
api_url = os.getenv("MATHPIX_URL")

if not app_id or not app_key:
    print("Error: MATHPIX_APP_ID and MATHPIX_APP_KEY must be set (env, ~/.mpx/config, or .env).")
    sys.exit(1)

# Will use ~/.mpx/config or environment variables if args omitted
client = MathpixClient(
    app_id=app_id,
    app_key=app_key,
    api_url=api_url
)

# Process a PDF file with multiple conversion formats and options
try:
    pdf = client.pdf_new(
        file_path='/Users/hunghoanggia/Downloads/AngleBased_HexOpt.pdf',
        convert_to_docx=True,
        convert_to_md=True,
        convert_to_pptx=True,
        convert_to_md_zip=True,
        # Optional pdf-level improve_mathpix argument is default True
    )
except Exception as e:
    # Try to surface HTTP response details when available (requests.HTTPError has .response)
    print("Failed to create PDF:", repr(e))
    resp = getattr(e, "response", None)
    if resp is not None:
        try:
            print("HTTP status:", resp.status_code)
            print("Response body:", resp.text)
        except Exception:
            pass
    else:
        print("Ensure your App ID / App Key are correct and have access to the PDF endpoint.")
    sys.exit(1)

# Wait for processing to complete. Optional timeout argument is 60 seconds by default.
try:
    pdf.wait_until_complete(timeout=30)
except Exception as e:
    print("Error while waiting for PDF processing:", repr(e))
    sys.exit(1)

# Ensure output directory exists
os.makedirs("output", exist_ok=True)

# Get the Markdown outputs
md_output_path = pdf.to_md_file(path='output/sample.md')
md_text = pdf.to_md_text() # is type str
print(md_text)

# Get the DOCX outputs
docx_output_path = pdf.to_docx_file(path='output/sample.docx')
docx_bytes = pdf.to_docx_bytes() # is type bytes

# Get the PowerPoint outputs
pptx_output_path = pdf.to_pptx_file(path='output/sample.pptx')
pptx_bytes = pdf.to_pptx_bytes() # is type bytes

# Get the Markdown ZIP outputs (includes embedded images)
md_zip_output_path = pdf.to_md_zip_file(path='output/sample.md.zip')
md_zip_bytes = pdf.to_md_zip_bytes() # is type bytes

# Get the JSON outputs
lines_json_output_path = pdf.to_lines_json_file(path='output/sample.lines.json')
lines_json = pdf.to_lines_json() # parses JSON into type Dict
# ...existing code...