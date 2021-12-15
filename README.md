# 550-Project

by Ahmed Ahmed, Anushka Agarwal, Keren Makhervaks, Oliver Shi

CIS450/550: Databases and Information Systems, Fall 2021

Credentials:

Host: @restaurants.cftfvdzt8gl8.us-east-1.rds.amazonaws.com
Username: CIS450550
Password: CIS450550
Port: 3306

Security Protocols:
(1) Created Password hashing using Bcrypt and utf8 encodings for storage of sensitive data 
(2) Enabled CSRF protection using token validation on all requests 
(3) Enabled XSS protection using Content Security Policy to specify trusted origins of loading resources
(4) Secure Cookies by instructing browser to hide cookie content from python code 
(5) Protect against injection attacks by not allowing sending cookies from other sites except in GET requests
