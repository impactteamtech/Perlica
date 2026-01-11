import os
from typing import Optional

import requests
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr

router = APIRouter()


class BookingRequest(BaseModel):
    fullName: str
    email: EmailStr
    phoneNumber: str
    pickupDate: str
    pickupTime: str
    toDestination: str


BREVO_API_KEY = os.getenv("BREVO_API_KEY")
SENDER_EMAIL = os.getenv("BREVO_SENDER_EMAIL", "admin@perlicatoursandtravel.com")
SENDER_NAME = os.getenv("BREVO_SENDER_NAME", "Perlica Travel")
NOTIFICATION_EMAIL = os.getenv("BREVO_NOTIFICATION_EMAIL", "admin@perlicatoursandtravel.com")
NOTIFICATION_NAME = os.getenv("BREVO_NOTIFICATION_NAME", "Perlica Reservations")
GOOGLE_SHEET_WEBAPP_URL = os.getenv(
    "GOOGLE_SHEET_WEBAPP_URL",
    "https://script.google.com/macros/s/AKfycbyqnn7IJOdQvGvkYpPw-CNVHvYxmh_E3n6yk34PfFqKPVqow1s4aX-eju6Y_-iIC1HW8w/exec",
)


class ContactRequest(BaseModel):
    fullName: str
    email: EmailStr
    phoneNumber: Optional[str] = None
    subject: str
    message: str


