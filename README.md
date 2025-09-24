# Event Management System 

## 1. Project Overview
**Project Name:** Event Management System  

**Objective:**  
- Manage events conducted by INC at Jila/Block level.  
- Allow users to view and update events.  
- Allow admin to add events, view reports, and track user activity.  

**Tech Stack:**  
- **Frontend:** HTML, CSS, JavaScript, Bootstrap, EJS  
- **Backend:** Node.js (Express)  
- **Database:** MySQL  

---

## 2. Features Implemented

### 2.1 Login Page
- 4-digit code authentication.  
- Role-based access: **User → Home Page**, **Admin → Admin Panel**.  
- All instructions displayed in **Hindi**.  
- Database table `users` stores code, role, designation, last_visit, and monthly_count.  

### 2.2 User Home Page
- Logo displayed at the top.  
- Event table showing: **S. No., Event Name (hyperlink), Event Date, Actions (Show Details | Update)**.  
- Update redirects to event update page.  

### 2.3 Event Details Page
- Displays full event information: **Name, Description, Start & End Date/Time, Issue Date, Location, Event Type**.  
- User views are tracked (Viewed/Not Viewed).  

### 2.4 Update Page (User)
- Editable fields: **Location, Start & End Date/Time**.  
- Event Name is **read-only**.  
- On successful update, redirects to **Home Page with alert message**.  

### 2.5 Admin Panel
- Same interface as user but with extra functionalities:  
  - **Add Event:** Admin can add new events with all details.  
  - **Show Report:** Admin can see which users have viewed or updated events.  
  - Event list table includes **'Show Report' action**.  

### 2.6 Extra Features
- Responsive design using **Bootstrap CDN**.  
- All pages display in **Hindi**.  
- Success alerts shown for updates and new events.  

---

## 3. Database Design

### Table: users
| Column       | Type     | Description                           |
|--------------|----------|---------------------------------------|
| id           | INT      | Primary Key, Auto Increment           |
| username     | VARCHAR  | User/Admin Name                       |
| code         | VARCHAR  | 4-digit login code                    |
| role         | ENUM     | 'user' / 'admin'                      |
| designation  | VARCHAR  | e.g., Block Adhyaksh, System Admin    |
| last_visit   | DATETIME | Last login timestamp                  |
| monthly_count| INT      | Number of logins in month             |

### Table: events
| Column     | Type     | Description                |
|------------|----------|----------------------------|
| id         | INT      | Primary Key, Auto Increment|
| name       | VARCHAR  | Event Name                 |
| description| TEXT     | Event Description          |
| start_date | DATETIME | Event Start Date & Time    |
| end_date   | DATETIME | Event End Date & Time      |
| issue_date | DATE     | Event Issue Date           |
| location   | VARCHAR  | Event Location             |
| event_type | ENUM     | Dhrana, Meeting, Band, Rally, Sabha, Gayapan |

### Table: event_tracking
| Column     | Type      | Description                        |
|------------|-----------|------------------------------------|
| id         | INT       | Primary Key, Auto Increment        |
| user_id    | INT       | Foreign key (users.id)             |
| event_id   | INT       | Foreign key (events.id)            |
| viewed     | BOOLEAN   | Whether user viewed event (0/1)    |
| updated    | BOOLEAN   | Whether user updated event (0/1)   |
| updated_at | TIMESTAMP | Auto set on update                 |

---

## 4. Folder Structure
event-management/
│── config/
│   └── db.js              # MySQL connection
│── public/                # Static files
│   ├── css/
│   └── js/
│── routes/
│   ├── auth.js            # Login routes
│   └── events.js          # Event CRUD routes
│── views/
│   ├── login.ejs
│   ├── home.ejs
│   ├── admin.ejs
│   ├── addEvent.ejs
│   ├── details.ejs
│   ├── update.ejs
│   └── Mistake.ejs
│── node_modules/          # Ignored via .gitignore
│── package.json
│── server.js
│── README.md


---

## 5. Workflow
- User/Admin opens login page and enters **4-digit code**.  
- Authentication checks MySQL database for role.  
- **User:** Redirected to Home Page → can view event details, update location and date.  
- **Admin:** Redirected to Admin Panel → can add events, view reports of user activity.  

---

## 6. Future Enhancements
- File upload for **event photos and videos**.  
- Detailed **analytics dashboard** for admin.  
- **Email notifications** to users on new events.  
- Advanced **filters for events**.  

---

## 7. Conclusion
- Task requirements fully implemented.  
- User and admin functionalities separated.  
- All display in **Hindi** with **responsive design** applied.  
