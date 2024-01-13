# Overview

James KI0KN, [Colorado ARES](https://coloradoares.org/) Section Emergency
Coordinator, has tasked Joe KD0TYU, Randy N0OEM and Ben KB0UBZ with collecting
information from ARES regions and districts across Colorado:

- ICS 217 Communications Resource Availability Worksheets containing all
  available radio channels,
- ICS 205 Incident Radio Communications Plans containing the most frequently
  used channels, and
- ICS 205A Communications Lists for individual points of contact.

All of this information needs to be put into an application to make it
accessible and useful.

The application should solve a couple of problems:

- Centralize ARES radio channel information for the state of Colorado so that
  ARES operators across the state can reference the appropriate information.
- Allow District Emergency Coordinators (ECs) and delegates like Assistant ECs
  to modify their own district’s information and have that reflected in the
  published data.
- As a bonus, serve other standard blank ICS forms to simplify life for
  individuals writing Incident Action Plans (IAPs).
- As a V2, allow writing, modifying, and duplicating IAPs, plus serving template
  IAPs to cover common situations for the state like blizzards, wildfires, etc.

Chris K0SWE is going to help build the application, starting with the ICS
217/205/205A database.

(Note on terminology: Colorado ARES has adopted area names that match our
Colorado served agencies rather than the [ARRL](http://www.arrl.org/ares)
standard names. The ARRL standard terms are section > district > local. In
Colorado we use section > region > district. This document uses the Colorado
terms.)

# Existing solutions

- Commercial solutions like [Salamander](https://www.salamanderlive.com/),
  [WebEOC](https://www.juvare.com/webeoc/) and [Veoci](https://veoci.com/) have
  been discussed. However, they’re overburdened with too many features requiring
  extensive training, and in most cases they are too expensive to justify.

- A lightweight solution like Google Sheets could be used to centralize and
  share information, but it would be hard to get all of the proper access rights
  in place (e.g. let district members edit information for their own district,
  only allow senior-level personnel to view sensitive contact information, etc).
  This is good as an interim solution to assemble the information we need, but
  is unlikely to be able to support the features we want in the long run.

# Proposed Requirements

## Critical User Journeys

The following requirements are expressed using the "critical user journeys"
framework.

- _As an_ **ARES operator**, _I want to_ **access radio channel and contact
  information** _so that I can_ **be prepared for deployment outside of my own
  district**.
  - Most radio channel information (217 and 205) will be readable by any
    approved user.
  - Contact information (205A) will be more protected.
    - Who grants additional rights to 205A info? District leads? Is it once for
      all time or maybe time-limited? What about scope, all contact info
      everywhere or specific districts?
- _As a_ **District EC (or delegate)**, _I want to_ **update my radio channel
  and contact information** _so that_ **my neighbor districts and regions have
  the latest information**.
  - District leadership can update information in only their own district, not
    other districts.
  - Publish with “last updated” times.
  - Can Regional ECs update info for their districts?
- _As an_ **ARES operator**, _I want to_ **create an account and register with a
  district** _so that I can_ **access information**.
  - Who approves new accounts, the district leads? Can region/section leads step
    in and do it? Needs to be pretty lightweight and flexible so people can do
    this in the midst of an incident.
  - What about members at regional or section level, what superpowers do they
    get? Who approves them? This should be rare enough for Chris to handle.

# Open Source

Chris prefers to release this tool as open source with a permissive license. He
considers this project a service to the ham radio community, and if another
section really wants to run their own installation, they should be able to.

# Technical Design

TBD

# Willem AC0KQ’s Wish List

- Ability to create a complete IAP and export it as a PDF. At least 201, 202,
  204, 205, 205A, 206 and 208.
- Create a new IAP from a previous IAP
- Set the COML, signature, incident, period, etc. ONCE
- Database of all ARES members with contact information to populate 204/205A
- Database with frequently used external contacts, e.g. hospital, sherriff, EMS,
  etc. (Somebody needs to take on the task to keep this up to date)
- One click inclusion of 9-line, blank 213, a 214 with incident and period
  pre-filled
- Nice interface to the org chart
- Ability to include PDF pages (additional information)
- Drag and drop image for the title page
- Some way of including a map - image or integrate with Google maps?
- Ability to do detailed 204 work assignments by division/strike team/…. For
  this I like to repeat stuff such as frequencies and the like. A super neat
  feature would be to be able to do this by variable with reference to the 205
  so when the 205 changes, this changes also.
