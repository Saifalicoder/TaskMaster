## TaskMaster
A powerful, full-stack To-Do application built with Django, React, Docker, and Nginx. This app combines a responsive front end with a scalable back end to help users organize tasks and stay on top of their schedules. 
TaskMaster leverages Redis and Celery for asynchronous task processing and uses Celery Beat to send periodic reminders, ensuring no task is overlooked. It also ncludes Google login

### Key Features
- Django Backend: A robust REST API to handle task management and user authentication.
- React Frontend: A modern and user-friendly interface for seamless task management.
- Dockerized Services: Fully containerized setup for easy deployment and environment consistency.
- Nginx as Reverse Proxy: Efficient load distribution and enhanced security with Nginx as the reverse proxy.
- Redis and Celery: Background processing for sending periodic task reminders.
- Periodic Reminders: Automated reminders using Celery Beat to keep users informed of upcoming tasks.
### Technologies Used
- Django 
- React
- Docker
- Nginx
- Redis
- Celery & Celery Beat
### Prerequisites
- **Python 3.x** must be installed.
- Docker must be installed and running on your system.

### Steps to Setup the Project Locally
1. **Clone the Repository and setup virtual environment**
   ```bash
   git clone https://github.com/Saifalicoder/TaskMaster.git
   cd TaskMaster
   docker-compose up --build

   ```
2. **Run Migrations and Create Superuser**
   ```bash
   docker-compose exec web python manage.py migrate
   docker-compose exec web python manage.py createsuperuser

   ```
3. **Access the Application**
   - Visit http://localhost:80 in your web browser to access the application.

![image](https://github.com/user-attachments/assets/e1595ad1-5345-4044-b7d3-643754b20f96)

![image](https://github.com/user-attachments/assets/d32308a8-6e0b-480e-9582-bd20d7bc4fcc)

![image](https://github.com/user-attachments/assets/53a9b80a-c1d2-47c0-b25c-cfacd8271cee)


          
