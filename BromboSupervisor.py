import os
from dotenv import load_dotenv
from supervise import *
#from commands import *

load_dotenv()
DISCORD_TOKEN = os.getenv("discord_token")

if __name__ == "__main__" :
    client.run(DISCORD_TOKEN)
    #bot.run(DISCORD_TOKEN)