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
- **Django** 
- **React**
- **Docker**
- **Nginx**
- **Redis**
- **Celery & Celery Beat**
### Prerequisites
- **Python** must be installed.
- **Docker** must be installed and running on your system.

### Steps to Setup the Project Locally
1. **Clone the Repository and setup virtual environment**
   ```bash
   git clone https://github.com/Saifalicoder/TaskMaster.git
   cd TaskMaster
  

   ```
1. **Create Environment Files**
   - In the root directory, create two files: .env.dev and .env.dev.db.
   
   - Copy and paste the following configurations into each file:
   - .env.dev
     ```
      DEBUG=1
      SECRET_KEY=secret
      DJANGO_ALLOWED_HOSTS=localhost 127.0.0.1 [::1]
      SQL_ENGINE=django.db.backends.postgresql
      SQL_DATABASE=dbname
      SQL_USER=user
      SQL_PASSWORD=password
      SQL_HOST=db
      SQL_PORT=5432
      CELERY_BROKER_URL=redis://redis:6379/0
      CELERY_BACKEND=redis://redis:6379/0
     ```
    - .env.dev.db
        ```
         POSTGRES_USER=user
         POSTGRES_PASSWORD=password
         POSTGRES_DB=dbname
   
        ```
   - Run this command
     ```bash
   
       docker-compose up --build
      ```
3. **Run Migrations and Create Superuser**
   ```bash
   docker-compose exec web python manage.py migrate
   docker-compose exec web python manage.py createsuperuser

   ```
4. **Access the Application**
   - Visit http://localhost:80 in your web browser to access the application.

![image](https://github.com/user-attachments/assets/6f4fd60a-a45b-4a9c-b7b5-13a543d51ab2)

![image](https://github.com/user-attachments/assets/66bf5c13-f7f4-4a77-ae64-aa486ad1d079)

![image](https://github.com/user-attachments/assets/53a9b80a-c1d2-47c0-b25c-cfacd8271cee)


          
