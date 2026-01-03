# GarageM8 - Project Overview

## Vision
A straightforward garage management platform that makes booking routine vehicle services as easy as ordering takeout, while giving garage owners simple tools to manage their day without overwhelming their techs.

## Core Philosophy
- **High-volume, high-predictability services first** (oil changes, tire rotations, brake jobs)
- **Low activation energy** for customers - see price, see availability, book in seconds
- **Minimal status complexity** - three states only: Not Started, In Progress, Ready for Pickup
- **Keep techs turning wrenches** - no phone/tablet babysitting required

---

## Target Market

**Primary:** Independent, single-location garages
- 2-6 technicians
- Mix of appointments and walk-ins
- Currently using paper schedules or basic spreadsheets
- Want to attract more customers without adding administrative overhead

**Secondary (Future):** Small chains (2-3 locations) with shared customer base

---

## User Personas

### Customer (Sarah - Busy Professional)
- Needs oil change every 3-4 months
- Wants to know: price, when can you do it, how long will it take
- Checks phone for updates between meetings
- Frustrated by "we'll call you when it's ready" black holes

### Garage Owner (Mike - Shop Owner)
- Runs a 4-bay independent shop
- Juggles walk-ins with appointments
- Things always take longer than estimated
- Needs to shift appointments when diagnosis reveals bigger issues
- Wants more predictable revenue from advance bookings

### Technician (Carlos - Lead Tech)
- Hands are usually dirty or holding tools
- Doesn't want to update software every 10 minutes
- Needs to see his queue for the day
- Sometimes discovers additional issues mid-service

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
- Receive status updates (Not Started → In Progress → Ready for Pickup)
- Simple notifications (SMS/email preference)
- Reschedule if garage needs to adjust timeline

#### 3. Customer Account
- Basic profile (name, phone, email, vehicle info)
- Appointment history
- Saved vehicle preferences for faster rebooking

### Garage Management Side ("Master Panel")

#### 1. Service Catalog Management
- Define services with:
  - Name, description
  - Base price
  - Estimated duration
  - Required supplies/parts (future: inventory integration)
- Enable/disable services
- Adjust pricing and timing

#### 2. Schedule Management
- Daily calendar view showing all appointments
- Color-coded by status (gray, blue, green)
- Drag-and-drop to reschedule (auto-notifies customer)
- Show gaps in schedule (useful for walk-ins)
- Override capacity when needed (intentional overbooking)

#### 3. Tech Dashboard (Simple Kanban)
- Three columns: Not Started | In Progress | Complete
- Each card shows: customer name, vehicle, service, time booked
- Drag cards between columns (triggers status updates)
- Add notes to appointment (internal only)
- Flag for "needs customer contact" (additional work discovered)

#### 4. Customer Management
- Search customer history
- View past services per vehicle
- Contact information
- Notes/flags (e.g., "always runs late", "prefers text")

---

## Key Workflows

### Happy Path: Simple Oil Change

1. **Customer books online**
   - Selects "Oil Change" ($49.99, 30 min)
   - Sees next available slot: Tomorrow 2:00 PM
   - Books → receives confirmation

2. **Day of service**
   - Customer drops off car at 2:00 PM
   - Receptionist checks them in (appointment moves to "Not Started" queue)
   - Tech Carlos sees card on Kanban, drags to "In Progress" at 2:15 PM
   - Customer receives "We've started on your vehicle" notification

3. **Service completes**
   - Carlos drags card to "Complete" at 2:50 PM
   - Customer receives "Your vehicle is ready for pickup" notification
   - Customer picks up, pays, leaves happy

### Realistic Path: Service Runs Over

1. Tech discovers work will take 20 minutes longer
2. System alerts receptionist: "2:30 PM appointment will be delayed"
3. Receptionist sees suggested new time slots for delayed customers
4. Clicks "Notify affected customers" → automated messages sent with reschedule options
5. Customers can accept new time or pick different slot

### Edge Case: Diagnostic Request

1. Customer books "General Inspection" with description: "weird noise from front left"
2. Tech performs inspection, determines needs brake replacement
3. Tech flags appointment: "Customer Approval Needed"
4. Receptionist calls customer with recommendation and new timeline
5. If approved, receptionist books follow-up slot or extends current appointment

---

## Technical Scope

### In Scope (MVP)
- Customer web portal (mobile-responsive)
- Garage admin panel (desktop-focused)
- Fixed service catalog with pricing
- Calendar-based scheduling with availability
- Three-state status tracking
- Basic customer accounts and vehicle records
- SMS/email notifications
- Simple tech Kanban board

### Explicitly Out of Scope (MVP)
- Complex diagnostic workflows
- Detailed progress tracking (percentage complete, specific tasks)
- Inventory management
- Parts ordering integration
- Payment processing (handle at pickup counter)
- Multi-location support
- Franchise/chain features
- Mobile app (native) - responsive web is sufficient
- Tech mobile interface beyond basic Kanban

### Future Considerations
- Integration with parts suppliers
- Payment processing
- Customer loyalty programs
- Review/rating system
- Fleet management for commercial accounts
- Advanced analytics and reporting

---

## Success Metrics

### Customer Side
- Booking completion rate (start → confirm)
- Rebooking rate (repeat customers)
- Average time to book appointment
- Customer satisfaction with status updates

### Garage Side
- Daily schedule fill rate
- Average time to input/manage appointments vs. previous system
- Reduction in "where's my car" phone calls
- Tech adoption rate (using Kanban without resistance)

---

## Non-Functional Requirements

### Ease of Use
- Customer booking flow: max 3 clicks after login
- Garage schedule view: glanceable, minimal scrolling
- Tech interface: big touch targets, minimal text input

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
- Works on older tablets (tech interface)

---

## Design Decisions

### Business Model
**Subscription-based pricing** (similar to Jane app model for practitioners)
- Garages pay monthly/annual subscription to access the platform
- Pricing tiers based on features or number of bookings (TBD)

### Walk-In Handling
- Walk-ins can be **turned away** or **fit into existing gaps** in the schedule
- During transition period, garages may maintain multiple streams (legacy + GarageM8)
- System should show available gaps in schedule that could accommodate walk-ins
- No requirement to force walk-ins into the booking system initially

### Buffer Time Strategy
**No explicit buffer time between appointments**
- Service duration estimates should include realistic time padding
- Example: Oil change might be 20 min actual work, but listed as 30 min service duration
- Shops factor in cleanup, vehicle movement, unexpected delays into the service time itself
- Keeps scheduling simple and predictable

### Customer Authentication
**Email/password per garage**
- Standard email/password signup and login
- Customers create separate accounts per garage they visit
- Future consideration: Federated identity if customer uses multiple garages

### Garage Onboarding
**Individually assisted setup**
- Manual onboarding for each garage (not self-service initially)
- Ensures quality control and proper configuration
- Opportunity to train staff on the system
- Can gather feedback during early adoption phase

---

## Open Questions (New)

1. **Subscription pricing tiers**: Single flat rate or tiered based on features/volume?
2. **Walk-in gap detection**: Should system highlight "fillable gaps" or leave that to garage discretion?
3. **Multi-garage customer accounts**: Future feature or ignore for now?
4. **Service duration padding**: Should system suggest padding amounts or let garages figure it out?
5. **Trial period**: Offer free trial before subscription starts?

---

## Next Steps

1. Define technology stack (frontend, backend, database, hosting)
2. Create wireframes for key screens
3. Design database schema
4. Develop user stories and acceptance criteria
5. Set up development environment
6. Build MVP feature by feature
