from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
from collections import Counter

ps = PorterStemmer()

def Get_Tokens(text):
    text = word_tokenize(text)
    text = [word for word in text if len(word) > 1]
    stop_word = set(stopwords.words('english'))
    text = sorted([word for word in text if word not in stop_word])
    text = [ps.stem(word).lower() for word in text]
    return text

def Get_Counter(text):
    text = Get_Tokens(text)
    data = Counter(text)
    return [data, len(data)]

def Get_Probability(data, size):
    res = {}
    for i in data:
        res.update({i: data[i] / size})
    return res

def File_Word_Token_Pro(db_data):
    question_collection = ''
    for row in db_data:
        question_collection += row[0] + ' '

    data, size = Get_Counter(question_collection)
    word_prob = Get_Probability(data, size)
    return word_prob