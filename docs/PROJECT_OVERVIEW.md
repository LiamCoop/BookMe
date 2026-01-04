# BookMe - Project Overview

## Vision
A straightforward booking management platform that facilitates booking management for small businesses.
Think nail/hair, small garages, private practitioners offering a variety of services, from small to large.
Rather than managing phones, streamline things and increase your sales rates by allowing users to simply book online.

## Core Philosophy
- **High-volume, high-predictability services first**
- **Low activation energy** for customers - see price, see availability, book in seconds
- **Minimal status complexity** - three states only: Not Started, In Progress, Complete

---

## Target Market

**Primary:** Independent small, local businesses
- Currently using paper schedules or basic spreadsheets
- Want to attract more customers without adding administrative overhead

---

## User Personas

ADD USER PERSONAS

---

## Core Features

### Customer-Facing Side

#### 1. Service Catalog & Booking
- Browse available services with fixed prices and time estimates
- See real-time availability (time slots based on service duration)
- Book appointments with minimal clicks (service → date/time → confirm)
- Optional: Brief description field for special requests or concerns

#### 2. Appointment Management
- View upcoming appointments
- Receive status updates (Not Started → In Progress → Complete)
- Simple notifications (SMS/email preference)
- Reschedule if business needs to adjust timeline

#### 3. Customer Account
- Basic profile (name, phone, email)
- Appointment history, should be scoped based on the specific reference business

### Business Management Side ("Master Panel")

#### 1. Service Catalog Management
- Define services with:
  - Name, description
  - Base price
  - Estimated duration
- Enable/disable services
- Adjust pricing and timing

#### 2. Schedule Management
- Daily calendar view showing all appointments
- Color-coded by status (gray, blue, green)
- Drag-and-drop to reschedule (auto-notifies customer)
- Show gaps in schedule (useful for walk-ins)
- Override capacity when needed (intentional overbooking)

#### 3. Customer Management
- Search customer history
- View past services
- Contact information
- Notes/flags (e.g., "always runs late", "prefers text")

---

## Key Workflows

### Happy Path: Standard Service Booking

1. **Customer books online**
   - Selects service (e.g., "Haircut & Style" $45, 45 min)
   - Sees next available slot: Tomorrow 2:00 PM
   - Books → receives confirmation

2. **Day of service**
   - Customer arrives at 2:00 PM
   - Front desk checks them in (appointment moves to "Not Started" queue)
   - Service provider sees appointment, marks as "In Progress" at 2:15 PM
   - Customer receives "Your appointment has started" notification

3. **Service completes**
   - Provider marks appointment as "Complete" at 2:50 PM
   - Customer receives "Your service is complete" notification
   - Customer checks out, pays, leaves satisfied

### Realistic Path: Service Runs Over

1. Service provider discovers work will take 20 minutes longer
2. System alerts front desk: "2:30 PM appointment will be delayed"
3. Front desk sees suggested new time slots for affected customers
4. Clicks "Notify affected customers" → automated messages sent with reschedule options
5. Customers can accept new time or pick different slot

### Edge Case: Additional Services Needed

1. Customer books standard service with description field noting specific concerns
2. Service provider assesses and determines additional work is needed
3. Provider flags appointment: "Customer Approval Needed"
4. Front desk contacts customer with recommendation and updated timeline/pricing
5. If approved, front desk books follow-up slot or extends current appointment

---

## Success Metrics

### Customer Side
- Booking completion rate (start → confirm)
- Rebooking rate (repeat customers)
- Average time to book appointment
- Customer satisfaction with status updates

### Business Side
- Daily schedule fill rate
- Average time to input/manage appointments vs. previous system
- Reduction in status inquiry calls/messages
- Staff adoption rate and ease of use feedback

---

## Non-Functional Requirements

### Ease of Use
- Customer booking flow: max 3 clicks after login
- Business schedule view: glanceable, minimal scrolling
- Staff interface: big touch targets, minimal text input

### Performance
- Page loads: < 2 seconds
- Real-time status updates: < 5 second delay
- Schedule changes reflect immediately

### Reliability
- 99% uptime during business hours (6 AM - 8 PM local time)
- Graceful degradation if notifications fail
- Data backup daily

### Accessibility
- WCAG 2.1 AA compliance
- Mobile responsive (customer side)
- Works on older tablets (staff interface)

---

## Design Decisions

### Business Model
**Subscription-based pricing** (similar to Jane app model for practitioners)
- Businesses pay monthly/annual subscription to access the platform
- Pricing tiers based on features or number of bookings (TBD)

### Walk-In Handling
- Walk-ins can be **turned away** or **fit into existing gaps** in the schedule
- During transition period, businesses may maintain multiple streams (legacy + BookMe)
- System should show available gaps in schedule that could accommodate walk-ins
- No requirement to force walk-ins into the booking system initially

### Buffer Time Strategy
**No explicit buffer time between appointments**
- Service duration estimates should include realistic time padding
- Example: A haircut might be 30 min actual work, but listed as 45 min service duration
- Businesses factor in setup/teardown, unexpected delays, and customer transitions
- Keeps scheduling simple and predictable

### Customer Authentication
**Email/password for the platform**
- Standard email/password signup and login
- Customers create separate accounts per business they visit
- Future consideration: Federated identity if customer uses multiple businesses

### Business Onboarding
**Individually assisted setup**
- Manual onboarding for each business (not self-service initially)
- Ensures quality control and proper configuration
- Opportunity to train staff on the system
- Can gather feedback during early adoption phase

---
