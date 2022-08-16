import discord
from discord.ext import commands,tasks
from util import checkDiff, replyToBadMessage


testing = False

client = discord.Client()

@client.event
async def on_ready():
    print('ready to start')

@client.event
async def on_message(message):
    if testing and message.author.name != "SirSamoht":
        return

    if message.channel.name != "brombo-machine":
        return

    messages = [msg for msg in await message.channel.history(limit=2).flatten()]

    prevMsg = messages[1].content
    currMsg = messages[0].content

    if testing:
        print("last message:",prevMsg)
        print("current message:",currMsg)

    if checkDiff(prevMsg, currMsg) > 5:
        await replyToBadMessage(message)
    
