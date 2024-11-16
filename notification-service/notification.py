import pika

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

channel.queue_declare(queue='notifications')

def send_notification(message):
    channel.basic_publish(exchange='', routing_key='notifications', body=message)
    print(f" [x] Sent {message}")

send_notification('New Task Created')