@router.post("/send-booking-email")
def send_booking_email(booking: BookingRequest):
    if not BREVO_API_KEY:
        raise HTTPException(status_code=500, detail="Brevo API key not configured")

    url = "https://api.brevo.com/v3/smtp/email"

    headers = {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
    }


    html_content = f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
                /* Base Styles */
                body {{ 
                    margin: 0; padding: 0; width: 100% !important; 
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
                    background-color: #f3f4f6; color: #1e293b; 
                }}
                .wrapper {{ width: 100%; background-color: #f3f4f6; padding: 40px 0; }}
                .container {{ 
                    max-width: 600px; margin: 0 auto; background-color: #ffffff; 
                    border-radius: 16px; overflow: hidden; 
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); 
                }}
                
                /* Header */
                .header {{ 
                    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); 
                    padding: 40px 30px; text-align: center; color: #ffffff; 
                }}
                .header h2 {{ margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; }}
                .brand-sub {{ color: #10b981; font-weight: 600; text-transform: uppercase; font-size: 12px; letter-spacing: 2px; margin-top: 8px; display: block; }}
                
                /* Content */
                .content {{ padding: 40px 35px; }}
                .greeting {{ font-size: 18px; font-weight: 600; color: #0f172a; margin-bottom: 12px; }}
                .intro-text {{ color: #64748b; font-size: 16px; line-height: 1.6; margin-bottom: 30px; }}
                
                /* Details Card */
                .booking-card {{ 
                    background-color: #f8fafc; border: 1px solid #e2e8f0; 
                    border-radius: 12px; padding: 25px; margin-bottom: 30px; 
                }}
                .detail-row {{ display: flex; padding: 10px 0; border-bottom: 1px solid #edf2f7; }}
                .detail-row:last-child {{ border-bottom: none; }}
                .label {{ color: #94a3b8; font-size: 13px; font-weight: 600; text-transform: uppercase; width: 120px; flex-shrink: 0; }}
                .value {{ color: #334155; font-size: 15px; font-weight: 500; }}
                
                /* Footer */
                .footer {{ 
                    text-align: center; padding: 30px; 
                    background-color: #f8fafc; border-top: 1px solid #e2e8f0; 
                    font-size: 13px; color: #94a3b8; 
                }}
                .status-badge {{
                    display: inline-block; background-color: #dcfce7; color: #15803d;
                    padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700;
                    margin-bottom: 15px;
                }}
            </style>
        </head>
        <body>
            <div class="wrapper">
                <div class="container">
                    <div class="header">
                        <span class="brand-sub">Perlica Travel</span>
                        <h2>New Car Booking</h2>
                    </div>
                    
                    <div class="content">
                        <div class="status-badge">ACTION REQUIRED</div>
                        <div class="greeting">Hello {NOTIFICATION_NAME},</div>
                        <p class="intro-text">
                            A new car reservation request has been received from <strong>{booking.fullName}</strong>. 
                            Please review the details below and contact the guest to confirm.
                        </p>
                        
                        <div class="booking-card">
                            <table width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td style="padding: 10px 0; color: #94a3b8; font-size: 12px; font-weight: 600; text-transform: uppercase; width: 130px;">Guest Name</td>
                                    <td style="padding: 10px 0; color: #1e293b; font-size: 15px; font-weight: 600;">{booking.fullName}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; color: #94a3b8; font-size: 12px; font-weight: 600; text-transform: uppercase;">Email Address</td>
                                    <td style="padding: 10px 0; color: #1e293b; font-size: 15px;">{booking.email}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; color: #94a3b8; font-size: 12px; font-weight: 600; text-transform: uppercase;">Phone Number</td>
                                    <td style="padding: 10px 0; color: #1e293b; font-size: 15px;">{booking.phoneNumber}</td>
                                </tr>
                                <tr><td colspan="2" style="border-top: 1px solid #e2e8f0; padding-top: 10px; margin-top: 10px;"></td></tr>
                                <tr>
                                    <td style="padding: 10px 0; color: #94a3b8; font-size: 12px; font-weight: 600; text-transform: uppercase;">Pickup Date</td>
                                    <td style="padding: 10px 0; color: #1e293b; font-size: 15px; font-weight: 600;">{booking.pickupDate}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; color: #94a3b8; font-size: 12px; font-weight: 600; text-transform: uppercase;">Pickup Time</td>
                                    <td style="padding: 10px 0; color: #1e293b; font-size: 15px;">{booking.pickupTime}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; color: #94a3b8; font-size: 12px; font-weight: 600; text-transform: uppercase;">Destination</td>
                                    <td style="padding: 10px 0; color: #1e293b; font-size: 15px;">{booking.toDestination}</td>
                                </tr>
                            </table>
                        </div>
                        
                        <p style="color: #64748b; font-size: 14px; text-align: center; font-style: italic;">
                            Check the dashboard for more details or reply to this email to contact the guest.
                        </p>
                    </div>
                    
                    <div class="footer">
                        <p>&copy; 2026 Perlica Travel. All rights reserved.</p>
                        <p>This is an automated notification for internal use.</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
    """

    text_content = (
        "New car booking submitted.\n"
        f"Guest name: {booking.fullName}\n"
        f"Email: {booking.email}\n"
        f"Phone: {booking.phoneNumber}\n"
        f"Pickup date: {booking.pickupDate}\n"
        f"Pickup time: {booking.pickupTime}\n"
        f"Destination: {booking.toDestination}\n"
    )

    payload = {
        "sender": {"name": SENDER_NAME, "email": SENDER_EMAIL},
        "to": [{"email": NOTIFICATION_EMAIL, "name": NOTIFICATION_NAME}],
        "replyTo": {"email": booking.email, "name": booking.fullName},
        "subject": f"New Car Booking from {booking.fullName}",
        "htmlContent": html_content,
        "textContent": text_content,
    }

    try:
        response = requests.post(url, json=payload, headers=headers, timeout=15)
        response.raise_for_status()
        # After email is sent successfully, also send data to Google Sheets via Apps Script
        sheet_payload = {
            "guestName": booking.fullName,
            "email": booking.email,
            "phone": booking.phoneNumber,
            "pickupDate": booking.pickupDate,
            "pickupTime": booking.pickupTime,
            "destination": booking.toDestination,
        }

        try:
            requests.post(
                GOOGLE_SHEET_WEBAPP_URL,
                json=sheet_payload,
                timeout=10,
            )
        except requests.exceptions.RequestException:
            print("Failed to send booking data to Google Sheets")

        return {"message": "Email sent successfully"}
    except requests.exceptions.HTTPError as exc:
        status_code = exc.response.status_code if exc.response is not None else 502
        detail_message = "Email service rejected the request."
        if exc.response is not None:
            try:
                body = exc.response.json()
                detail_message = body.get("message") or body.get("detail") or detail_message
            except ValueError:
                detail_message = exc.response.text or detail_message
        raise HTTPException(status_code=status_code, detail=detail_message)
    except requests.exceptions.RequestException as exc:
        raise HTTPException(status_code=502, detail="Unable to reach email service") from exc


@router.post("/send-contact-email")
def send_contact_email(contact: ContactRequest):
    """Handle contact form submissions.

    Sends a notification email to the internal team and a thank-you email
    to the user who submitted the form.
    """

    if not BREVO_API_KEY:
        raise HTTPException(status_code=500, detail="Brevo API key not configured")

    if not SENDER_EMAIL or not NOTIFICATION_EMAIL:
        raise HTTPException(status_code=500, detail="Email sender/recipient not configured")

    url = "https://api.brevo.com/v3/smtp/email"

    headers = {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
    }

    # 1) Internal notification email
    internal_html = f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>New Contact Message</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb; color: #111827;">
            <div style="max-width: 640px; margin: 0 auto; padding: 24px; background: #ffffff; border-radius: 12px; border: 1px solid #e5e7eb;">
                <h2 style="margin: 0 0 16px; font-size: 22px;">New Contact Form Submission</h2>
                <p style="margin: 0 0 16px; color: #4b5563;">You have received a new message from the website contact form.</p>

                <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
                    <tr>
                        <td style="padding: 8px 0; font-size: 12px; text-transform: uppercase; color: #6b7280; width: 140px;">Name</td>
                        <td style="padding: 8px 0; color: #111827; font-weight: 600;">{contact.fullName}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-size: 12px; text-transform: uppercase; color: #6b7280;">Email</td>
                        <td style="padding: 8px 0; color: #111827;">{contact.email}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-size: 12px; text-transform: uppercase; color: #6b7280;">Phone</td>
                        <td style="padding: 8px 0; color: #111827;">{contact.phoneNumber or '-'} </td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-size: 12px; text-transform: uppercase; color: #6b7280;">Subject</td>
                        <td style="padding: 8px 0; color: #111827;">{contact.subject}</td>
                    </tr>
                </table>

                <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #e5e7eb;">
                    <div style="font-size: 12px; text-transform: uppercase; color: #6b7280; margin-bottom: 4px;">Message</div>
                    <p style="margin: 0; white-space: pre-line; color: #111827;">{contact.message}</p>
                </div>
            </div>
        </body>
        </html>
    """

    internal_text = (
        "New contact form message.\n"
        f"Name: {contact.fullName}\n"
        f"Email: {contact.email}\n"
        f"Phone: {contact.phoneNumber or '-'}\n"
        f"Subject: {contact.subject}\n\n"
        f"Message:\n{contact.message}\n"
    )

    internal_payload = {
        "sender": {"name": SENDER_NAME, "email": SENDER_EMAIL},
        "to": [{"email": NOTIFICATION_EMAIL, "name": NOTIFICATION_NAME}],
        "replyTo": {"email": contact.email, "name": contact.fullName},
        "subject": f"New contact message: {contact.subject}",
        "htmlContent": internal_html,
        "textContent": internal_text,
    }

    try:
        internal_response = requests.post(url, json=internal_payload, headers=headers, timeout=15)
        internal_response.raise_for_status()
    except requests.exceptions.HTTPError as exc:
        status_code = exc.response.status_code if exc.response is not None else 502
        detail_message = "Email service rejected the contact request."
        if exc.response is not None:
            try:
                body = exc.response.json()
                detail_message = body.get("message") or body.get("detail") or detail_message
            except ValueError:
                detail_message = exc.response.text or detail_message
        raise HTTPException(status_code=status_code, detail=detail_message)
    except requests.exceptions.RequestException as exc:
        raise HTTPException(status_code=502, detail="Unable to reach email service") from exc

    # 2) Thank-you email to the user (best-effort; failure does not block the request)
    thank_you_html = f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Thank You for Contacting Perlica Travel</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb; color: #111827;">
            <div style="max-width: 640px; margin: 0 auto; padding: 24px; background: #ffffff; border-radius: 12px; border: 1px solid #e5e7eb;">
                <h2 style="margin: 0 0 16px; font-size: 22px;">Thank You for Reaching Out</h2>
                <p style="margin: 0 0 12px; color: #4b5563;">Hi {contact.fullName},</p>
                <p style="margin: 0 0 12px; color: #4b5563;">
                    Thank you for contacting Perlica Travel. We have received your message about
                    <strong> {contact.subject} </strong> and our team will review it shortly.
                </p>
                <p style="margin: 0 0 12px; color: #4b5563;">
                    A member of our team will get back to you using the contact details you provided.
                </p>
                <p style="margin: 0; color: #4b5563;">Best regards,<br />Perlica Travel Team</p>
            </div>
        </body>
        </html>
    """

    thank_you_text = (
        "Thank you for contacting Perlica Travel. "
        "We have received your message and will get back to you shortly."
    )

    thank_you_payload = {
        "sender": {"name": SENDER_NAME, "email": SENDER_EMAIL},
        "to": [{"email": contact.email, "name": contact.fullName}],
        "replyTo": {"email": NOTIFICATION_EMAIL, "name": NOTIFICATION_NAME},
        "subject": "We have received your message",
        "htmlContent": thank_you_html,
        "textContent": thank_you_text,
    }

    try:
        thank_you_response = requests.post(url, json=thank_you_payload, headers=headers, timeout=15)
        thank_you_response.raise_for_status()
    except requests.exceptions.RequestException:
        # Log failure server-side in real deployment; for now we just ignore it
        print("Failed to send thank-you contact email to user")

    return {"message": "Contact message sent successfully"}
