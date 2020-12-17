2020년 2학기 공개SW 프로젝트: 6석 1조
=====================================
>팀장: 김희수   
>팀원: 김소연, 김다윤, 김건우, 김선우, 류신영 

***

1. 아이디어 소개   
	>그룹 활동 보조를 중점으로 하는Moodle, Node.js 기반 학습용 웹 서비스   
	>PLASS DGU에서 타학생들과의 협업을 보조하는 학습 보조 시스템.

2. 개발 툴
	>node.js, xampp(mysql, apache)

3. 실행방법
	>- git clone
	>- Node.js 설치
	>- Deploy 하지 않았기 때문에 [localhost](http://localhost) 상에서 실행 가능
	>- 이후 아래 방법으로 사이트 이용

		1. moodle (PLASS DGU) 접속 >> 로그인
		2. 수강강좌와 강좌내 그룹 설정
		3. 강좌, 그룹이 설정되었으면 teamHelp 내비게이션 버튼 클릭
		4. 강좌선택
		5. 그룹에 대한 정보를 보고싶으면 Group정보
		6. 그룹원들의 할일을 적어놓은건 작업리스트
		7. 파일관리를 위한 파일업로드

4. DB에 추가한것      
	>- mdl_groups_members테이블에 작업리스트의 작성을 위한 to_do_list 칼럼추가   
	>- md_groups_members테이블에 팀원 평가 여부를 판단하기 위한 hasrated 칼럼 추가   
	>- mdl_groups에 파일이 저장될 경로가 되는 group_path 칼럼추가   
	>- a_rate이라고 새로운 테이블을 추가. courseid, userid, leadership, teamwork, creativeness, assertiveness, orator로 평가점수항목임. (자료형 courseid,userid ⇒ int/ 나머지는 ⇒ float)   
	>- mdl_group_file 테이블 추가.  파일을 업로드 할 때 업로드 한 id와 파일 경로를 묶어 저장을 하여 업로드 한 사람만 삭제할 수 있도록한다. 단, 팀장은 모든 파일에 삭제권한을 갖고 있다.   


5. npm Module    
	>- http   
	>- fs   
	>- express   
	>- inko   
	>- body-parser   
	>- querystring   
	>- mysql   
	>- formidable   

