---
title: A Calendar for Planning Travel Across Time Zones
datePublished: 2024-09-22
summary: TODO
tags: [user-experience]
tools: [typescript]
---

Each column of the schedule represents a distinct `CalendarDay`, which consists of:

* a `PlainDate`, such as `January 3, 2024`
* a time zone, such as `Asia/Tokyo`

A calendar day will usually be 24 hours, but may be shorter or longer due to irregularities like daylight savings.

The maximum length of a calendar day is 
* an interval describing the traveler's 
* an **occupancy interval**, representing the start and end of t

> Under the naming conventions of the Temporal API, a calendar day could be referred to as a `ZonedDate` (a `PlainDate` plus a time zone).


# Events

single-day events with a beginning and end date
  * meetings, doctor appointments, meetups
* multi-day events
  * conferences
  * vacation / out of office
  * friend visiting from out of town
* soft ranges
  * e.g. hotel check-in window (need to see label, but otherwise OK to show behind other events)