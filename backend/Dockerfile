# Use a lightweight Python image
FROM python:3.11-slim-buster

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port Flask/Gunicorn will run on
EXPOSE 8000

# Start Gunicorn and run the Flask app
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "app:app"]
