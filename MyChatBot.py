import Word_Frequency
#import sqlite3
'''
conn = sqlite3.connect('replies.db')
cursor = conn.cursor()
cursor.execute("SELECT * FROM tab1")
db_data = cursor.fetchall()
word_prob = Word_Frequency.File_Word_Token_Pro(db_data)
'''
def Process_Query(user,cursor):
    #user = input('User: ')

    cursor.execute("SELECT * FROM tab1")
    db_data = cursor.fetchall()
    word_prob = Word_Frequency.File_Word_Token_Pro(db_data)

    user_data, size = Word_Frequency.Get_Counter(user)
    user = Word_Frequency.Get_Tokens(user)
    user_prob = Word_Frequency.Get_Probability(user_data, size)
    max_value = 0
    index = ()
    for row in db_data:
        row_data = Word_Frequency.Get_Tokens(row[0])
        value = 0
        for i in user:
            for j in row_data:
                if i == j:
                    value += user_prob[i]*word_prob[j]
        if value > max_value:
            max_value = value
            index = row
    if not index:
        return 'Sorry! I did not understand you...'
    else:
        cursor.execute('SELECT Response FROM tab2 WHERE Tag=\"{0}\"'.format(index[1]))
        return cursor.fetchone()[0]

#print(Process_Query(input('USER: ')))