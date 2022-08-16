from random import choice

async def replyToBadMessage(message):
    user = message.author.id
    replies = [
        "Hey there <@" + str(user) + ">, pretty big difference buddy",
        "Woah there <@" + str(user) + ">, you just gave me whiplash!",
        "Slow down there <@" + str(user) + ">, take it easy kiddo",
        "Hey <@" + str(user) + ">, you sound awfully dumb right now",
        "<@" + str(user) + "> smells bad",
    ]

    channels = message.guild.text_channels
    maintChannel = list(filter(lambda x: x.name == "brombo-maintenance", channels))[0]
    reply = choice(replies)

    await maintChannel.send(reply)

    await message.add_reaction('<:think:697521710391492638>')

def checkDiff(msg1, msg2):
    m = len(msg1)
    n = len(msg2)

    def checkDiffRecurse(msg1, msg2, m, n):
        if m == 0:
            return n
        
        if n == 0:
            return m

        if msg1[m - 1] == msg2[n - 1]:
            return checkDiffRecurse(msg1, msg2, m - 1, n - 1)

        return 1 + \
            min(checkDiffRecurse(msg1, msg2, m  , n-1), 
                checkDiffRecurse(msg1, msg2, m-1, n  ),
                checkDiffRecurse(msg1, msg2, m-1, n-1))

    return checkDiffRecurse(msg1, msg2, m, n)