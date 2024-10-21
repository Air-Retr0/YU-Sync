import json
import logging
import os
from django.http import JsonResponse, HttpResponse
from django.db import transaction
from django.views.decorators.csrf import csrf_exempt
from dotenv import load_dotenv
from svix.webhooks import Webhook, WebhookVerificationError
from .models import ClerkUser

# Load environment variables
load_dotenv("C:\\Users\\Jahiem\\vscode\\yorku-book-finder\\YU-Sync\\keys.env")

# Get the webhook secret from the environment
SECRET = os.getenv('CLERK_WEBHOOK_SECRET')

@csrf_exempt
def clerk_webhook(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    # Verify the Clerk signature using Svix
    if not verify_clerk_signature(request):
        return JsonResponse({'error': 'Invalid Clerk signature'}, status=400)

    try:
        payload = json.loads(request.body)
        event_type = payload.get('type')

        if event_type == 'user.created':
            save_user_to_db(payload['data'])  
        elif event_type == 'user.updated':
            update_user_in_db(payload['data'])
        elif event_type == 'user.deleted':
            delete_user_from_db(payload['data'])
        else:
            logging.warning(f'Unhandled event type: {event_type}')

        return JsonResponse({'status': 'Processed successfully'}, status=200)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON payload'}, status=400)
    except Exception as e:
        logging.error(f'Error processing webhook: {str(e)}')
        return JsonResponse({'error': 'Internal server error'}, status=500)

def verify_clerk_signature(request):
    # Get the payload and headers
    payload = request.body
    headers = {key: value for key, value in request.headers.items()}

    # Initialize the Webhook with the secret
    wh = Webhook(SECRET)

    try:
        # Verify the signature
        wh.verify(payload, headers)
    except WebhookVerificationError as e:
        logging.warning(f'Webhook verification failed: {str(e)}')
        return False

    logging.info('Signature verified successfully.')
    return True

def save_user_to_db(user_data):
    with transaction.atomic():
      ClerkUser.objects.create(
          clerk_id=user_data['id'],
          first_name=user_data.get('first_name', ''),
          last_name=user_data.get('last_name', ''),
          display_name=user_data.get('email_addresses', [{}])[0].get('email_address', ''),
          # Add more fields as necessary
    )

def update_user_in_db(user_data):
    with transaction.atomic():
      ClerkUser.objects.update_or_create(
          clerk_id=user_data['id'],
          defaults={
              'first_name': user_data.get('first_name', ''),
              'last_name': user_data.get('last_name', ''),
              'display_name': user_data.get('email_addresses', [{}])[0].get('email_address', ''),
            # Update more fields as necessary
        }
    )

def delete_user_from_db(user_data):
    with transaction.atomic():
     ClerkUser.objects.filter(clerk_id=user_data['id']).delete()
