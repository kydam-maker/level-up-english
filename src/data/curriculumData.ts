import { Topic, QuizQuestion } from '../types';

export const TOPICS: Topic[] = [
  {
    id: 'daily-life',
    title: '일상생활',
    titleEnglish: 'Daily Life',
    description: '아침부터 밤까지 하루 동안 자주 겪는 일상 표현과 기초 단어',
    iconName: 'Sun',
    themeColor: 'amber',
    words: [
      {
        id: 'w-d1',
        topicId: 'daily-life',
        type: 'word',
        english: 'morning',
        korean: '아침',
        pronunciation: '모-닝',
        example: 'I wake up early in the morning.',
        exampleKorean: '나는 아침에 일찍 일어나요.',
        contextTip: '해(sun)가 뜨는 하루의 시작 시간을 말해요. 인사말 Good morning에서도 쓰여요!'
      },
      {
        id: 'w-d2',
        topicId: 'daily-life',
        type: 'word',
        english: 'breakfast',
        korean: '아침 식사',
        pronunciation: '브렉퍼스트',
        example: 'We eat delicious breakfast together.',
        exampleKorean: '우리는 함께 맛있는 아침밥을 먹어요.',
        contextTip: '밤새 비어 있던 배를 채우는 첫 끼니를 뜻해요. 보통 eat breakfast(아침을 먹다)로 같이 써요.'
      },
      {
        id: 'w-d3',
        topicId: 'daily-life',
        type: 'word',
        english: 'clock',
        korean: '시계 (탁상/벽시계)',
        pronunciation: '클락',
        example: 'Look at the clock on the wall.',
        exampleKorean: '벽에 걸린 시계를 보세요.',
        contextTip: '방이나 벽에 걸어두는 시계를 clock이라고 해요. 손목시계는 watch라고 부른답니다!'
      },
      {
        id: 'w-d4',
        topicId: 'daily-life',
        type: 'word',
        english: 'brush',
        korean: '솔질하다 / 닦다',
        pronunciation: '브러쉬',
        example: 'Brush your teeth before going to bed.',
        exampleKorean: '잠자리에 들기 전에 이를 닦으세요.',
        contextTip: '치약과 칫솔로 이를 닦거나 머리를 빗을 때 사용하는 말이에요. brush teeth(이를 닦다)로 기억해요.'
      },
      {
        id: 'w-d5',
        topicId: 'daily-life',
        type: 'word',
        english: 'shower',
        korean: '샤워 / 소나기',
        pronunciation: '샤워',
        example: 'I take a warm shower after exercise.',
        exampleKorean: '운동 후에 따뜻하게 샤워를 해요.',
        contextTip: '몸을 씻는 샤워도 뜻하고, 갑자기 쏟아지는 소나기라는 재미있는 뜻도 가지고 있어요.'
      },
      {
        id: 'w-d6',
        topicId: 'daily-life',
        type: 'word',
        english: 'walk',
        korean: '걷다 / 산책하다',
        pronunciation: '워크',
        example: 'I walk to the park with my puppy.',
        exampleKorean: '강아지와 함께 공원으로 걸어가요.',
        contextTip: '가볍게 두 발로 걸어가는 동작이에요. l은 발음하지 않고 [워크]라고 부드럽게 소리내요.'
      },
      {
        id: 'w-d7',
        topicId: 'daily-life',
        type: 'word',
        english: 'homework',
        korean: '숙제',
        pronunciation: '홈워크',
        example: 'I finish my homework before dinner.',
        exampleKorean: '저녁 먹기 전에 숙제를 끝내요.',
        contextTip: '집(home)에서 하는 공부(work)가 합쳐진 쉬운 단어예요. do homework(숙제하다) 형태로 쓰여요.'
      },
      {
        id: 'w-d8',
        topicId: 'daily-life',
        type: 'word',
        english: 'sleep',
        korean: '잠자다 / 잠',
        pronunciation: '슬립',
        example: 'It is time to go to sleep now.',
        exampleKorean: '이제 잠자러 갈 시간이에요.',
        contextTip: '피로를 풀기 위해 눈을 감고 잠에 빠져드는 행동이에요. go to sleep은 자러 가다라는 뜻이에요.'
      },
      {
        id: 'w-d9',
        topicId: 'daily-life',
        type: 'word',
        english: 'evening',
        korean: '저녁',
        pronunciation: '이브닝',
        example: 'We watch television in the evening.',
        exampleKorean: '우리는 저녁 시간에 텔레비전을 봐요.',
        contextTip: '해가 지고 밤이 오기 전까지의 시간이에요. Good evening!(좋은 저녁이에요)로 인사해요.'
      },
      {
        id: 'w-d10',
        topicId: 'daily-life',
        type: 'word',
        english: 'water',
        korean: '물',
        pronunciation: '워터 (워러)',
        example: 'Drink a glass of fresh water.',
        exampleKorean: '신선한 물 한 잔을 마셔요.',
        contextTip: '우리가 매일 마시는 맑고 깨끗한 물이에요. 미국식 발음에서는 [워러]처럼 부드럽게 소리나요.'
      }
    ],
    sentences: [
      {
        id: 's-d1',
        topicId: 'daily-life',
        type: 'sentence',
        english: 'Good morning! Did you sleep well?',
        korean: '좋은 아침이에요! 잘 잤나요?',
        contextTip: '아침에 눈을 떠서 가족이나 학교 친구를 만났을 때 기분 좋게 안부를 물으며 건네는 인사예요.'
      },
      {
        id: 's-d2',
        topicId: 'daily-life',
        type: 'sentence',
        english: 'What time is it now?',
        korean: '지금 몇 시예요?',
        contextTip: '시계가 없거나 몇 시인지 궁금할 때 언제든지 정중하게 시간을 물어볼 수 있는 기본 문장이에요.'
      },
      {
        id: 's-d3',
        topicId: 'daily-life',
        type: 'sentence',
        english: 'I am getting ready for school.',
        korean: '학교 갈 준비를 하고 있어요.',
        contextTip: '등교 전 가방을 챙기거나 옷을 입고 있을 때, 뭐 하고 있냐는 부모님의 질문에 답변하기 좋아요.'
      },
      {
        id: 's-d4',
        topicId: 'daily-life',
        type: 'sentence',
        english: 'I will do my homework first.',
        korean: '숙제 먼저 끝낼게요.',
        contextTip: '친구와 게임을 하거나 놀기 전에, 먼저 숙제를 하겠다고 스스로 약속할 때 멋지게 써보세요.'
      },
      {
        id: 's-d5',
        topicId: 'daily-life',
        type: 'sentence',
        english: 'Good night, have sweet dreams!',
        korean: '잘 자요, 좋은 꿈 꿔요!',
        contextTip: '하루 일과를 마치고 잠자리에 들 때 부모님이나 친구에게 다정하게 따뜻한 밤 인사를 건네보세요.'
      }
    ],
    expressions: [
      {
        id: 'e-d1',
        topicId: 'daily-life',
        type: 'expression',
        english: 'Wake up!',
        korean: '일어나!',
        contextTip: '아침에 알람이 울려도 아직 침대에서 늦잠 자고 있는 형제나 친구를 활기차게 깨울 때 써요.'
      },
      {
        id: 'e-d2',
        topicId: 'daily-life',
        type: 'expression',
        english: 'Take a break.',
        korean: '잠깐 쉬어.',
        contextTip: '공부나 운동을 열심히 하다가 지쳤을 때, 서로에게 "잠깐 숨 돌리자"고 다독일 때 사용해요.'
      },
      {
        id: 'e-d3',
        topicId: 'daily-life',
        type: 'expression',
        english: 'Hurry up!',
        korean: '서둘러! / 빨리빨리!',
        contextTip: '시간이 촉박하거나 늦을 것 같을 때 웃으며 친구에게 발걸음을 재촉할 때 쓰는 신나는 표현이에요.'
      },
      {
        id: 'e-d4',
        topicId: 'daily-life',
        type: 'expression',
        english: 'Just a minute.',
        korean: '잠깐만 기다려 줘.',
        contextTip: '하던 일을 마무리하느라 1분만 시간이 더 필요할 때, 상대방에게 예의 있게 양해를 구하는 말이에요.'
      },
      {
        id: 'e-d5',
        topicId: 'daily-life',
        type: 'expression',
        english: "I'm so tired.",
        korean: '나 너무 피곤해.',
        contextTip: '하루 동안 열심히 공부하고 뛰어놀아서 침대에 눕고 싶을 때 내 상태를 솔직하게 털어놓는 표현이에요.'
      }
    ]
  },
  {
    id: 'school-life',
    title: '학교 생활',
    titleEnglish: 'School Life',
    description: '교실 수업, 친구와의 대화, 쉬는 시간과 준비물에 꼭 필요한 표현',
    iconName: 'BookOpen',
    themeColor: 'sky',
    words: [
      {
        id: 'w-s1',
        topicId: 'school-life',
        type: 'word',
        english: 'teacher',
        korean: '선생님',
        pronunciation: '티-쳐',
        example: 'Our English teacher is very kind.',
        exampleKorean: '우리 영어 선생님은 매우 친절하세요.',
        contextTip: '가르치다(teach)에 사람(-er)이 붙어서 만들어진 단어예요. 존경하는 선생님을 뜻해요.'
      },
      {
        id: 'w-s2',
        topicId: 'school-life',
        type: 'word',
        english: 'friend',
        korean: '친구',
        pronunciation: '프렌드',
        example: 'Minsu is my best friend at school.',
        exampleKorean: '민수는 학교에서 나의 가장 친한 친구예요.',
        contextTip: '기쁨과 슬픔을 함께 나누는 소중한 친구예요. best friend는 가장 친한 절친을 말해요.'
      },
      {
        id: 'w-s3',
        topicId: 'school-life',
        type: 'word',
        english: 'desk',
        korean: '책상',
        pronunciation: '데스크',
        example: 'Keep your desk clean and tidy.',
        exampleKorean: '책상을 깨끗하고 단정하게 유지하세요.',
        contextTip: '교실에서 공부할 때 앉는 책상이에요. 식사를 하는 식탁(table)과는 구분해서 사용해요.'
      },
      {
        id: 'w-s4',
        topicId: 'school-life',
        type: 'word',
        english: 'pencil',
        korean: '연필',
        pronunciation: '펜슬',
        example: 'Can I borrow your pencil for class?',
        exampleKorean: '수업 시간에 연필 좀 빌려줄 수 있니?',
        contextTip: '글씨를 쓰고 지우개로 지울 수 있는 흑연 필기도구예요. pencil case는 필통이랍니다!'
      },
      {
        id: 'w-s5',
        topicId: 'school-life',
        type: 'word',
        english: 'library',
        korean: '도서관',
        pronunciation: '라이브러리',
        example: 'We read many interesting books in the library.',
        exampleKorean: '우리는 도서관에서 재미있는 책들을 많이 읽어요.',
        contextTip: '수많은 책이 모여 있는 조용하고 아늑한 지식의 보물창고예요.'
      },
      {
        id: 'w-s6',
        topicId: 'school-life',
        type: 'word',
        english: 'classroom',
        korean: '교실',
        pronunciation: '클래스룸',
        example: 'Students are talking in the classroom.',
        exampleKorean: '학생들이 교실에서 이야기를 나누고 있어요.',
        contextTip: '수업(class)을 받는 방(room)이라는 뜻이 합쳐진 단어예요. 우리가 매일 공부하는 공간이에요.'
      },
      {
        id: 'w-s7',
        topicId: 'school-life',
        type: 'word',
        english: 'notebook',
        korean: '공책 / 필기장',
        pronunciation: '노트북',
        example: 'Write important words in your notebook.',
        exampleKorean: '공책에 중요한 단어들을 적으세요.',
        contextTip: '영어에서는 공책을 notebook이라고 해요. 전자기기 노트북은 laptop이라고 부르는 경우가 많아요.'
      },
      {
        id: 'w-s8',
        topicId: 'school-life',
        type: 'word',
        english: 'lunch',
        korean: '점심 식사 / 급식',
        pronunciation: '런치',
        example: "Today's school lunch is very delicious.",
        exampleKorean: '오늘 학교 점심 급식은 정말 맛있어요.',
        contextTip: '낮 12시 즈음 먹는 든든한 식사예요. school lunch는 우리가 매일 먹는 학교 급식을 뜻해요.'
      },
      {
        id: 'w-s9',
        topicId: 'school-life',
        type: 'word',
        english: 'lesson',
        korean: '수업 / 과',
        pronunciation: '레슨',
        example: 'Listen carefully during the science lesson.',
        exampleKorean: '과학 수업 시간 동안에는 귀 기울여 들으세요.',
        contextTip: '선생님께 새로운 지식을 배우는 수업 시간 또는 교과서의 한 단원을 가리켜요.'
      },
      {
        id: 'w-s10',
        topicId: 'school-life',
        type: 'word',
        english: 'question',
        korean: '질문',
        pronunciation: '퀘스천',
        example: 'Raise your hand if you have a question.',
        exampleKorean: '질문이 있다면 손을 드세요.',
        contextTip: '궁금한 점을 묻는 질문이에요. 반대로 대답은 answer라고 한답니다.'
      }
    ],
    sentences: [
      {
        id: 's-s1',
        topicId: 'school-life',
        type: 'sentence',
        english: 'May I ask a question?',
        korean: '질문 하나 해도 될까요?',
        contextTip: '선생님 설명 중 모르는 단어나 내용이 생겼을 때, 손을 들고 공손하게 여쭤보는 최고 문장이에요.'
      },
      {
        id: 's-s2',
        topicId: 'school-life',
        type: 'sentence',
        english: 'Can I borrow an eraser, please?',
        korean: '지우개 좀 빌릴 수 있을까?',
        contextTip: '필통에 지우개를 깜빡 두고 왔을 때 짝꿍이나 옆자리 친구에게 친절하게 부탁할 때 써요.'
      },
      {
        id: 's-s3',
        topicId: 'school-life',
        type: 'sentence',
        english: "Let's play together during recess!",
        korean: '쉬는 시간에 같이 놀자!',
        contextTip: '수업 종이 끝나고 10분 쉬는 시간(recess)에 복도나 운동장에서 같이 놀 친구를 부를 때 써요.'
      },
      {
        id: 's-s4',
        topicId: 'school-life',
        type: 'sentence',
        english: 'Open your textbook to page ten.',
        korean: '교과서 10쪽을 펴세요.',
        contextTip: '선생님이 수업을 시작하면서 교재 몇 페이지를 보라고 말씀하실 때 매일 듣는 교실 영어예요.'
      },
      {
        id: 's-s5',
        topicId: 'school-life',
        type: 'sentence',
        english: 'See you tomorrow after school!',
        korean: '내일 방과 후에 또 봐!',
        contextTip: '모든 수업이 끝나고 가방을 메고 집으로 돌아갈 때 친구들과 밝게 나누는 작별 인사예요.'
      }
    ],
    expressions: [
      {
        id: 'e-s1',
        topicId: 'school-life',
        type: 'expression',
        english: 'Raise your hand.',
        korean: '손을 드세요.',
        contextTip: '수업 시간에 발표하고 싶거나 정답을 알고 있을 때 손을 번쩍 들며 행동하는 표현이에요.'
      },
      {
        id: 'e-s2',
        topicId: 'school-life',
        type: 'expression',
        english: 'Be quiet, please.',
        korean: '조용히 해 주세요.',
        contextTip: '도서관이나 수업 시작 직전, 교실이 시끄러울 때 반장이나 선생님이 정숙을 요청하는 말이에요.'
      },
      {
        id: 'e-s3',
        topicId: 'school-life',
        type: 'expression',
        english: "It's your turn.",
        korean: '네 차례야.',
        contextTip: '영어 릴레이 읽기, 보드게임, 체육 시간 순서가 상대방 차례임을 친절히 알려줄 때 써요.'
      },
      {
        id: 'e-s4',
        topicId: 'school-life',
        type: 'expression',
        english: 'Good job!',
        korean: '참 잘했어! / 멋지다!',
        contextTip: '친구가 어려운 퀴즈를 맞히거나 발표를 멋지게 마쳤을 때 엄지척을 하며 칭찬해 주세요.'
      },
      {
        id: 'e-s5',
        topicId: 'school-life',
        type: 'expression',
        english: "I don't understand.",
        korean: '이해가 잘 안 돼요.',
        contextTip: '수업 내용이 헷갈릴 때 부끄러워하지 말고 선생님께 솔직하게 다시 설명해달라고 요청할 때 써요.'
      }
    ]
  },
  {
    id: 'family-friends',
    title: '가족과 친구',
    titleEnglish: 'Family & Friends',
    description: '소중한 가족과 따뜻한 친구들에게 마음과 감정을 전하는 영어',
    iconName: 'Heart',
    themeColor: 'rose',
    words: [
      {
        id: 'w-f1',
        topicId: 'family-friends',
        type: 'word',
        english: 'parents',
        korean: '부모님',
        pronunciation: '페어런츠',
        example: 'I love my parents very much.',
        exampleKorean: '나는 우리 부모님을 아주 많이 사랑해요.',
        contextTip: '어머니와 아버지를 함께 부르는 말이에요. 항상 뒤에 s를 붙여 복수로 자주 씁니다.'
      },
      {
        id: 'w-f2',
        topicId: 'family-friends',
        type: 'word',
        english: 'brother',
        korean: '형 / 남동생 / 오빠',
        pronunciation: '브라더',
        example: 'My brother plays soccer very well.',
        exampleKorean: '내 남동생(형)은 축구를 아주 잘해요.',
        contextTip: '나보다 나이가 많은 남자 형제는 older brother, 동생은 younger brother라고 구체적으로 말해요.'
      },
      {
        id: 'w-f3',
        topicId: 'family-friends',
        type: 'word',
        english: 'sister',
        korean: '누나 / 여동생 / 언니',
        pronunciation: '시스터',
        example: 'My sister likes drawing cute animals.',
        exampleKorean: '내 여동생(언니)은 귀여운 동물 그리기를 좋아해요.',
        contextTip: '여자 형제를 뜻해요. 나보다 많은 언니/누나는 older sister, 여동생은 younger sister예요.'
      },
      {
        id: 'w-f4',
        topicId: 'family-friends',
        type: 'word',
        english: 'puppy',
        korean: '강아지',
        pronunciation: '퍼피',
        example: 'Our little puppy wags its tail.',
        exampleKorean: '우리 집 귀여운 강아지가 꼬리를 흔들어요.',
        contextTip: '어린 아기 강아지를 귀엽게 부르는 말이에요. 다 자란 큰 개는 dog라고 불러요.'
      },
      {
        id: 'w-f5',
        topicId: 'family-friends',
        type: 'word',
        english: 'smile',
        korean: '미소 짓다 / 미소',
        pronunciation: '스마일',
        example: 'Your bright smile makes everyone happy.',
        exampleKorean: '너의 환한 미소는 모두를 행복하게 만들어.',
        contextTip: '입꼬리를 올리며 예쁘게 웃는 모습이에요. 사진 찍을 때 "Say cheese!" 하며 smile해요!'
      },
      {
        id: 'w-f6',
        topicId: 'family-friends',
        type: 'word',
        english: 'together',
        korean: '함께 / 같이',
        pronunciation: '투게더',
        example: 'We sing and dance together happily.',
        exampleKorean: '우리는 즐겁게 함께 노래하고 춤춰요.',
        contextTip: '혼자가 아니라 여러 사람이 어울려 같이 행동할 때 쓰는 마음 따뜻해지는 단어예요.'
      },
      {
        id: 'w-f7',
        topicId: 'family-friends',
        type: 'word',
        english: 'help',
        korean: '돕다 / 도움',
        pronunciation: '헬프',
        example: 'I help my mother in the kitchen.',
        exampleKorean: '나는 부엌에서 어머니를 도와드려요.',
        contextTip: '어려움에 처한 사람에게 손을 내밀어 주는 행동이에요. "Help!" 하고 외치면 도움 요청이에요.'
      },
      {
        id: 'w-f8',
        topicId: 'family-friends',
        type: 'word',
        english: 'share',
        korean: '나누다 / 함께 쓰다',
        pronunciation: '쉐어',
        example: "Let's share this sweet cookie.",
        exampleKorean: '이 달콤한 과자를 사이좋게 나눠 먹자.',
        contextTip: '내가 가진 음식이나 물건을 다른 사람과 반반씩 사이좋게 나눌 때 쓰는 멋진 단어예요.'
      },
      {
        id: 'w-f9',
        topicId: 'family-friends',
        type: 'word',
        english: 'birthday',
        korean: '생일',
        pronunciation: '버스데이',
        example: 'Today is my best friend’s birthday.',
        exampleKorean: '오늘은 내 단짝 친구의 생일이에요.',
        contextTip: '태어난(birth) 날(day)이라는 뜻이에요. 생일 축하 노래 "Happy Birthday to you"로 익숙하죠!'
      },
      {
        id: 'w-f10',
        topicId: 'family-friends',
        type: 'word',
        english: 'gift',
        korean: '선물',
        pronunciation: '기프트',
        example: 'I prepared a special gift for you.',
        exampleKorean: '너를 위해 특별한 선물을 준비했어.',
        contextTip: '마음을 담아 다른 사람에게 주는 선물이에요. present라는 단어와 같은 뜻이랍니다.'
      }
    ],
    sentences: [
      {
        id: 's-f1',
        topicId: 'family-friends',
        type: 'sentence',
        english: 'This is my wonderful family.',
        korean: '여기는 우리 멋진 가족이에요.',
        contextTip: '가족사진을 보여주거나 집에 놀러 온 친구에게 부모님과 형제를 소개할 때 자랑스럽게 말해요.'
      },
      {
        id: 's-f2',
        topicId: 'family-friends',
        type: 'sentence',
        english: 'Thank you for helping me with my work.',
        korean: '내 공부를 도와줘서 정말 고마워.',
        contextTip: '어려운 문제를 친구나 가족이 친절하게 알려주었을 때 진심 어린 감사를 전하는 문장이에요.'
      },
      {
        id: 's-f3',
        topicId: 'family-friends',
        type: 'sentence',
        english: 'Do you want to be my friend?',
        korean: '나랑 친구 할래?',
        contextTip: '새 학기 첫날이나 새로운 취미 활동에서 마음에 드는 친구에게 먼저 용기 내어 다가갈 때 써요.'
      },
      {
        id: 's-f4',
        topicId: 'family-friends',
        type: 'sentence',
        english: 'My father cooks delicious dishes on weekends.',
        korean: '아빠는 주말마다 맛있는 요리를 만들어 주셔.',
        contextTip: '친구들과 주말 일상이나 가족 자랑을 도란도란 나눌 때 자연스럽게 쓸 수 있어요.'
      },
      {
        id: 's-f5',
        topicId: 'family-friends',
        type: 'sentence',
        english: 'I am so proud of you.',
        korean: '난 네가 정말 자랑스러워.',
        contextTip: '친구, 동생, 또는 가족이 포기하지 않고 노력해서 해냈을 때 칭찬과 격려를 듬뿍 담아 말해요.'
      }
    ],
    expressions: [
      {
        id: 'e-f1',
        topicId: 'family-friends',
        type: 'expression',
        english: 'Nice to meet you.',
        korean: '만나서 반가워.',
        contextTip: '새로운 친구를 처음 만났을 때 손을 흔들며 밝은 표정으로 건네는 가장 기본적인 첫인사예요.'
      },
      {
        id: 'e-f2',
        topicId: 'family-friends',
        type: 'expression',
        english: "You're welcome!",
        korean: '천만에요! / 별말씀을요!',
        contextTip: '친구가 "Thank you!" 하고 고마워할 때, "아니야, 당연한 걸!"이라는 뉘앙스로 답하는 표현이에요.'
      },
      {
        id: 'e-f3',
        topicId: 'family-friends',
        type: 'expression',
        english: 'Cheer up!',
        korean: '힘내! / 기운 내!',
        contextTip: '시험을 못 보았거나 기분이 우울한 친구의 어깨를 툭툭 치며 응원할 때 따뜻하게 말해주세요.'
      },
      {
        id: 'e-f4',
        topicId: 'family-friends',
        type: 'expression',
        english: "I'm sorry.",
        korean: '미안해 / 죄송해요.',
        contextTip: '실수로 친구 발을 밟았거나 약속에 늦었을 때, 망설이지 않고 솔직하게 사과하는 중요한 말이에요.'
      },
      {
        id: 'e-f5',
        topicId: 'family-friends',
        type: 'expression',
        english: 'No problem!',
        korean: '문제없어! / 괜찮아!',
        contextTip: '친구가 사과하거나 부탁을 건넸을 때, 흔쾌히 "전혀 문제없어!"라며 마음을 편하게 해줄 때 써요.'
      }
    ]
  },
  {
    id: 'food-dining',
    title: '음식과 식사',
    titleEnglish: 'Food & Dining',
    description: '맛있는 음식, 식사 예절과 좋아하는 맛을 표현하는 기초 영어',
    iconName: 'Utensils',
    themeColor: 'emerald',
    words: [
      {
        id: 'w-fo1',
        topicId: 'food-dining',
        type: 'word',
        english: 'apple',
        korean: '사과',
        pronunciation: '애플',
        example: 'An apple is sweet and crunchy.',
        exampleKorean: '사과는 달콤하고 아삭아삭해요.',
        contextTip: '빨갛고 새콤달콤한 대표 과일이에요. an apple처럼 모음 앞에는 an을 붙여요.'
      },
      {
        id: 'w-fo2',
        topicId: 'food-dining',
        type: 'word',
        english: 'bread',
        korean: '빵',
        pronunciation: '브레드',
        example: 'I like warm bread with butter.',
        exampleKorean: '나는 버터를 바른 따뜻한 빵을 좋아해요.',
        contextTip: '밀가루를 구워 만든 고소한 빵이에요. 식빵, 바게트 등 모든 빵을 부를 수 있어요.'
      },
      {
        id: 'w-fo3',
        topicId: 'food-dining',
        type: 'word',
        english: 'milk',
        korean: '우유',
        pronunciation: '밀크',
        example: 'Drink fresh milk for strong bones.',
        exampleKorean: '튼튼한 뼈를 위해 신선한 우유를 마셔요.',
        contextTip: '키가 쑥쑥 자라는 데 도움을 주는 하얀 우유예요. 초코우유는 chocolate milk라고 해요.'
      },
      {
        id: 'w-fo4',
        topicId: 'food-dining',
        type: 'word',
        english: 'pizza',
        korean: '피자',
        pronunciation: '피짜',
        example: 'Cheese pizza is my favorite food.',
        exampleKorean: '치즈 피자는 내가 가장 좋아하는 음식이에요.',
        contextTip: '도우 위에 치즈와 토핑을 듬뿍 얹어 구운 인기 음식이에요. z가 두 개 들어가요!'
      },
      {
        id: 'w-fo5',
        topicId: 'food-dining',
        type: 'word',
        english: 'fruit',
        korean: '과일',
        pronunciation: '프루트',
        example: 'Eat fresh fruit every day.',
        exampleKorean: '매일 신선한 과일을 먹어요.',
        contextTip: '사과, 바나나, 포도처럼 나무나 풀에서 열리는 달콤한 열매들을 모두 아우르는 단어예요.'
      },
      {
        id: 'w-fo6',
        topicId: 'food-dining',
        type: 'word',
        english: 'juice',
        korean: '주스',
        pronunciation: '쥬스',
        example: 'Orange juice is sour and sweet.',
        exampleKorean: '오렌지 주스는 새콤달콤해요.',
        contextTip: '과일을 꾹 짜서 만든 시원한 음료수예요. orange juice, apple juice로 불러요.'
      },
      {
        id: 'w-fo7',
        topicId: 'food-dining',
        type: 'word',
        english: 'delicious',
        korean: '맛있는',
        pronunciation: '딜리셔스',
        example: 'This soup is really delicious.',
        exampleKorean: '이 수프는 정말 맛있어요.',
        contextTip: '음식이 꿀맛일 때 감탄하며 쓰는 단어예요. yummy와 비슷한 뜻을 가지고 있어요.'
      },
      {
        id: 'w-fo8',
        topicId: 'food-dining',
        type: 'word',
        english: 'hungry',
        korean: '배고픈',
        pronunciation: '헝그리',
        example: 'I am so hungry after playing sports.',
        exampleKorean: '운동을 하고 나니 너무 배가 고파요.',
        contextTip: '배에서 꼬르륵 소리가 날 때 느끼는 감정이에요. I am hungry!(나 배고파!)로 자주 써요.'
      },
      {
        id: 'w-fo9',
        topicId: 'food-dining',
        type: 'word',
        english: 'spoon',
        korean: '숟가락',
        pronunciation: '스푼',
        example: 'Eat your soup with a silver spoon.',
        exampleKorean: '은색 숟가락으로 수프를 드세요.',
        contextTip: '국물이나 밥을 떠먹는 도구예요. 포크(fork), 칼(knife)과 함께 식탁 삼총사예요.'
      },
      {
        id: 'w-fo10',
        topicId: 'food-dining',
        type: 'word',
        english: 'sweet',
        korean: '달콤한',
        pronunciation: '스위트',
        example: 'Chocolate candy is very sweet.',
        exampleKorean: '초콜릿 사탕은 매우 달콤해요.',
        contextTip: '설탕이나 꿀처럼 달달하고 기분 좋은 맛을 묘사할 때 써요. 사람의 다정한 성격에도 써요!'
      }
    ],
    sentences: [
      {
        id: 's-fo1',
        topicId: 'food-dining',
        type: 'sentence',
        english: "I am hungry, let's eat something!",
        korean: '배고파요, 우리 뭐 좀 먹어요!',
        contextTip: '방과 후 배가 출출할 때 친구나 부모님께 맛있는 간식을 먹자고 제안할 때 딱 맞는 문장이에요.'
      },
      {
        id: 's-fo2',
        topicId: 'food-dining',
        type: 'sentence',
        english: 'What do you want to eat for lunch?',
        korean: '점심으로 무엇을 먹고 싶니?',
        contextTip: '식사 메뉴를 정할 때 상대방이 어떤 음식을 좋아하는지 취향을 친절히 물어보는 표현이에요.'
      },
      {
        id: 's-fo3',
        topicId: 'food-dining',
        type: 'sentence',
        english: 'Please pass me the water bottle.',
        korean: '물병 좀 건네주시겠어요?',
        contextTip: '식탁에서 손이 닿지 않는 물병이나 소금, 반찬을 다른 사람에게 예의 바르게 부탁할 때 써요.'
      },
      {
        id: 's-fo4',
        topicId: 'food-dining',
        type: 'sentence',
        english: 'This tastes really great!',
        korean: '이거 맛이 정말 최고예요!',
        contextTip: '음식이 입에 착 달라붙고 아주 맛있을 때, 요리해 주신 분께 활짝 웃으며 칭찬할 때 써요.'
      },
      {
        id: 's-fo5',
        topicId: 'food-dining',
        type: 'sentence',
        english: 'I am full now, thank you for the meal.',
        korean: '이제 배불러요, 맛있게 잘 먹었습니다.',
        contextTip: '식사를 배부르게 마치고 상을 치우기 전, 식사를 준비해 주신 분께 감사 인사를 드릴 때 써요.'
      }
    ],
    expressions: [
      {
        id: 'e-fo1',
        topicId: 'food-dining',
        type: 'expression',
        english: 'Help yourself!',
        korean: '마음껏 드세요! / 맛있게 먹어!',
        contextTip: '집에 놀러 온 친구에게 과자나 음식을 건네며 부담 갖지 말고 편하게 먹으라고 권할 때 써요.'
      },
      {
        id: 'e-fo2',
        topicId: 'food-dining',
        type: 'expression',
        english: 'Enjoy your meal!',
        korean: '맛있게 드세요!',
        contextTip: '본격적으로 숟가락을 들기 전, 함께 식사하는 사람들에게 즐거운 식사가 되길 바라며 건네는 말이에요.'
      },
      {
        id: 'e-fo3',
        topicId: 'food-dining',
        type: 'expression',
        english: 'It smells good!',
        korean: '맛있는 냄새가 나요!',
        contextTip: '부엌이나 식당 근처를 지나갈 때 맛있는 냄새가 코를 자극할 때 감탄하며 쓸 수 있어요.'
      },
      {
        id: 'e-fo4',
        topicId: 'food-dining',
        type: 'expression',
        english: 'One more, please.',
        korean: '하나만 더 주세요.',
        contextTip: '반찬이나 음식이 너무 맛있어서 조금 더 먹고 싶을 때 공손하게 추가 요청할 때 써요.'
      },
      {
        id: 'e-fo5',
        topicId: 'food-dining',
        type: 'expression',
        english: "I'm thirsty.",
        korean: '목이 말라요.',
        contextTip: '운동장이나 체육 수업 후 시원한 물이나 주스를 마시고 싶을 때 내 갈증을 표현하는 말이에요.'
      }
    ]
  }
];

