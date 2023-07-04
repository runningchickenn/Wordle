from fastapi import FastAPI
from pydantic import BaseModel
# 파일들을 서버에서 보낼 수 있게 라이브러리 사용
from fastapi.staticfiles import StaticFiles

app = FastAPI()

answer = 'TRAIN'

#정답을 알려주는 코드. /앤서라는 경로로 요청을 보내면 get_answer로 정답을 return해주는 코드. 그럼 여기서 정답이 정해져 있어야 하기 때문에 위에서 정답을 미리 선언과 정의를 해준다.
# 자바스크립트에서 수정을 해서 서버에서 받아온 답과 비교하는 코드를 작성해준다.
@app.get('/answer')
def get_answer():
  return {'answer' : answer} #객체 형태로 내보내기.


          #루트경로가 들어갔을 때 파일이 들어가게끔 만들어준다., 그리고 스태틱파일스의 위치는 디렉토리 스태틱이라는 폴더로 향하도로 설정이 되어 있음. 그리고 html값을 트루로 주면 경로가 더 깔끔해짐.
app.mount("/", StaticFiles(directory="static", html=True), name ="static")