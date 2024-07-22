---
kind: article
title: ROBOCOPY 명령어로 백업하기
author: mychatterbox
pubDate: 2024-05-25
slug: robocopy-backup
featured: false
draft: false
tags:
  - robocopy
ogImage: ""
description: robocopy 를 이용한 백업 방법을 간단하게 설명합니다.
keywords:
  - robocopy 백업
---
  

중요한 파일들을 백업하려고 이런저런 프로그램들을 찾아서 테스트 해보지만 무언가 하나씩 마음에 들지 않습니다.  
최근에는 [Syncthing](https://syncthing.net/) 를 사용하고 있는데, 점점 마음에 들지 않습니다.  
앞으로는 윈도우에 내장된 명령인 robocopy 를 이용해 백업하기로 했습니다.  

<hr>

원본 폴더는 c:\music 이고,  
d:\music, 네트워크 공유된 MINI-pc의 e:\music 2군데로 동시에 백업하겠습니다.  

따라하실 분은 테스트를 위해 C 드라이브에 music 폴더를 만들거나, 아래 내용을 각자 환경에 맞게 수정해서 적용합니다.  
이제 임의의 위치에 파일을 하나 만들고 `music C-DE.bat` 처럼 알기 쉽게 파일명과 확장자를 변경한 후 아래 내용으로 저장합니다.  
 ```
@echo off
SET _s="c:\music"
SET _d1="d:\music"
SET _d2="\\Mini-pc\e\music"
SET _opt=/mir /r:2

robocopy %_s% %_d1% %_opt% /log:c:\robocopy\_music-CD-%date%.log /NFL /NDL
robocopy %_s% %_d2% %_opt% /log:c:\robocopy\_music-CE-%date%.log /NFL /NDL
Exit
```

`SET _s="c:\music"`  
원본 폴더나 파일을 지정합니다.  

`SET _d1="d:\music"`  
`SET _d2="\\\MINI-pc\e\music"`  
대상 폴더나 파일을 지정합니다. 여기에 백업됩니다.

`SET _opt=/mir  /r:2`  
옵션은 mir 방식으로 할건데, 원본 폴더와 똑같이 만들겠다는 의미입니다.  
그래서 주의할 점은 원본 폴더에서 파일을 삭제하면 대상 폴더에서도 파일을 삭제합니다.  
/r:2 옵션은 오류일 경우 재시도 횟수입니다. 지정하지 않으면 기본옵션으로 백만번 재시도 합니다.


robocopy %_s% %_d% %_opt% /log:c:\robocopy\\_music-CD-%date%.log /NFL /NDL  
robocopy %_s% %_d% %_opt% /log:c:\robocopy\\_music-CE-%date%.log /NFL /NDL  
c:\robocopy 폴더에 `_music-CD-2024-05-25.log` `_music-CE-2024-05-25.log`와 같은 이름을 가진 로그 파일을 만들어주는데, 변경된 내용만 간단하게 보여줍니다.  
만약 뒤의 /NFL /NDL 을 제거하면 모든 파일과 디렉토리, 변경사항을 자세하게 보여줍니다.

이제 music C-DE.bat 파일을 실행하면 원본인 c:\music 폴더가 위에서 설정한 2군데로 동시 백업됩니다.  

<hr>

그런데! 눈에 거슬리는 문제가 하나 있습니다.  
music C-DE.bat 파일을 실행하면 백업이 끝날때까지 로그 파일을 만든다는 내용으로 팝업창이 떠 있습니다.  
백업이 끝나면 자동으로 닫히긴 하지만, 백업 시간이 길면 눈에 거슬립니다.  
팝업창이 뜨지 않도록 처리합시다.  
music C-DE.bat 파일을 만든 위치나 임의의 위치에 `music C-DE.vbs` 처럼 알기 쉬운 이름으로 빈파일을 하나 만들고, 아래 내용을 적절하게 수정하고 저장합니다.  
 ```
Dim WinScriptHost
Set WinScriptHost = CreateObject("WScript.Shell")
WinScriptHost.Run Chr(34) & "c:\robocopy\music C-DE.bat" & Chr(34), 0
Set WinScriptHost = Nothing
```

앞으로는 이 music C-DE.vbs 파일을 실행하면 팝업창이 뜨지 않습니다.  


백업은 수동으로 한 번씩 실행해도 되겠지만, 윈도우 작업 스케줄러에 등록해서 정해진 시간에 자동으로 실행되도록 설정하면 좋습니다.