export const ALL_QUIZ_QUESTIONS: QuizQuestion[] = [
  // --- Daily Life Quizzes ---
  {
    id: 'q-d1',
    topicId: 'daily-life',
    itemId: 'w-d1',
    type: 'meaning',
    prompt: "'morning'의 올바른 한국어 뜻은 무엇일까요?",
    options: ['아침', '점심', '저녁', '밤'],
    correctIndex: 0,
    explanation: "'morning'은 해가 뜨는 '아침'을 의미해요. Good morning!처럼 아침 인사로도 써요."
  },
  {
    id: 'q-d2',
    topicId: 'daily-life',
    itemId: 'w-d2',
    type: 'blank',
    prompt: "빈칸에 들어갈 알맞은 단어는? We eat delicious [ ______ ] every morning.",
    options: ['breakfast', 'homework', 'clock', 'shower'],
    correctIndex: 0,
    explanation: "아침마다 맛있게 먹는 식사이므로 'breakfast(아침 식사)'가 정답이에요."
  },
  {
    id: 'q-d3',
    topicId: 'daily-life',
    itemId: 'w-d4',
    type: 'listening',
    prompt: "발음을 잘 듣고 들려준 단어를 골라보세요.",
    audioPrompt: 'brush',
    options: ['walk', 'brush', 'shower', 'sleep'],
    correctIndex: 1,
    explanation: "들려준 발음은 [브러쉬], 이를 닦거나 솔질할 때 쓰는 'brush'예요!"
  },
  {
    id: 'q-d4',
    topicId: 'daily-life',
    itemId: 's-d2',
    type: 'meaning',
    prompt: "'What time is it now?'는 언제 사용하는 문장일까요?",
    options: [
      '지금 몇 시인지 물어볼 때',
      '어디로 가는지 길을 물어볼 때',
      '밥을 먹자고 제안할 때',
      '숙제를 다 했는지 확인할 때'
    ],
    correctIndex: 0,
    explanation: "'time'은 시간이라는 뜻이에요. '지금 몇 시예요?' 하고 시간을 물어보는 대표 표현이에요."
  },
  {
    id: 'q-d5',
    topicId: 'daily-life',
    itemId: 'e-d3',
    type: 'blank',
    prompt: "지각할 것 같아 친구에게 '서둘러!'라고 재촉할 때 알맞은 표현은? [ ______ ] up!",
    options: ['Wake', 'Hurry', 'Clean', 'Look'],
    correctIndex: 1,
    explanation: "'Hurry up!'은 서둘러! 빨리빨리!라는 뜻으로 시간이 부족할 때 자주 쓰는 표현이에요."
  },

  // --- School Life Quizzes ---
  {
    id: 'q-s1',
    topicId: 'school-life',
    itemId: 'w-s1',
    type: 'meaning',
    prompt: "'teacher'의 올바른 한국어 뜻은 무엇일까요?",
    options: ['학생', '선생님', '교실', '공책'],
    correctIndex: 1,
    explanation: "'teach(가르치다)'에 '-er'이 붙은 단어로 학생들을 가르쳐 주시는 '선생님'이에요."
  },
  {
    id: 'q-s2',
    topicId: 'school-life',
    itemId: 'w-s4',
    type: 'blank',
    prompt: "글씨를 쓸 때 쓰는 필기도구예요. Can I borrow your [ ______ ]?",
    options: ['pencil', 'desk', 'lunch', 'recess'],
    correctIndex: 0,
    explanation: "빌려서 글씨를 쓰는 필기도구이므로 'pencil(연필)'이 알맞아요."
  },
  {
    id: 'q-s3',
    topicId: 'school-life',
    itemId: 'w-s5',
    type: 'listening',
    prompt: "발음을 잘 듣고 어떤 장소인지 골라보세요.",
    audioPrompt: 'library',
    options: ['classroom', 'library', 'playground', 'cafeteria'],
    correctIndex: 1,
    explanation: "들려준 소리는 [라이브러리], 책을 읽고 공부할 수 있는 '도서관(library)'이에요!"
  },
  {
    id: 'q-s4',
    topicId: 'school-life',
    itemId: 's-s1',
    type: 'meaning',
    prompt: "'May I ask a question?'의 알맞은 뜻은 무엇일까요?",
    options: [
      '질문 하나 해도 될까요?',
      '화장실에 가도 될까요?',
      '창문을 열어도 될까요?',
      '책을 빌릴 수 있을까요?'
    ],
    correctIndex: 0,
    explanation: "'question'은 질문이에요. 수업 중 손을 들고 공손하게 질문해도 되는지 여쭙는 말이에요."
  },
  {
    id: 'q-s5',
    topicId: 'school-life',
    itemId: 'e-s4',
    type: 'blank',
    prompt: "친구가 문제를 멋지게 맞혔을 때 칭찬하는 말: 'Good [ ______ ]!'",
    options: ['job', 'day', 'time', 'luck'],
    correctIndex: 0,
    explanation: "'Good job!'은 참 잘했어! 대단해! 하고 엄지척하며 칭찬할 때 쓰는 대표 표현이에요."
  },

  // --- Family & Friends Quizzes ---
  {
    id: 'q-f1',
    topicId: 'family-friends',
    itemId: 'w-f1',
    type: 'meaning',
    prompt: "'parents'의 올바른 뜻은 무엇일까요?",
    options: ['친구들', '부모님 (어머니와 아버지)', '선생님들', '이웃들'],
    correctIndex: 1,
    explanation: "'parents'는 나를 따뜻하게 보살펴 주시는 '부모님'을 뜻해요."
  },
  {
    id: 'q-f2',
    topicId: 'family-friends',
    itemId: 'w-f8',
    type: 'blank',
    prompt: "과자나 물건을 함께 나누어 쓸 때: Let's [ ______ ] this snack together.",
    options: ['share', 'sleep', 'break', 'lose'],
    correctIndex: 0,
    explanation: "'share'는 사이좋게 나누다, 함께 쓰다라는 뜻이에요."
  },
  {
    id: 'q-f3',
    topicId: 'family-friends',
    itemId: 'w-f10',
    type: 'listening',
    prompt: "발음을 잘 듣고 들려준 단어를 골라보세요.",
    audioPrompt: 'gift',
    options: ['game', 'gift', 'gold', 'guide'],
    correctIndex: 1,
    explanation: "들려준 발음은 [기프트], 생일이나 기념일에 주고받는 '선물(gift)'이에요!"
  },
  {
    id: 'q-f4',
    topicId: 'family-friends',
    itemId: 's-f3',
    type: 'meaning',
    prompt: "'Do you want to be my friend?'는 어떤 상황에서 쓸까요?",
    options: [
      '새로운 친구에게 먼저 다가가 친구 하자고 할 때',
      '친구에게 숙제를 빌려달라고 할 때',
      '집에 빨리 가자고 재촉할 때',
      '친구의 생일을 축하해 줄 때'
    ],
    correctIndex: 0,
    explanation: "새 학기나 모임에서 마음에 드는 친구에게 '나랑 친구 할래?' 하고 다정하게 손을 내밀 때 써요."
  },
  {
    id: 'q-f5',
    topicId: 'family-friends',
    itemId: 'e-f3',
    type: 'blank',
    prompt: "슬프거나 기운 없는 친구에게 '힘내!'라고 응원할 때 쓰는 말: '[ ______ ] up!'",
    options: ['Cheer', 'Wake', 'Stand', 'Give'],
    correctIndex: 0,
    explanation: "'Cheer up!'은 기운 내! 힘내! 하고 어깨를 토닥여주는 따뜻한 응원 표현이에요."
  },

  // --- Food & Dining Quizzes ---
  {
    id: 'q-fo1',
    topicId: 'food-dining',
    itemId: 'w-fo7',
    type: 'meaning',
    prompt: "'delicious'의 올바른 한국어 뜻은 무엇일까요?",
    options: ['맛있는', '매운', '차가운', '비싼'],
    correctIndex: 0,
    explanation: "'delicious'는 음식이 꿀맛처럼 '맛있는' 상태를 감탄할 때 쓰는 표현이에요."
  },
  {
    id: 'q-fo2',
    topicId: 'food-dining',
    itemId: 'w-fo8',
    type: 'blank',
    prompt: "배에서 꼬르륵 소리가 날 때: I am so [ ______ ], let's eat something!",
    options: ['hungry', 'happy', 'busy', 'sleepy'],
    correctIndex: 0,
    explanation: "'hungry'는 '배고픈'이라는 뜻이에요. 밥이나 간식을 먹고 싶을 때 써요."
  },
  {
    id: 'q-fo3',
    topicId: 'food-dining',
    itemId: 'w-fo1',
    type: 'listening',
    prompt: "발음을 잘 듣고 어떤 과일인지 골라보세요.",
    audioPrompt: 'apple',
    options: ['banana', 'apple', 'orange', 'grape'],
    correctIndex: 1,
    explanation: "들려준 발음은 [애플], 빨갛고 아삭한 '사과(apple)'예요!"
  },
  {
    id: 'q-fo4',
    topicId: 'food-dining',
    itemId: 's-fo5',
    type: 'meaning',
    prompt: "'I am full now, thank you.'는 식사 중 언제 쓸까요?",
    options: [
      '배부르게 식사를 마치고 감사 인사를 할 때',
      '식사를 시작하기 전 메뉴를 고를 때',
      '물이 부족해서 더 달라고 요청할 때',
      '음식이 너무 뜨거워서 식힐 때'
    ],
    correctIndex: 0,
    explanation: "'full'은 배가 부른 상태예요. '이제 배불러요, 잘 먹었습니다'라는 기분 좋은 마무리 인사예요."
  },
  {
    id: 'q-fo5',
    topicId: 'food-dining',
    itemId: 'e-fo1',
    type: 'blank',
    prompt: "음식을 대접하며 '마음껏 드세요! 맛있게 먹어!'라고 권할 때: '[ ______ ] yourself!'",
    options: ['Help', 'Stop', 'Cook', 'Find'],
    correctIndex: 0,
    explanation: "'Help yourself!'는 상대방에게 음식을 편안하게 마음껏 먹으라고 따뜻하게 권하는 표현이에요."
  }
];
