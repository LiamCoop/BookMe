# MVP Checklist – Booking Platform

---

## 1. Business Persona Features

### A. Calendar & Booking Management

| Feature                                                         | Priority | Notes                                                         |
| --------------------------------------------------------------- | -------- | ------------------------------------------------------------- |
| Calendar view (monthly/weekly)                                  | High     | Display bookings per day/employee.                            |
| Day view (hourly slots)                                         | High     | Default view for booking details.                             |
| Create booking (assign customer, service, employee, date, time) | High     | Automatically blocks availability; prevents double-booking.   |
| Update booking                                                  | High     | Change any booking field (customer, service, employee, time). |
| Delete booking                                                  | High     | Remove bookings entirely.                                     |
| Handle no-shows                                                 | High     | Mark separately from deletions.                               |
| Check-in customers                                              | High     | Front-desk confirms attendance.                               |
| Reschedule booking                                              | Medium   | Manual update allowed via UI.                                 |

### B. Service Management

| Feature                                             | Priority | Notes                                |
| --------------------------------------------------- | -------- | ------------------------------------ |
| Create service (name, description, duration, price) | High     |                                      |
| Update service                                      | High     |                                      |
| Delete service                                      | High     |                                      |
| Assign service to employees                         | High     | Defines who can perform the service. |
| Time buffers before/after appointment               | High     | Configurable per service.            |
| Add-ons (optional extras)                           | Medium   | Extra cost per service.              |

### C. Employee Management

| Feature                      | Priority | Notes                       |
| ---------------------------- | -------- | --------------------------- |
| Add/update/delete employees  | High     | Needed to assign services.  |
| Assign services to employees | High     | Core to booking assignment. |

---

## 2. Customer Persona Features

### A. Booking Flow

| Feature                           | Priority | Notes                                            |
| --------------------------------- | -------- | ------------------------------------------------ |
| View services for a business      | High     | Includes service description, duration, add-ons. |
| Select service → day → time slot  | High     | Optionally select employee if required.          |
| Confirm booking                   | High     | Includes optional notes field.                   |
| Cancel or reschedule bookings     | High     | Customer can manage their own bookings.          |
| Back-to-back appointments allowed | High     | Only one booking per time slot per customer.     |

### B. Booking Management

| Feature                                     | Priority | Notes                    |
| ------------------------------------------- | -------- | ------------------------ |
| View all bookings across all businesses     | High     | Centralized dashboard.   |
| Filter bookings by business or service type | High     | Optional search by date. |
| Past and upcoming bookings                  | High     |                          |

### C. Customer Profiles

| Feature                                                 | Priority | Notes                                           |
| ------------------------------------------------------- | -------- | ----------------------------------------------- |
| Store general customer info (name, contact info, notes) | High     | Minimal MVP info.                               |
| Business-specific booking history                       | High     | Businesses see only bookings at their location. |

---

## 3. Cross-Persona / Platform Features

### A. Availability & Scheduling

| Feature                                    | Priority | Notes                                      |
| ------------------------------------------ | -------- | ------------------------------------------ |
| Track available slots per employee/service | High     | Prevent double-booking.                    |
| Multi-location support                     | High     | Businesses may have multiple locations.    |
| Walk-in booking support                    | High     | Front-desk can add guest bookings quickly. |
| Back-to-back bookings per employee allowed | High     |                                            |

### B. Notifications

| Feature                                                                    | Priority | Notes                               |
| -------------------------------------------------------------------------- | -------- | ----------------------------------- |
| Basic booking confirmation to customer (email/push)                        | High     |                                     |
| Employee/business notifications (booking, cancellation, check-in, no-show) | Low      | Future MVP, not required initially. |

### C. Filtering & Search

| Feature                                                 | Priority | Notes |
| ------------------------------------------------------- | -------- | ----- |
| Customers: filter by business, service, date            | High     |       |
| Businesses: filter by employee, service, date, location | High     |       |

### D. Authentication & Authorization

| Feature                                                              | Priority | Notes |
| -------------------------------------------------------------------- | -------- | ----- |
| Role-based accounts (business admin, front-desk, employee, customer) | High     |       |
| Customers can manage own bookings                                    | High     |       |
| Businesses manage services, employees, calendars                     | High     |       |

---

## 4. MVP Exclusions / Future Features

* Recurring bookings.
* Drag-and-drop calendar rescheduling.
* Individual employee calendars.
* Notifications for employees (future).
* Waitlist system (dependent on notifications).
* Expanded customer profiles (preferences, allergies).
* Reporting / analytics.
* Calendar integrations (Google/Outlook).

